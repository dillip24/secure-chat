import React from "react";

const MessageInput = () => (
    <footer className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
            <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
        </div>
    </footer>
);

export default MessageInput;