import React from 'react';
import styles from './ContainerFilter.module.css';

const ContainerFilter = ({children}) => {

    return (
        <div className={styles.ContainerFilter}>
            {children}
        </div>
    )
}

export default ContainerFilter;