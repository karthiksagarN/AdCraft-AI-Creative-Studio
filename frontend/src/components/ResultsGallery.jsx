import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const ResultsGallery = ({ results, zipUrl }) => {
    if (!results || results.length === 0) return null;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-brand-dark">Generated Creatives</h2>
                {zipUrl && (
                    <a
                        href={`${API_URL}${zipUrl}`}
                        className="flex items-center space-x-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                        download
                    >
                        <Download className="w-4 h-4" />
                        <span>Download All (ZIP)</span>
                    </a>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((creative) => (
                    <div key={creative.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            <img
                                src={`${API_URL}${creative.image_url}`}
                                alt={creative.headline}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <div className="p-6">
                            <div className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">{creative.tone}</div>
                            <h3 className="text-lg font-bold text-brand-dark mb-2 leading-tight">{creative.headline}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{creative.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsGallery;
