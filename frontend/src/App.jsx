import React, { useState } from 'react';
import Hero from './components/Hero';
import CreativeForm from './components/CreativeForm';
import ResultsGallery from './components/ResultsGallery';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [zipUrl, setZipUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setResults([]);
    setZipUrl(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_URL}/generate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data.creatives);
      setZipUrl(response.data.zip_url);
    } catch (error) {
      console.error("Error generating creatives:", error);
      alert("Failed to generate creatives. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Hero />
      <CreativeForm onGenerate={handleGenerate} isGenerating={isGenerating} />
      <ResultsGallery results={results} zipUrl={zipUrl} />

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm mt-20 border-t border-gray-100">
        <p>© 2025 AI Creative Studio. Powered by Flux.1 & GPT-4o.</p>
        <p>Developed by Karthik Sagar Nallagula</p>
        <p>GroundTruth AI Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
