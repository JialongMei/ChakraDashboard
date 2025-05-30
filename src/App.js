import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {LogIn} from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ReviewsGrid from './pages/Grid';
import ReviewsList from './pages/List';
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";
// import TodoTest from "./pages/TodoTest";
import AssignedTasksPage from './pages/AssignedTasksPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { AuthProvider } from './context/AuthContext';
import UserSetting from "./pages/UserSetting";
import UserAdmin from "./pages/UserAdmin";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthProvider>
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
                                <Route path="/user-management" element={<UserAdmin/>}/>
                                <Route path="/dashboard/settings" element={<UserSetting/>}/>
                                <Route path="/dashboard/todolist" element={<TodoList/>}/>
                                <Route path="/dashboard/todolist/:id" element={<TodoDetails/>}/>
                                <Route path="/dashboard/assigned-to-me" element={<AssignedTasksPage />} />
                                {/*<Route path="/test" element={<TodoTest/>}/>*/}
                            </Route>

                            <Route path="/" element={<Navigate to="/login" replace/>}/>
                            <Route path="*" element={<Navigate to="/login" replace/>}/>
                        </Routes>
                    </div>
                </HashRouter>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;