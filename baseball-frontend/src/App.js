import logo from './logo.svg';
import './App.css';
import FoodMain from './components/Food/foodMain';
import FoodMapLG from "./components/Food/foodMapLG";
import FoodDetail from "./components/Food/foodDetail";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FoodMain />} />
        <Route path="/foodmapLG" element={<FoodMapLG />} />
        <Route path="/food-detail/:foodId" element={<FoodDetail />} />
      </Routes>
    </div>
  );
}

export default App;
