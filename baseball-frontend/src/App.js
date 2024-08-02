import logo from './logo.svg';
import './App.css';
import FoodMain from './components/Food/foodMain';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FoodMain />} />
      </Routes>
    </div>
  );
}

export default App;
