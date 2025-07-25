type ConversationListItemProps = {
    name: string;
    lastMessage: string;
    avatar: string;
    active: boolean;
};

const ConversationListItem = ({ name, lastMessage, avatar, active }: ConversationListItemProps) => (
            <li className={`flex items-center p-3 cursor-pointer ${active ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}>
                <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt="Avatar" />
                <div className="ml-4">
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
                </div>
            </li>
        );

        const conversations = [
            { id: 1, name: 'Alice', lastMessage: 'Hey, are we still on for tomorrow?', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=A', active: true },
            { id: 2, name: 'Bob', lastMessage: "Sure, I'll send the document over.", avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=B', active: false },
            { id: 3, name: 'Charlie', lastMessage: 'Thanks for the update!', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=C', active: false },
        ];
        
        type SidebarProps = {
            isOpen: boolean;
        };

        const Sidebar = ({ isOpen }: SidebarProps) => (
            <aside className={`sidebar absolute lg:relative z-20 h-full w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold text-xl text-gray-800">Chats</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <ul>
                        {conversations.map(convo => <ConversationListItem key={convo.id} {...convo} />)}
                    </ul>
                </div>
            </aside>
        );






export default Sidebar