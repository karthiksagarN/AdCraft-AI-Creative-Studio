import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const scrollToSection = (sectionId) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                        <Sparkles size={20} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Creative Studio
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                    <button onClick={() => scrollToSection('how-it-works')} className="hover:text-indigo-600 transition-colors">How It Works</button>
                    <Link to="/demo" className="hover:text-indigo-600 transition-colors">Demo</Link>
                    <Link to="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
                    <button onClick={() => scrollToSection('faq')} className="hover:text-indigo-600 transition-colors">FAQ</button>
                    <button onClick={() => scrollToSection('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                                Login
                            </Link>
                            <Link to="/auth?mode=signup" className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
