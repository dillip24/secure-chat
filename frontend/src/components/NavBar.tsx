
type NavBarProps = {
    onMenuClick: () => void;
};

const NavBar = ({ onMenuClick }: NavBarProps) => (
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
            <div className="flex items-center">
                <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className="ml-2 lg:ml-0">
                    <h1 className="text-lg font-bold text-gray-900">Alice</h1>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                 <button className="text-gray-500 hover:text-gray-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button>
                <img className="h-8 w-8 rounded-full object-cover" src="https://placehold.co/100x100/E2E8F0/4A5568?text=U" alt="Your Avatar" />
            </div>
        </header>
);

export default NavBar;