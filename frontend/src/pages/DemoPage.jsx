import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import CreativeForm from '../components/CreativeForm';
import ResultsGallery from '../components/ResultsGallery';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Loader2 } from 'lucide-react';

const DemoPage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [zipUrl, setZipUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);

    const handleGenerate = async (formData) => {
        setIsGenerating(true);
        setResults([]);
        setZipUrl(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                alert("You must be logged in to generate creatives.");
                navigate('/auth');
                return;
            }

            const API_URL = 'https://adcraft-ai-creative-studio.onrender.com' || 'http://localhost:8000';
            const response = await axios.post(`${API_URL}/generate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            setResults(response.data.creatives);
            setZipUrl(response.data.zip_url);
        } catch (error) {
            console.error("Error generating creatives:", error);
            if (error.response && error.response.status === 403) {
                alert("Demo limit reached! Please upgrade to Pro for unlimited generations.");
            } else {
                alert("Failed to generate creatives. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Navbar />
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            AI Creative Generator
                        </h1>
                        <p className="text-lg text-gray-600">
                            Upload your assets and let our AI generate stunning ad variations in seconds.
                        </p>
                    </div>

                    <CreativeForm onGenerate={handleGenerate} isGenerating={isGenerating} />
                </div>
            </div>
            <ResultsGallery results={results} zipUrl={zipUrl} />
            <Footer />
        </div>
    );
};

export default DemoPage;
