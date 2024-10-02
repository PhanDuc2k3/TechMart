import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routers/index'; // Import file router của bạn
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Router>
                    <ToastContainer style={{ marginTop: 100 }} />

                    <HeaderComponent />

            <Routes>
                
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <>
                                <route.page /> {/* Render component của route */}
                            </>
                        }
                    />
                ))}
            </Routes>
            <FooterComponent />
        </Router>
    );
}

export default App;
