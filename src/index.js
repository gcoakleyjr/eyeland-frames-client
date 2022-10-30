import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/styles'
import ScrollToTop from './ScrollToTop';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App tab="home" />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    </BrowserRouter>)