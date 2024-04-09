import React from 'react';
import styles from './Message.module.css';

const Message = (props) => {

    if(props.type === 'simple') {

        return (
            <div className={styles.Simple}>
                {props.children}
            </div>
        );
    }

    return (
        <div className={styles.Message}>
            <div className={props.type ? styles[props.type] : null}>
                {props.children}
            </div>
        </div>
    );
}

export default Message;
