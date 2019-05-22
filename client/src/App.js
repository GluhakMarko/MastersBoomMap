import React from 'react';
import{BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Container from "reactstrap/es/Container";
import Navigation from "./components/layout/Navigation";
import Album from "./components/layout/Album";
import Mycard2 from "./components/MyCard2"
import About from "./pages/About";
import Footer from "./components/layout/Footer";




function App() {
    return (
        <Router>
        <div className="App">

            <Navigation/>

            <Route path="/statistika" component={Album}/>

            <Container>

            </Container>

            <Route path="/about" component={About}/>
        </div>
            <Footer/>
        </Router>
    );
}

export default App;
