import Sidebar from './Sidebar.js';
import NavBar from './NavBar.js';
import ChatBox from './ChatBox.tsx';
import MessageInput from './MessageInput.tsx';


const ChatPage = () => {
    return (
        <div className='flex border-4 border-gray-700 m-4 overflow-hidden rounded-lg' >
        <div className='flex '>
          <Sidebar isOpen={false} />
          
        </div>
        <div className='flex flex-col w-full h-screen'>
            
            <NavBar onMenuClick={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
            <ChatBox />
            <MessageInput />
        </div>
            
      </div>
    )
}