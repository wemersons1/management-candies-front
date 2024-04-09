import React, { Suspense } from 'react';
import styles from './Admin.module.css';
import { Navigate, Route, Routes } from "react-router-dom";

const Admin = () => {
    const Categories = React.lazy(() => import('./Categories'));
    const Candies = React.lazy(() => import('./Candies'));
    const Dashboard = React.lazy(() => import('./Dashboard'));

    return (
        <div className={styles.Admin}>
           
            <div className={styles.Content}>
                <Suspense fallback={""}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
        
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/candies" element={<Candies />} />

                        <Route
                            path="*"
                            element={<Navigate to="/dashboard" />}
                        />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default Admin;
