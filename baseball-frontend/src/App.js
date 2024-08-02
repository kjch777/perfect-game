import './App.css';
import {Routes, Route} from "react-router-dom";
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Signup from './components/Login/signup';
import MemberTable from './components/Login/MemberTable';
function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        {/*
        <Route path="/login" element={<Login/>}></Route>
        */}
        <Route path="/members/signup" element={<Signup/>}></Route>
        <Route path="/members/membertable" element={<MemberTable/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;