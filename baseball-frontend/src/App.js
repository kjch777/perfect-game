import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainApp from './components/main_components/MainApp';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GameDetail from './components/main_components/GameDetail';
import GameAddPage from './components/main_components/GameAddPage';

function App(){

    return(
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<MainApp/>}>메인페이지(달력,경기)</Route>
                <Route path='/gameDetail' element={<GameDetail/>}>경기상세페이지</Route>
                <Route path='/gameAddPage' element={<GameAddPage/>}>경기추가페이지</Route>
            </Routes>
            <Footer/>
        </Router>
    )

}
export default App;