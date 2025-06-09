import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const isLoggedIn = user && user?.token;


  return (
    
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!isLoggedIn ? <Auth /> : <Navigate to="/posts" />} />

        </Routes>
      </Container>
    
  );
};

export default App;
