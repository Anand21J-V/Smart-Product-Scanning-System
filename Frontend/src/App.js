import './App.css';
import Homepage from './pages/homePage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from 'react-router-dom';
import IntroPage from './pages/introduction';
import { HistoryProvider } from './components/utils/historyContext';
import SalesPerformanceChart from './pages/sales_performance';

function App() {
  return (
    <HistoryProvider>
      <Router>
        <Routes>
          {/* <Route path='/' element={<IntroPage/>}/> */}
          <Route path='/' element={<IntroPage />} />
          <Route path='/chat' element={<Homepage />} />
          <Route path='/sales' element={<SalesPerformanceChart />} />
          {/* <Route path='/thanksPage' element={<ThanksPage />}/> */}
          {/* <Route path='/reviewPage' element={<ReviewPage />}/> */}
        </Routes>
      </Router>
    </HistoryProvider>
  );
}

export default App;
