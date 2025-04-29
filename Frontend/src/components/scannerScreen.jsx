import React, { useRef, useState } from "react";

const ScannerScreen = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState(null); // <-- Store backend response
    const [cameraActive, setCameraActive] = useState(false); // <-- Store backend response

    const startCamera = async () => {
        try {
            setCameraActive(true)
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = newStream;
            setStream(newStream);
        } catch (err) {
            console.error("Camera error:", err);
            setError("Camera access failed");
        }
    };

    const stopCamera = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
        setCameraActive(false)
    };

    const captureFrame = () => {
        // ✅ Prevent scan if camera is not active or video is not ready
        if (!videoRef.current || !cameraActive || !videoRef.current.srcObject) {
            console.warn("📷 Camera not active or video not ready");
            return;
        }
    
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
            if (blob) sendToBackend(blob);
        }, "image/jpeg");
    };
    

    const sendToBackend = async (blob) => {
        try {
            setProcessing(true);
            setError(null);
            setProductData(null); // Clear previous data

            const formData = new FormData();
            formData.append("file", blob, "screenshot.jpg");

            const response = await fetch("http://192.168.114.214:5000/scan-image", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("✅ Backend response:", result);

            if (result.data) {
                setProductData(result.data);
            } else {
                setError("No data received");
            }

        } catch (err) {
            console.error("❌ Error sending image:", err);
            setError("Upload failed");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-3xl font-semibold mb-6">🖼 Product Scanner</h2>
            <div className="w-full max-w-md h-64 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                <video ref={videoRef} autoPlay style={{ width: "400px", borderRadius: "10px" }} />
            </div>
            <div style={{ marginTop: "10px" }}>
                {!cameraActive &&
                    <button onClick={startCamera} className="mb-6 ml-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md">Start Camera</button>}
                {cameraActive &&
                    <>
                        <button onClick={processing ? null : captureFrame} className="mb-6 ml-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md">{processing ? "Scanning": "Scan"}</button>
                        <button onClick={stopCamera} className="mb-6 ml-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md">Stop Camera</button>
                    </>}
            </div>

            {/* {processing && <p>⏳ Processing...</p>} */}
            {error && <p style={{ color: "red" }}>❌ {error}</p>}

            {productData && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "10px", width: "400px" }}>
                    <h3>📦 Extracted Product Details</h3>
                    <p><strong>Name:</strong> {productData.name || "N/A"}</p>
                    <p><strong>Brand:</strong> {productData.brand || "N/A"}</p>
                    <p><strong>Type:</strong> {productData.product_type || "N/A"}</p>
                    <p><strong>Size:</strong> {productData.size || "N/A"}</p>
                    <p><strong>Expiry:</strong> {productData.expiry || "N/A"}</p>
                    <p><strong>Price:</strong> {productData.price || "N/A"}</p>
                    <p><strong>SKU:</strong> {productData.sku || "N/A"}</p>
                </div>
            )}
        </div>
    );
};

export default ScannerScreen;
