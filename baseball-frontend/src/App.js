import './App.css';
import {Routes, Route} from "react-router-dom";
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;