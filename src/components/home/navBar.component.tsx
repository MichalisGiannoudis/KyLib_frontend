import { UserStore } from "@/store/user";

export const NavBarComponent = () => {

    const user = UserStore((state) => state.user);

    const handleUserMenu = () => {
        
    }

    return (
        <div className="bg-gray-800 p-4">
            <nav className="grid grid-cols-[43%_37%_15%_5%] justify-between items-center">
                <div className="text-white text-lg font-bold">
                    KyLib
                </div>
                <div className="text-white text-lg font-bold">
                    Welcome Back, {user?.name || 'Guest'}
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="" className="text-white hover:text-gray-300">Books</a>
                    </li>
                    <li>
                        <a href="" className="text-white hover:text-gray-300">Authors</a>
                    </li>
                    <li>
                        <a href="" className="text-white hover:text-gray-300">Genres</a>
                    </li>
                </ul>
                <div className="text-white text-lg font-bold">
                    <img onClick={handleUserMenu} src={user?.profilePicture || 'images/home/user-icon.png'} className="w-8 h-8 inline-block mr-2" />
                </div>
            </nav>
        </div>
    );
}