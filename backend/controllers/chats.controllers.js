import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { query } from '../database/server.js'; 
import { getClient } from '../database/server.js';

export const createChat = asyncHandler(async (req, res) => {
    const { isGroupChat, otherUserId, chatName, memberIds } = req.body;
    const creatorId = req.user.id;

    const client = await getClient();

    try{
        await client.query('BEGIN');
         let newChat;

         if(isGroupChat)
         {
            if(!chatName || !memberIds || memberIds.length === 0) {
                throw new apiError(400, 'Chat name and member IDs are required for group chats');
            }

            const chatInsertResult = await client.query(
                'INSERT INTO chats (is_group_chat, chat_name) VALUES (true ,$1) RETURNING *',
                [chatName]
            );
            newChat = chatInsertResult.rows[0];


            const allMemberIds = [...new  Set([creatorId, ...memberIds])];
            for(const memberId of allMemberIds) {
                await client.query(
                    'INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)',
                    [newChat.id, memberId]
                );
            }
      } else {
         if (!otherUserId) {
            throw new apiError(400, 'Other user ID is required for direct chats');
         }

            const existingChatResult = await client.query(
            `SELECT chat_id FROM chat_members cm
            JOIN chats c ON c.id = cm.chat_id
            WHERE c.is_group_chat = false AND cm.user_id = ANY($1)
            GROUP BY chat_id
            HAVING COUNT(DISTINCT cm.user_id) = 2`,
            [[creatorId, otherUserId]]
            );

            if(existingChatResult.rows.length > 0) {
               throw new apiError(409, "A chat with this user already exists.");
            }

            const chatInsertResult = await client.query(
            'INSERT INTO chats (is_group_chat) VALUES (false) RETURNING *'
            );
            newChat = chatInsertResult.rows[0];

            await client.query(
                'INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2),($1, $3)',
                [newChat.id, creatorId, otherUserId]
            );
        }

        await client.query('COMMIT');

        return res.status(201).json(
            new apiResponse(201, { chat: newChat }, 'Chat created successfully')
        );
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
});


export const getChats = asyncHandler(async (req, res) => {

    const userId =  req.user.id;


    const sql = `
        SELECT c.* FROM chats c
        JOIN chat_members cm ON c.id = cm.chat_id
        WHERE cm.user_id = $1
    `;

    const result = await query(sql, [userId]);

    return res.status(200).json(
        new apiResponse(200, { chats: result.rows }, 'Chats retrieved successfully')
    );
});


export const getMessages = asyncHandler(async (req, res) => {
    const chatId = req.params.id;
    const userId = req.user.id;
    const page = parseInt(req.query.page || 1, 10) ;
    const limit =20;
    const offset = (page - 1) * limit;



    const memberCheck =  await query(
        'SELECT * FROM chat_members WHERE chat_id = $1 AND user_id = $2',
        [chatId, userId]
    )

    if(memberCheck.rows.length === 0) {
        throw new apiError(403, 'You are not a member of this chat');
    }

    const messageResult = await query(
        'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [chatId, limit, offset]
    )

    return res.status(200).json(
        new apiResponse(200, { messages: messageResult.rows }, 'Messages retrieved successfully')
    );
});
