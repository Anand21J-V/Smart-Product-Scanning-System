import { createContext, useState, useContext } from "react";

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [historyData, setHistoryData] = useState([]);

    return (
        <HistoryContext.Provider value={{ historyData, setHistoryData }}>
            {children}
        </HistoryContext.Provider>
    );
};
