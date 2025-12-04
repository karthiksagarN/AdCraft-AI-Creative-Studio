import React from 'react';
import { Check } from 'lucide-react';

const STYLES = [
    { id: 'premium', name: 'Premium', color: 'bg-gray-900', emoji: '✨' },
    { id: 'playful', name: 'Playful', color: 'bg-yellow-400', emoji: '🌈' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-100', emoji: '🕶️' },
    { id: 'bold', name: 'Bold', color: 'bg-red-600', emoji: '🔥' },
    { id: 'festive', name: 'Festive', color: 'bg-purple-500', emoji: '🎉' },
    { id: 'cinematic', name: 'Cinematic', color: 'bg-blue-800', emoji: '📸' },
    { id: 'ultra_clean', name: 'Ultra Clean', color: 'bg-cyan-100', emoji: '🧊' },
    { id: 'high_fashion', name: 'High Fashion', color: 'bg-pink-600', emoji: '🪩' },
    { id: 'outdoor', name: 'Outdoor', color: 'bg-green-500', emoji: '🌤️' },
    { id: 'futuristic', name: 'Futuristic', color: 'bg-indigo-600', emoji: '🚀' },
];

const StyleSelector = ({ selectedStyle, onSelect }) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Visual Style</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {STYLES.map((style) => (
                    <button
                        key={style.id}
                        type="button"
                        onClick={() => onSelect(style.id)}
                        className={`
              relative p-3 rounded-xl border text-left transition-all
              ${selectedStyle === style.id
                                ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            `}
                    >
                        <div className="text-2xl mb-1">{style.emoji}</div>
                        <div className="text-sm font-medium text-gray-900">{style.name}</div>

                        {selectedStyle === style.id && (
                            <div className="absolute top-2 right-2 text-indigo-600">
                                <Check size={16} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StyleSelector;
