import numpy as np
import pandas as pd # type: ignore
import matplotlib.pyplot as plt # type: ignore
from flask import Flask, send_file, jsonify # type: ignore
from flask_cors import CORS  # type: ignore # <-- Import CORS
import io

# Initialize Flask App

app = Flask(__name__)

CORS(app)  # <-- Enable CORS for all routes
# Define visually appealing synthetic data
n_rows = 500
products = ['coke', 'biscuit', 'cream', 'cake', 'cosmetic Product']
occasions = ['None', 'Christmas', 'Holi', 'Diwali', 'Navratri']

# Create a trend in sales to make the graph visually interesting
time_index = pd.date_range('2023-01-01', periods=n_rows, freq='H')
trend = np.linspace(50, 500, n_rows)  # Gradual sales increase
seasonal = 50 * np.sin(np.linspace(0, 3 * np.pi, n_rows))  # Seasonal fluctuations
random_noise = np.random.randint(-20, 20, n_rows)
base_units = trend + seasonal + random_noise
base_units = np.clip(base_units, a_min=10, a_max=None).astype(int)

data = {
    'Time': time_index,
    'Price': np.random.choice([50, 60, 70, 80, 90, 100], n_rows),
    'Units Sold': base_units,
}

df = pd.DataFrame(data)
df['Total Price'] = df['Price'] * df['Units Sold']

# Function to generate sales performance over time plot
def sales_performance_plot():
    df_copy = df.copy()
    df_copy.set_index('Time', inplace=True)
    fig, ax = plt.subplots(figsize=(12, 5))
    fig.set_facecolor('#f7f7f7')
    df_copy['Total Price'].plot(ax=ax, label='Total Sales', marker='o', linewidth=2)
    df_copy['Total Price'].rolling(window=12).mean().plot(ax=ax, label='12-Hour Moving Avg', linestyle='--', color='orange')
    ax.set_title('📈 Total Sales Over Time', fontsize=14)
    ax.set_xlabel('Time')
    ax.set_ylabel('Total Sales')
    ax.legend()
    ax.grid(True, linestyle='--', alpha=0.5)
    fig.tight_layout()
    return fig

# Helper to convert plot to image response
def generate_plot(plot_func):
    fig = plot_func()
    img = io.BytesIO()
    fig.savefig(img, format='png')
    img.seek(0)
    plt.close(fig)
    return img

@app.route("/")
def hello():
    return "Flask is running!"

# API endpoint
@app.route("/sales_performance", methods=["POST"])
def sales_performance():
    try:
        print("kkk")
        img = generate_plot(sales_performance_plot)
        return send_file(img, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5001,debug=True)