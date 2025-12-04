import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Check } from 'lucide-react';

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-gray-600">Start for free, upgrade when you need more power.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-200 transition-colors">
                        <h3 className="text-xl font-bold mb-2">Starter</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> 2 Free Demo Runs
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> Standard Quality
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> 3 Styles
                            </li>
                        </ul>
                        <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-gray-900 text-white rounded-2xl p-8 border border-gray-900 relative transform md:-translate-y-4 shadow-xl">
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                        <h3 className="text-xl font-bold mb-2">Pro</h3>
                        <div className="text-4xl font-bold mb-6">$29<span className="text-base font-normal text-gray-400">/mo</span></div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check size={20} className="text-indigo-400" /> Unlimited Generations
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check size={20} className="text-indigo-400" /> 4K Quality
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check size={20} className="text-indigo-400" /> All 10 Styles
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check size={20} className="text-indigo-400" /> Priority Support
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-900/50 transition-all">
                            Upgrade to Pro
                        </button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-200 transition-colors">
                        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                        <div className="text-4xl font-bold mb-6">Custom</div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> Custom Models
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> API Access
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={20} className="text-green-500" /> Dedicated Account Manager
                            </li>
                        </ul>
                        <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PricingPage;
