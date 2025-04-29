import HistoryBlock from "../components/historyBlock";
import Navbar from "../components/navbarComponent";
import QuickScanBox from "../components/quickScanBox";
import SideBar from "../components/sideBar";


const Homepage = () => {

  return (
    <main className="w-screen h-screen overflow-hidden ">
      <Navbar />
      <div className="flex w-full h-full items-center justify-between gap-4 ">
        <SideBar />
        <QuickScanBox />
        <HistoryBlock/>
      </div>
    </main>
  );
};

export default Homepage;
