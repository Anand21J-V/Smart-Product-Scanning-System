import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from './utils/historyContext';
import axios from 'axios';

function QuickScanBox() {

    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    // const [productData, setProductData] = useState(null); // <-- Store backend response
    const [productData, setProductData] = useState(null); // <-- Store backend response
    const [uploaderActive, setUploaderActive] = useState(false); // <-- Store backend response
    const [cameraActive, setCameraActive] = useState(false); // <-- Store backend response
    const [appStarted, setAppStarted] = useState(false); // <-- Store backend response
    const [suggestionsBox, setSuggetionsBox] = useState(false); // <-- Store backend response
    const [suggestions, setSuggetions] = useState(); // <-- Store backend response
    const { historyData } = useHistory();
    const fileInputRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        // getSuggestion();
    }, [])

    const handleDivClick = () => {
        setUploaderActive(true)
        setSuggetionsBox(false)
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleFileChange = (e) => {
        setAppStarted(true)
        setUploaderActive(true)
        setSuggetionsBox(false)
        const file = e.target.files[0];
        if (file) {
            sendImageToBackend(file); // Send the selected file to backend
        }
    };
    const startCamera = async () => {
        try {
            setUploaderActive(true)
            setCameraActive(true)
            setAppStarted(true)
            setSuggetionsBox(false)
            console.log(typeof (productData))
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
        setUploaderActive(false)
        setCameraActive(false)
        setSuggetionsBox(false)
    };

    const captureFrame = () => {
        // ✅ Prevent scan if camera is not active or video is not ready
        if (!videoRef.current || !uploaderActive || !videoRef.current.srcObject) {
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
            setSuggetionsBox(false)
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

    const sendImageToBackend = async (file) => {
        try {
            setProcessing(true);
            setError(null);
            setProductData(null); // Clear previous data
            setSuggetionsBox(false)

            const formData = new FormData();
            formData.append("file", file); // file will be the uploaded image

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


    const uploadData = async (rawData) => {
        try {
            setError(null);
            setProcessing(true);
            setSuggetionsBox(false)
            // console.log("hiiiiiii")

            // ✅ Extract only the fields needed
            const product = {
                name: productData.name,
                price: productData.price == null ? "" : productData.price,  // clean ₹
                expiry: productData.expiry,  // format: "dd/mm/yy"
                brand: productData.brand == null ? "null" : productData.brand,
                sku: productData.sku == null ? "null" : productData.sku,
                size: productData.size == null ? "" : productData.size,
                product_type: productData.product_type == null ? "null" : productData.product_type
            };
            // console.log(typeof(productData.size))

            const response = await fetch("http://192.168.114.214:5000/add_product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "Something went wrong");
            }

            setProductData(null);
            console.log("✅ Product uploaded successfully!");
        } catch (err) {
            console.error("❌ Error sending JSON:", err);
            setError("Upload failed");
        } finally {
            setProcessing(false);
        }
    };


    const closePopUp = () => {
        setProductData(null)
        setError(null)
        setSuggetionsBox(false)
    }
    const closeUploader = () => {
        setProductData(null)
        setError(null)
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false)
        setUploaderActive(false)
        setProcessing(false)
        setSuggetionsBox(false)
    }

    const getSuggestion = async () => {
        try {
            // setSuggetionsBox(true)
            // console.log(suggestionsBox)
            const response = await axios.get("http://192.168.114.199:5000/seasonal-alert");
            const newData = response.data;
            // console.log(newData)

            // Optional: Only update if data has changed
            if (JSON.stringify(newData) !== JSON.stringify(historyData)) {
                setSuggetions(newData.alert);
            }
            console.log(typeof (suggestions))
            console.log(suggestions)
        } catch (err) {
            console.error("Polling error:", err.message);
        }
    }

    const fetchChart = async () => {
        try {
            const response = await fetch('http://192.168.114.199:5001/sales_performance', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chart');
            }

            const blob = await response.blob();
            const imageObjectURL = URL.createObjectURL(blob);
            setImgSrc(imageObjectURL);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const toggleSuggestion = () => {
        setProductData(null)
        setError(null)
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false)
        setUploaderActive(false)
        setProcessing(false)
        setSuggetionsBox(!suggestionsBox)
        if (suggestionsBox) {
            // getSuggestion();
            fetchChart();
        }
    }


    return (<>
        {appStarted ? <>
            <div className="fixed left-1/2 top-[2vh] transform -translate-x-1/2 sm:left-[43vw]">
                <button className="bg-black h-[48px] font-[Helvetica World] text-white font-normal px-6 py-2 rounded-full transition duration-300 pointer-events-none">
                    Capture
                </button>
            </div>

            <div className="w-full sm:w-[70vw] h-[82%] rounded-[30px] mb-20 sm:mb-20 mb-12 sm:mx-0 mx-4 overflow-hidden bg-white flex flex-col shadow justify-center items-center">
                {/* Top */}
                <div className="h-[60px] w-full bg-[#F7F7F7] flex items-center justify-start pl-4">
                    <p className="text-black  font-[Helvetica World] font-normal ml-4">Quick Scan</p>
                    <p className="text-black  font-[Helvetica World] font-normal ml-4">|</p>
                    <p className="text-[#7D7D7D]  font-[Helvetica World] font-normal text-[10px] ml-4">17/04/2025</p>
                </div>

                {/* Main */}
                <div className="flex-1 w-full h-[80%] flex items-center justify-center px-2 pb-4 pt-2 relative">
                    {uploaderActive ?
                        <div className="flex-1 w-full h-full flex items-center justify-center rounded-[30px] bg-black overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                className="w-full h-full object-cover rounded-[10px]"
                            />
                            <button onClick={closeUploader} className='absolute top-6 right-8 text-white text-[24px]'>X</button>
                            {processing || productData != null ? <div className="absolute bg-white/90 rounded-xl p-4 shadow-lg text-sm text-black z-10 backdrop-blur-md ">
                                {productData != null ? <><button onClick={closePopUp} className='absolute top-2 right-2'>X</button>
                                    {productData.name == null ? <></> : <p><span className="font-semibold">Name:</span> {productData.name}</p>}
                                    {productData.brand == null ? <></> : <p><span className="font-semibold">Brand:</span>  {productData.brand}</p>}
                                    {productData.product_type == null ? <></> : <p><span className="font-semibold">Product Type:</span>  {productData.product_type}</p>}
                                    {productData.size == null ? <></> : <p><span className="font-semibold">Size:</span>  {productData.size}</p>}
                                    {productData.expiry == null ? <></> : <p><span className="font-semibold">Expiry:</span>  {productData.expiry}</p>}
                                    {productData.price == null ? <></> : <p><span className="font-semibold">Price:</span>  {productData.price}</p>}
                                    {productData.sku == null ? <></> : <p><span className="font-semibold">SKU:</span>  {productData.sku}</p>}
                                    <button onClick={uploadData} className="w-10 h-10 float-right flex flex-row items-center bg-black mx-2 px-1 py-1 rounded-full">
                                        <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center">
                                            <PaperAirplaneIcon className="w-6 h-6 text-white rotate-[-45deg]" />
                                        </div>
                                        {/* <p className="text-sm text-gray-700 mx-4">Send</p> */}
                                    </button></> : <>
                                    <p><span className="font-semibold">Processing....</span></p>
                                </>}
                            </div> : <></>}

                            {uploaderActive ? <div className='absolute bottom-6 z-5 w-15 items-center justify-center h-15 border border-2 border-white p-1 hover:border-[#D7D7D7]  rounded-full'>
                                <button onClick={processing ? null : captureFrame} className=" w-12 h-12 bg-white  font-[Helvetica World] rounded-full hover:bg-[#D7D7D7] shadow-md text-xs">{processing ? "...." : "SCAN"}</button>
                            </div> : <></>}
                            {error && <p className="text-red-500 absolute">❌ {error}</p>}
                        </div> :
                        suggestionsBox ?
                            <div className="flex-1 w-full h-full rounded-[30px] overflow-y-scroll scroll-reverse scrollbar-thin scrollbar-thumb-gray-300 flex flex-col">
                                <div className="w-full h-auto my-2 bg-[#E2F7F5] rounded-[30px] px-6 py-4 flex flex-col justify-start">
                                    <p className="ml-3 text-sm font-normal font-[Helvetica World]">
                                        Next festival is Summer.
                                    </p>
                                    <p className="ml-3 text-sm font-normal font-[Helvetica World]">
                                        The products that need to be kept in inventory are:
                                    </p>
                                    <p className="ml-3 text-sm font-normal font-[Helvetica World]">
                                        <ul className='list-disc pl-8'>
                                            <li className="ml-3 text-sm font-normal font-[Helvetica World]">SUNSCREEN SPF 50</li>
                                            <li className="ml-3 text-sm font-normal font-[Helvetica World]">LIGHT MOISTURISER</li>
                                            <li className="ml-3 text-sm font-normal font-[Helvetica World]">HYDRATING FACE WASH</li>
                                        </ul>
                                    </p>
                                    <p className="ml-3 text-sm font-normal font-[Helvetica World]">{suggestions}</p>
                                    {imgSrc && (
                                        <div className="mt-8">
                                            <img src={imgSrc} alt="Sales Performance" className="rounded shadow" />
                                        </div>
                                    )}
                                </div>
                            </div> :
                            <div className="flex-1 w-full h-full rounded-[30px] overflow-y-scroll scroll-reverse scrollbar-thin scrollbar-thumb-gray-300 flex flex-col-reverse">
                                {historyData.map((item, index) => (<>
                                    <div
                                        key={index}
                                        className="w-full h-auto my-2 bg-[#E2F7F5] rounded-[30px] px-3 py-2 flex items-center"
                                    >
                                        {/* <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                                    <img src="/bat_duck.png" alt="Comment Icon" className="w-6 h-6" />
                                </div> */}
                                        <div className="flex flex-col">
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.brand}</p>
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.size}</p>
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.price}</p>
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.product_type}</p>
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.expiry}</p>
                                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.sku}</p>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row items-center">
                                        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                                            <img src="/bat_duck.png" alt="Comment Icon" className="w-6 h-6" />
                                        </div>
                                        <p className=" text-sm font-normal font-[Helvetica World]">{item.name}</p>
                                    </div>
                                </>))}
                            </div>
                    }
                </div>


                {/* Bottom */}
                <div className="h-[10%] w-[98%] flex items-center justify-center">
                    <div className="flex rounded-[50px] bg-[#DADADA] py-2 w-full m-4 mb-8 justify-between">
                        {/* First Row */}
                        <div className="flex">
                            {/* Upload Photo */}
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* Custom Upload Button */}
                            <div
                                className="flex flex-row items-center bg-white mx-2 px-1 py-1 rounded-full cursor-pointer"
                                onClick={handleDivClick}
                            >
                                <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                                    <img src="/upload_photo.png" alt="Upload" className="w-6 h-6 invert" />
                                </div>
                                <p className="text-sm text-gray-700 mx-4 hidden sm:block">Upload Photo</p>
                            </div>

                            {/* Open Camera */}
                            {cameraActive ? (
                                <button onClick={stopCamera}>
                                    <div className="flex flex-row items-center bg-white mx-2 px-1 py-1 rounded-full">
                                        <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                                            <img src="/Camera.png" alt="Camera" className="w-6 h-6 invert" />
                                        </div>
                                        <p className="text-sm text-gray-700 mx-4 hidden sm:block">Close Camera</p> {/* Hidden on small screens */}
                                    </div>
                                </button>
                            ) : (
                                <button onClick={startCamera}>
                                    <div className="flex flex-row items-center bg-white mx-2 px-1 py-1 rounded-full">
                                        <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                                            <img src="/Camera.png" alt="Camera" className="w-6 h-6 invert" />
                                        </div>
                                        <p className="text-sm text-gray-700 mx-4 hidden sm:block">Open Camera</p> {/* Hidden on small screens */}
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Second Row - Justify Between */}
                        <div className="flex">
                            {/* Send */}
                            <button onClick={toggleSuggestion}>
                                <div className="flex flex-row items-center bg-white mx-2 px-1 py-1 rounded-full">
                                    <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                                        <img src="/send_light.png" alt="Camera" className="w-6 h-6 invert" />
                                    </div>
                                    <p className="text-sm text-gray-700 mx-4 hidden sm:block">{suggestionsBox ? "History" : "Suggestion"}</p>
                                </div>

                            </button>
                            <div className="flex flex-row items-center bg-black mx-2 px-1 py-1 rounded-full">
                                <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center">
                                    <img src="/arrow.png" alt="Send" className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> </> :
            <div className='justify-center items-center absolute top-0 left-0 w-full h-full'>
                <div className='w-[60px] mx-auto mb-4 mt-16'>
                    <img src="/welcomeGlobe.png" alt="" />
                </div>
                <center>
                    <p className='text-[38px]  font-[Helvetica World] text-black mx-auto font-normal mb-2'>Welcome</p>
                    <p className='text-[22px] font-[Helvetica World] text-[#727272] mx-auto font-medium mb-6' style={{ fontFamily: '"Helvetica World", Helvetica, Arial, sans-serif' }}>What would you like to scan.</p>
                </center>
                <div className='w-[30vw] mx-auto mb-[10vh] mt-12'>
                    <img src="/fourImages.png" alt="" />
                </div>
                <div className="flex rounded-[50px] bg-[#000000] p-1 mb-8 max-w-[370px] mx-auto">
                    {/* Upload Photo */}
                    {/* <button className="w-1/2 flex flex-row items-center bg-white mr-2 px-1 py-1 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                            <img src="/upload_photo.png" alt="Upload" className="w-6 h-6 invert" />
                        </div>
                        <p className="text-sm text-gray-700 mx-4">Upload Photo</p>
                    </button> */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Custom Upload Button */}
                    <div
                        className="w-1/2 flex flex-row items-center bg-white mr-2 px-1 py-1 rounded-full flex flex-row items-center bg-white mx-0 px-1 py-1 rounded-full cursor-pointer"
                        onClick={handleDivClick}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                            <img src="/upload_photo.png" alt="Upload" className="w-6 h-6 invert" />
                        </div>
                        <p className="text-sm text-gray-700 mx-4 hidden sm:block">Upload Photo</p>
                    </div>
                    {/* Open Camera */}
                    <button onClick={startCamera} className="w-1/2 flex flex-row items-center bg-white  px-1 py-1 rounded-full">
                        {/* <div> */}
                        <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                            <img src="/Camera.png" alt="Camera" className="w-6 h-6 invert" />
                        </div>
                        <p className="text-sm text-gray-700 mx-4">Open Camera</p>
                        {/* </div> */}
                    </button>
                </div>
            </div>
        }
    </>
    );
}

export default QuickScanBox;
