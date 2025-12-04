import React, { useState } from 'react';
import { Upload, Loader2, Sparkles } from 'lucide-react';
import StyleSelector from './StyleSelector';
import TaglineOptions from './TaglineOptions';

const CreativeForm = ({ onGenerate, isGenerating }) => {
    const [formData, setFormData] = useState({
        brandName: '',
        tagline: '',
        tone: 'Premium', // Kept for backward compatibility or as a fallback tone
        style_key: 'premium',
        tagline_mode: 'auto',
        numCreatives: 2
    });
    const [files, setFiles] = useState({
        logo: null,
        product: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.logo || !files.product) {
            alert("Please upload both logo and product images.");
            return;
        }

        const data = new FormData();
        data.append('logo', files.logo);
        data.append('product', files.product);
        data.append('brand_name', formData.brandName);
        data.append('tagline', formData.tagline);
        data.append('tone', formData.tone); // Still passing tone, maybe map style to tone?
        data.append('style_key', formData.style_key);
        data.append('tagline_mode', formData.tagline_mode);
        data.append('num_creatives', formData.numCreatives);

        onGenerate(data);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 -mt-20 relative z-20 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Uploads & Brand Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">1. Upload Assets</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Brand Logo</label>
                                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-indigo-500 transition-colors text-center cursor-pointer bg-gray-50/50 h-32 flex flex-col items-center justify-center group">
                                    <input
                                        type="file"
                                        name="logo"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                    <div className={`p-2 rounded-full mb-2 ${files.logo ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                                        <Upload size={20} />
                                    </div>
                                    <span className="text-xs text-gray-500 truncate w-full px-2">{files.logo ? files.logo.name : "Upload Logo"}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Product Image</label>
                                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-indigo-500 transition-colors text-center cursor-pointer bg-gray-50/50 h-32 flex flex-col items-center justify-center group">
                                    <input
                                        type="file"
                                        name="product"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                    <div className={`p-2 rounded-full mb-2 ${files.product ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                                        <Upload size={20} />
                                    </div>
                                    <span className="text-xs text-gray-500 truncate w-full px-2">{files.product ? files.product.name : "Upload Product"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">2. Brand Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    name="brandName"
                                    value={formData.brandName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Acme Corp"
                                    required
                                />
                            </div>

                            <TaglineOptions
                                mode={formData.tagline_mode}
                                setMode={(mode) => setFormData({ ...formData, tagline_mode: mode })}
                                tagline={formData.tagline}
                                setTagline={(tagline) => setFormData({ ...formData, tagline: tagline })}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Section 2: Style Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Choose Style</h3>
                    <StyleSelector
                        selectedStyle={formData.style_key}
                        onSelect={(style) => setFormData({ ...formData, style_key: style })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Generating Magic...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                <span>Generate Creatives</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreativeForm;
