import React from 'react';type
import styles from './Container.module.css';

const Container = ({children, size}) => {

    return (
        <div className={size ? styles[size]: styles.Container}>
            {children}
        </div>
    );
}

export default Container;
