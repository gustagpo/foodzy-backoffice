import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Index from './routes'

export default function App() {

  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
            <Index/>
        </BrowserRouter>
      </ChakraProvider>  
    </Provider>
  )
}