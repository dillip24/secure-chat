type MessageProps = {
    text: string;
    avatar: string;
    sent: boolean;
};

const Message = ({ text, avatar, sent }: MessageProps) => {
            if (sent) {
                return (
                    <div className="flex items-start justify-end">
                        <div className="mr-3 bg-blue-500 text-white p-3 rounded-lg rounded-br-none shadow">
                            <p className="text-sm">{text}</p>
                        </div>
                        <img className="h-8 w-8 rounded-full object-cover" src={avatar} alt="Your Avatar" />
                    </div>
                );
            }
            return (
                <div className="flex items-start">
                    <img className="h-8 w-8 rounded-full object-cover" src={avatar} alt="Avatar" />
                    <div className="ml-3 bg-white p-3 rounded-lg rounded-tl-none shadow">
                        <p className="text-sm text-gray-800">{text}</p>
                    </div>
                </div>
            );
        };

        /**
         * The main chat area where messages are displayed.
         */
        const ChatArea = () => (
            <main className="flex-1 p-6 overflow-y-auto ">
                <div className="space-y-4">
                    {messages.map(msg => <Message key={msg.id} {...msg} />)}
                </div>
            </main>
        );

        /**
         * The footer component with the message input field and send button.
         */
        

        const messages = [
            { id: 1, text: 'Hey, are we still on for tomorrow?', sender: 'Alice', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=A', sent: false },
            { id: 2, text: "Of course! I'm looking forward to it. What time works for you?", sender: 'You', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=U', sent: true },
        ];

export default ChatArea;