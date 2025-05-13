import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {LogIn} from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ReviewsGrid from './pages/Grid';
import ReviewsList from './pages/List';
import TodoList from "./pages/TodoList";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <div>
                    {/*<Navigation />*/}
                    <Routes>
                        <Route element={<PublicRoute/>}>
                            <Route path="/login" element={<LogIn/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                        </Route>

                        <Route element={<PrivateRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/dashboard/reviews/grid" element={<ReviewsGrid/>}/>
                            <Route path="/dashboard/reviews/list" element={<ReviewsList/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/dashboard/todolist" element={<TodoList/>}/>
                        </Route>

                        <Route path="/" element={<Navigate to="/login" replace/>}/>
                        <Route path="*" element={<Navigate to="/login" replace/>}/>
                    </Routes>
                </div>
            </HashRouter>
        </QueryClientProvider>
    );
}

export default App;