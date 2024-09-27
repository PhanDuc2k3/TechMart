import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routers/index'; // Import file router của bạn

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
