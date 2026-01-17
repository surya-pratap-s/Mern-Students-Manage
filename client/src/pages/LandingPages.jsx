import { Menu, X, BookOpen, Users, BarChart3, Calendar, CheckCircle, ArrowRight, LogIn, Home, LogOut, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function LandingPages() {
    const { fetchStudents, totalStudents } = useAuth();

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Streamline Your <span className="text-indigo-600">Student Management</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            The complete solution for educational institutions to manage students.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={'/register'} className="bg-indigo-600 text-white px-8 py-4 rounded hover:bg-indigo-700 transition font-semibold flex items-center justify-center">
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded p-8 shadow transform transition">
                            <div className="bg-white rounded p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Total Students</span>
                                    <Users className="w-6 h-6 text-indigo-600" />
                                </div>
                                <p className="text-4xl font-bold text-gray-900">{totalStudents}</p>
                                <div className="flex items-center text-green-600 text-sm">
                                    <span>↑ 12% from last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-600">Everything you need to manage your institution efficiently</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Users className="w-12 h-12 text-indigo-600" />,
                                title: "Student Records",
                                description: "Comprehensive student profiles with all essential information in one place"
                            },
                            {
                                icon: <Calendar className="w-12 h-12 text-indigo-600" />,
                                title: "Attendance Tracking",
                                description: "Real-time attendance monitoring with automated notifications"
                            },
                            {
                                icon: <BarChart3 className="w-12 h-12 text-indigo-600" />,
                                title: "Performance Analytics",
                                description: "Detailed insights and reports on student academic performance"
                            },
                            {
                                icon: <CheckCircle className="w-12 h-12 text-indigo-600" />,
                                title: "Easy Management",
                                description: "Intuitive interface for effortless administrative workflows"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { number: "500+", label: "Schools Using EduManage" },
                            { number: "50K+", label: "Students Managed" },
                            { number: "99.9%", label: "Uptime Guarantee" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                                <p className="text-5xl font-bold text-indigo-600 mb-2">{stat.number}</p>
                                <p className="text-gray-600 text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="login" className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join hundreds of institutions already using EduManage to streamline their operations
                    </p>
                    <button className="bg-white text-indigo-600 px-10 py-4 rounded-lg hover:bg-gray-100 transition font-bold text-lg">
                        Login to Your Account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="w-6 h-6" />
                                <span className="text-xl font-bold">EduManage</span>
                            </div>
                            <p className="text-gray-400">Simplifying student management for educational institutions worldwide.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 EduManage. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}