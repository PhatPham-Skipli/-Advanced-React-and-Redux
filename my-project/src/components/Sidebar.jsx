import { NavLink } from "react-router-dom";
import {
    IoListOutline,
    IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

const Sidebar = () => {
    const menuItems = [
        {
            name: "Accounts",
            path: "/admi/accounts",
            icon: <IoListOutline />
        },
        {
            name: "Comment",
            path: "/admin/comments",
            icon: <IoChatbubbleEllipsesOutline />,
        },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col shadow-lg">
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                isActive
                                    ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;