import React from 'react';
import styles from './CardForm.module.css';

const CardForm = ({type, children, height, number}) => {

    return (
        <div style={{padding: '1rem'}} className={`${styles[type]} ${height ? styles[height]: ''}`}>
            <span className={styles.Number}>{number}</span>
            {children}
        </div>
    );

}

export default CardForm;
