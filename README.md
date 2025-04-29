# 🧠 Smart Product Scanning with Seamless Database Integration

> A submission by *Team DATAVERSE* for *GIET Hackathon X 4.0*

## 🚀 Problem Overview

In sectors like retail, logistics, manufacturing, and inventory, data entry remains largely manual, leading to errors, inefficiencies, and mismatches. Our challenge was to develop a smart, scalable, and real-time solution to extract product information using just a *camera, and store it into a **centralized database* for seamless backend integration.

---

## 🎯 Our Solution

We built a *real-time intelligent scanning system* that uses a camera feed to extract product details using *Gemini Pro (Google's Generative AI). The extracted data is stored in a **MySQL/SQLite database* and can be visualized or used for *seasonal/festival alert recommendations* using ML.

---

### 🛠 Features

- 📸 Real-time product scanning via camera  
- 🤖 Gemini-powered OCR and detail extraction  
- 🧠 Automatic JSON structuring (name, brand, size, price, expiry, SKU, etc.)  
- 🗃 Seamless MySQL and SQLite storage support  
- 📊 Flask-based analytics dashboard with sales trends  
- 🎉 Gemini-powered seasonal/festival product recommendation engine  
- 🌐 Frontend built with React  
- 💾 Manual product entry option  
- 🔐 CORS-enabled APIs  
- 🧪 Integration-ready architecture  

---

## 🧠 Tech Stack

- *Frontend:* React.js  
- *Backend:* FastAPI + Flask  
- *AI/ML:* Gemini Pro (Google Generative AI)  
- *Database:* MySQL + SQLite  
- *Libraries:* OpenCV, PIL, Pymysql, Matplotlib, Pandas, NumPy  
- *Visualization:* Figma  

---

## 💻 How to Run the Project

### 🔧 Step 1: Configure Network IP (Frontend)

To connect frontend to backend:  
- Open terminal → run ipconfig  
- Replace "localhost" in frontend API calls with your *IPv4 address*

---

### 🖥 Frontend Setup

bash
cd frontend
npm install
npm start


---

### ⚙ Backend Setup (FastAPI - OCR + DB)

bash
pip install fastapi uvicorn google-generativeai pymysql pillow opencv-python python-multipart pydantic
uvicorn main:app --host 0.0.0.0 --port 5000 --reload


---

### 📈 Flask API for Sales Analytics

bash
pip install flask flask-cors pandas matplotlib numpy
python sales.py


---

## 🧪 API Endpoints

| Method   | Route              | Description                                 |
|----------|--------------------|---------------------------------------------|
| POST     | /scan-image      | Uploads an image and extracts product info  |
| GET      | /capture         | Captures webcam image, extracts & stores    |
| POST     | /add_product     | Manually add product info to DB             |
| GET      | /product-history | Fetches complete product DB history         |
| GET/POST | /seasonal-alert  | Gemini-based product trend predictions      |

---

## 📂 Project Structure


📁 backend/
 ├── main.py          # FastAPI + Gemini OCR + MySQL
 ├── sales.py         # Flask + Sales Visualization
📁 frontend/
 ├── [React Components and Pages]


---

## 🎨 UI/UX (Figma Design)

[Figma UI/UX Final Design](https://www.figma.com/design/9RFP6e9qQefLh2KL8tD2MO/SALLY-FINAL?node-id=0-1&t=aOCQen9f6FTl19tS-1)

---

## 📊 Presentation

[Pitch Deck (Figma Slides)](https://www.figma.com/slides/caxSrkz0WLKQSz7FL4fX5O/User-Research-Session?node-id=1-311&t=XsLtbklTEk79TVUy-1)

---

## 👨‍💻 Team DATAVERSE

We are passionate hackers focused on building AI-first solutions for real-world retail and inventory management problems. Our project ensures:

- 🔍 99% OCR accuracy via Gemini  
- ⚡ Near real-time inference  
- 📊 Smart demand prediction using historical data  
- 🛠 Plug-and-play API-based backend  

---

## 🏁 Bonus Implementations

✅ Offline mode with delayed DB sync (future scope)  
✅ Multilingual extraction support (via Gemini)  
✅ ERP/inventory system-ready output  
✅ Responsive and intuitive frontend UI  
