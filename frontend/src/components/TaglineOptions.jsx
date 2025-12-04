import React from 'react';
import { Wand2, Type, Ban } from 'lucide-react';

const TaglineOptions = ({ mode, setMode, tagline, setTagline }) => {
    const options = [
        { id: 'auto', label: 'Auto Generate', icon: Wand2, desc: 'AI writes catchy copy' },
        { id: 'manual', label: 'Custom', icon: Type, desc: 'Use your own text' },
        { id: 'none', label: 'No Tagline', icon: Ban, desc: 'Clean image only' },
    ];

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Tagline Options</label>

            <div className="grid grid-cols-3 gap-3">
                {options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = mode === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setMode(option.id)}
                            className={`
                flex flex-col items-center justify-center p-4 rounded-xl border transition-all
                ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'}
              `}
                        >
                            <Icon size={20} className="mb-2" />
                            <div className="font-medium text-sm">{option.label}</div>
                            <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                        </button>
                    );
                })}
            </div>

            {mode === 'manual' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Enter your custom tagline..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            )}
        </div>
    );
};

export default TaglineOptions;
