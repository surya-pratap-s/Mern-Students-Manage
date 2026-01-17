import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Menu, X, Home, LogOut, Plus, LogIn } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        navigate("/");
    };

    return (<>
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">EduManage</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (<>
                            <Link to={"/dashboard"} title="Dashboard" className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition">
                                <Home size={20} />
                            </Link>

                            <Link to={"/add"} title="Add Student" className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition">
                                <Plus size={20} />
                            </Link>

                            <button onClick={handleLogout} title="Logout" className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                                <LogOut size={20} />
                            </button>
                        </>) : (
                            <Link to={"/login"} className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700 hover:text-indigo-600 p-2">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Overlay Background */}
        <div className={`fixed top-16 inset-0 bg-black/50 z-40 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Drawer) */}
        <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-4">
                <nav className="flex flex-col space-y-4">
                    {user ? (<>
                        <Link
                            to={"/dashboard"}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Home size={20} />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            to={"/add"}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Plus size={20} />
                            <span>Add Student</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </>) : (
                        <Link
                            to={"/login"}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <LogIn size={20} />
                            <span>Login</span>
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    </>);
}