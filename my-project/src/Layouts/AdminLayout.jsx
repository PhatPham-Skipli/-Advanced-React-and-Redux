import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {

    return (
        <div className="flex flex-col h-screen">
            <div className={`sticky top-0 z-50 w-full`}>
                <Header />
            </div>
            <div className="flex flex-1 min-h-0">
                <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 z-40}`}>
                    <Sidebar />
                </div>
                <div className={`flex-1 ml-64 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative min-h-0`}>
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-25 blur-3xl"></div>
                    </div>
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                       <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;