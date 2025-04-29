import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "./utils/historyContext";

function HistoryBlock() {
    const { historyData, setHistoryData } = useHistory();

    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await axios.get("http://192.168.114.214:5000/product-history");
                const newData = response.data.data;

                // Optional: Only update if data has changed
                if (JSON.stringify(newData) !== JSON.stringify(historyData)) {
                    setHistoryData(newData);
                }
            } catch (err) {
                console.error("Polling error:", err.message);
            }
        };

        // Initial call
        getHistory();

        // Set polling interval
        const interval = setInterval(getHistory, 3000); // every 3 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, [historyData, setHistoryData]);

    return (
        <div className="z-10 hidden sm:block w-[18vw] min-w-[220px] max-w-xs h-[85vh] mb-16 mr-4">
            <div className="h-[50vh] rounded-[50px] overflow-hidden bg-white flex flex-col shadow-md">
                {/* Top */}
                <div className="h-[8.5vh] w-full bg-[#F7F7F7] flex items-center pl-6">
                    <p className="text-black font-normal text-sm font-[Helvetica World]">Product History</p>
                </div>

                {/* Main */}
                <div className="max-h-[60vh] w-full items-center justify-center pb-1 overflow-y-scroll overflow-x-hidden flex-1 px-2 py-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {historyData.map((item, index) => (
                        <div
                            key={index}
                            className="w-full h-auto my-2 bg-[#E2F7F5] rounded-full px-3 py-2 flex items-center"
                        >
                            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                                <img src="/comment_light.png" alt="Comment Icon" className="w-6 h-6" />
                            </div>
                            <p className="ml-3 text-sm font-normal font-[Helvetica World]">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HistoryBlock;
