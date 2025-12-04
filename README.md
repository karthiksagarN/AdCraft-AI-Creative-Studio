# AdCraft Studio - AI Advertising Platform

**AdCraft Studio** is a next-generation AI-powered platform that enables brands and marketers to generate studio-quality ad creatives in seconds. By combining advanced image generation models (`fal-ai/nano-banana-pro`) with persuasive copywriting (`GPT-4o`), AdCraft Studio delivers production-ready assets tailored to your brand's unique style and tone.

![AdCraft Studio Banner](/Screenshots/banner.png)

## 🚀 Key Features

### 🎨 AI Creative Generation
-   **Product Integration**: Seamlessly blends your product images into AI-generated scenes.
-   **Style Presets**: Choose from 10+ curated styles including *Premium*, *Minimalist*, *Cyberpunk*, *Nature*, and more.
-   **Smart Taglines**: Auto-generate catchy taglines using GPT-4o or input your own custom copy.
-   **Tone Control**: Adjust the mood of your copy (Professional, Witty, Urgent, Luxury).

### 🔐 Authentication & Security
-   **Secure Login**: Powered by **Supabase Auth** (Email/Password & Google OAuth).
-   **Usage Limits**: Smart demo tracking limits free users to 2 generations to prevent abuse.
-   **Role-Based Access**: Scalable architecture ready for Pro/Enterprise tiers.

### 🛠️ Modern Tech Stack
-   **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
-   **Backend**: FastAPI (Python), Uvicorn.
-   **AI Models**: 
    -   **Image**: `fal-ai/nano-banana-pro` (via Fal.ai)
    -   **Text**: `gpt-4o` (via OpenAI)
-   **Database & Auth**: Supabase.
-   **Email**: SMTP integration for contact forms.

---

## ⚡️ Quick Start

### Prerequisites
-   Node.js & npm
-   Python 3.10+
-   Supabase Account
-   Fal.ai & OpenAI API Keys

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in your API keys in .env
```

Run the server:
```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Add your VITE_SUPABASE_URL and VITE_SUPABASE_KEY
```

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

---

## 🔮 Future Developments

We are constantly innovating to make AdCraft Studio the ultimate tool for marketers. Here's what's coming next:

### 💳 Payment Integration
-   **Razorpay & Stripe Support**: Seamless subscription management for Pro and Enterprise plans.
-   **Credit System**: Pay-as-you-go credits for high-volume users.

### 🖌️ Advanced Editing Suite
-   **In-Browser Editor**: Crop, resize, and add text overlays directly within the app.
-   **Brand Kits**: Save your logo, brand colors, and fonts for consistent generation.

### 📊 Analytics & Insights
-   **Performance Prediction**: AI analysis of which creatives are likely to perform best.
-   **A/B Testing**: Generate variations specifically designed for split testing.

### 📱 Social Media Integration
-   **Direct Publishing**: Post your ads directly to Instagram, LinkedIn, and Facebook.
-   **Format Adaptation**: Auto-resize creatives for Stories, Posts, and Banners.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Developed by Karthik Sagar Nallagula**  
[Portfolio](https://karthiknallagula.com) | [LinkedIn](https://www.linkedin.com/in/karthik-sagar-nallagula/) | [GitHub](https://github.com/karthiksagarn)
