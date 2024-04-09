import React from 'react';
import styles from './System.module.css';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';

const Index = () => {

    return (
        <div>
            <Header/>
            <div className={styles.System}>
                <Sidebar/>
                <Content/>
            </div>
        </div>
       
    );

}

export default Index;
