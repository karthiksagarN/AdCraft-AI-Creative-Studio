import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Image as ImageIcon, Layers } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import axios from 'axios';
import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const API_URL = 'https://groundtruth-ai-hackathon.onrender.com' || 'http://localhost:8000';
            await axios.post(`${API_URL}/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us more about your question or how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200'
                    }`}
            >
                {status === 'sending' ? (
                    'Sending...'
                ) : status === 'success' ? (
                    'Message Sent!'
                ) : (
                    <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </>
                )}
            </button>
            {status === 'error' && <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>}
        </form>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        New: Nano Banana Pro Model Available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8">
                        Generate Infinite <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                            Brand Creatives
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Upload your product and logo. Let our AI generate professional, on-brand ad creatives with catchy copy in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/demo" className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                            Start Generating Free
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/how-it-works" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                            View Examples
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Creative Studio Works</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our AI-powered process transforms your product photos into professional ad creatives that rival expensive studio sessions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ImageIcon size={32} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4">Step 1</div>
                            <h3 className="text-xl font-bold mb-3">Upload Your Assets</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Upload your product image and brand logo. Our AI needs these to learn your unique brand identity and product details.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={32} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-4">Step 2</div>
                            <h3 className="text-xl font-bold mb-3">AI Generation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our advanced Nano Banana Pro model analyzes your assets and generates stunning variations in seconds, preserving your product's look.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ArrowRight size={32} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full mb-4">Step 3</div>
                            <h3 className="text-xl font-bold mb-3">Download & Publish</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Choose from professional styles and download high-quality creatives ready for your marketing campaigns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Is it free to use?", a: "Yes! You get 2 free generations to try out the tool. After that, you can upgrade to our Pro plan for unlimited access." },
                            { q: "What file formats do you support?", a: "We support JPG and PNG formats for both product images and logos." },
                            { q: "Can I use the images for commercial purposes?", a: "Absolutely. All images generated by Creative Studio are yours to use for any commercial purpose." },
                            { q: "How does the AI preserve my product?", a: "We use advanced in-painting and control-net technologies to ensure your product's geometry and details remain 100% authentic while changing the background." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions about Creative Studio? Need help with your generations? Our team is here to help you succeed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                                    <p className="text-gray-600 mb-2">Get in touch via email</p>
                                    <a href="mailto:hello@creativestudio.ai" className="text-indigo-600 font-medium hover:underline">hello@creativestudio.ai</a>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
                                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                                    <p className="text-gray-600 mb-2">Mon-Fri 9AM-6PM PST</p>
                                    <span className="text-gray-900 font-medium">+1 (555) 123-4567</span>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h3>
                                    <p className="text-gray-600 mb-2">Our headquarters</p>
                                    <span className="text-gray-900 font-medium">San Francisco, CA</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="text-orange-500">💬</span> Send us a Message
                            </h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
