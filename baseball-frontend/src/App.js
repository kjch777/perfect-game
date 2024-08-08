import './App.css';
import FoodMain from './components/Food/foodMain';
import FoodMapLG from "./components/Food/foodMapLG";
import FoodMapKIWOOM from "./components/Food/foodMapKIWOOM";
import FoodMapSSG from './components/Food/foodMapSSG';
import FoodMapKIA from './components/Food/foodMapKIA';
import FoodDetail from "./components/Food/foodDetail";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FoodMain />} />
        <Route path="/foodmapLG" element={<FoodMapLG />} />
        <Route path="/foodmapSSG" element={<FoodMapSSG />} />
        <Route path="/foodmapKIWOOM" element={<FoodMapKIWOOM />} />
        <Route path="/foodmapKIA" element={<FoodMapKIA />} />
        <Route path="/fooddetail/:foodId" element={<FoodDetail />} />
      </Routes>
    </div>
  );
}

export default App;
