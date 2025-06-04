import React  from 'react';
import { Container  } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

const App = () => {
   
    return (
    
        <Container maxWidth="lg">
           <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} /> 
        </Routes>
            
        </Container>
       
    );
}

export default App;