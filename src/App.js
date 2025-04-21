import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// 移除 ChakraProvider 导入
import Navigation from './components/Navigation';
import { LogIn } from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reviews from './pages/Grid';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
    return (
        <HashRouter>
            <div>
                {/*<Navigation />*/}
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/reviews/grid" element={<Reviews />} />
                        <Route path="/users" element={<Users />} />
                    </Route>

                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;