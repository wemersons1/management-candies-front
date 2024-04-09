import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

const Index = () => {
    const Register = React.lazy(() => import('../Register'));
    const Login = React.lazy(() => import('../Login'));

    return (
        <Suspense fallback={""}>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Suspense>
    );
}

export default Index;