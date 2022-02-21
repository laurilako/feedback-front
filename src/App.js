import React from 'react';
import {
  ChakraProvider, theme,
} from '@chakra-ui/react';
import Home from './Pages/Home'
import NewFeedback from './Pages/NewFeedback';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<NewFeedback />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
