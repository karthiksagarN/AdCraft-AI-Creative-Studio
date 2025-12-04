import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Creative Studio</h3>
                        <p className="text-gray-500 max-w-sm">
                            Generate infinite brand creatives with the power of AI.
                            Professional quality ads, banners, and social media content in seconds.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-600">API</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Showcase</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">About</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © 2025 AI Creative Studio. Powered by NanoBananaPro & GPT-4o.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
