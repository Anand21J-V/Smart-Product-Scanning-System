from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import google.generativeai as genai
import pymysql
import cv2
from PIL import Image
import io
import json
import re
import sqlite3

# Gemini configuration
genai.configure(api_key="AIzaSyB9gKOT0r4k73X5i-Gt6JNpfLMxWq3HUa8")
model = genai.GenerativeModel("gemini-2.0-flash")

# Database Configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "ritik@01A",  # Ensure this is correct
    "database": "scanner"
}
TABLE_NAME = "products"

# FastAPI app init
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model
class Product(BaseModel):
    name: str
    brand: str
    product_type: str
    size: str
    expiry: str
    price: str
    sku: str

# Database table creation
def setup_mysql():
    conn = pymysql.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"]
    )
    with conn.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
    conn.commit()
    conn.close()

    conn = pymysql.connect(**DB_CONFIG)
    with conn.cursor() as cursor:
        cursor.execute(f"""
            CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                brand VARCHAR(255),
                product_type VARCHAR(100),
                size VARCHAR(50),
                expiry VARCHAR(255), 
                price VARCHAR(50),
                sku VARCHAR(50)
            )
        """)
    conn.commit()
    conn.close()

# Database connection function
def get_db_connection():
    conn = pymysql.connect(**DB_CONFIG)
    return conn

# SQLite connection
def get_connection():
    return sqlite3.connect("products.db")

# Fetch product data from SQLite
def fetch_product_data():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT time, name, product_type, price FROM PRODUCTS")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Generate seasonal/festival alert using Gemini
def generate_alert(products):
    product_info = "\n".join([
        f"{p['time']} - {p['name']} ({p['product_type']}): ₹{p['price']}" 
        for p in products
    ])

    prompt = f"""
    Only include product names that make sense for the upcoming season or festival. Use simple and natural English. Avoid any special formatting like asterisks or slashes.
    Also tell how much the demand of the product will hike.

    Data:
    {product_info}
    """

    response = model.generate_content(prompt)
    return response.text.strip()


@app.get("/seasonal-alert")
@app.post("/seasonal-alert")
async def seasonal_alert():
    try:
        data = fetch_product_data()
        alert = generate_alert(data)
        return JSONResponse(content={
            "alert": alert,
            "products": data
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# Gemini OCR logic
def extract_info_from_image(pil_image):
    try:
        response = model.generate_content(
            [
                "Extract product details and return ONLY a JSON object with keys: name, brand, product_type, size, expiry, price, sku.",
                pil_image
            ],
            generation_config={"temperature": 0.3, "top_p": 1, "top_k": 40, "max_output_tokens": 512},
            safety_settings={"HARASSMENT": "block_none", "HATE": "block_none", "SEXUAL": "block_none", "DANGEROUS": "block_none"},
        )

        raw_text = response.text.strip()
        match = re.search(r"\{[\s\S]*\}", raw_text)
        if match:
            return {"status": "success", "data": json.loads(match.group(0))}
        return {"status": "error", "message": "No valid JSON found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# DB insert logic
def insert_into_database(data):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO products (name, price, sku, expiry, brand, product_type, size)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data["name"],
            data["price"],
            data["sku"],
            data["expiry"],
            data["brand"],
            data["product_type"],
            data["size"]
        )

        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print("DB Insert Error:", e)
        return False

# File Upload Endpoint
@app.post("/scan-image")
async def scan_image(file: UploadFile = File(...)):
    try:
        print("called")
        image_bytes = await file.read()
        pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        result = extract_info_from_image(pil_image)

        if result["status"] == "success":
                return {"message": "Product extracted and saved", "data": result["data"]}
        else:
            return {"message": "Extraction failed", "error": result["message"]}
    except Exception as e:
        return {"error": str(e)}

# Camera Capture Endpoint
@app.get("/capture")
def capture_image_and_extract():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise HTTPException(status_code=500, detail="Failed to open camera")

    ret, frame = cap.read()
    cap.release()

    if not ret:
        raise HTTPException(status_code=500, detail="Failed to capture image")

    pil_image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    result = extract_info_from_image(pil_image)

    if result["status"] == "success":
        success = insert_into_database(result["data"])
        if success:
            return {"message": "Captured, extracted, and saved", "data": result["data"]}
        else:
            return {"message": "Captured & extracted, but DB insert failed", "data": result["data"]}
    else:
        raise HTTPException(status_code=500, detail=result["message"])

# Manual Add Product Endpoint
@app.post("/add_product")
async def add_product(product: Product):
    try:
        print("Received product for insertion:", product)  # Log product details

        data = product.dict()

        # Debugging: Print the product data
        print("Product data:", data)
        
        # Check if product already exists in the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT COUNT(*) FROM {TABLE_NAME} WHERE sku = %s", (data["sku"],))
        existing_product_count = cursor.fetchone()[0]

        if existing_product_count > 0:
            print("Product already exists with SKU:", data["sku"])  # Debugging: Log this message
            raise HTTPException(status_code=400, detail="Product with this SKU already exists")

        # Insert the product into the database
        print("Inserting product into database...")  # Log this action
        success = insert_into_database(data)
        if success:
            print("Product inserted successfully")  # Log successful insert
            return {"message": "✅ Product manually added"}
        else:
            print("Failed to insert product into database")  # Log failure
            raise HTTPException(status_code=500, detail="❌ DB insert failed")

    except ValueError:
        print("ValueError in expiry date format")  # Log ValueError
        raise HTTPException(status_code=400, detail="❌ Invalid expiry date format. Use DD/MM/YY")

# Product History Endpoint
@app.get("/")
def get_Connection():
    try:
        print("Hello")
        return {"msg": "Hello"}

    except Exception as e:
        print("Error fetching product history:", e)
        raise HTTPException(status_code=500, detail=f"Failed to retrieve product history: {str(e)}")


# Product History Endpoint
@app.get("/product-history")
def get_product_history():
    try:
        print("product")
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {TABLE_NAME} ORDER BY id DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        keys = ["id", "name", "brand", "product_type", "size", "expiry", "price", "sku"]
        data = [dict(zip(keys, row)) for row in rows]

        return {"status": "success", "data": data}

    except Exception as e:
        print("Error fetching product history:", e)
        raise HTTPException(status_code=500, detail=f"Failed to retrieve product history: {str(e)}")

# On app startup
@app.on_event("startup")
def startup_event():
    setup_mysql()

# Host and port setup
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)