import React from 'react';
import styles from './TextArea.module.css';

const TextArea = (props) => {

    return (
        <div className={styles.FormGroup}>
            <label htmlFor={props.id}>{props.label}</label>
            <textarea
                className={styles.Input}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                id={props.id}
                disabled={props.disabled}
                required={props.required}
            >{props.value}</textarea>
        </div>

    );
}

export default TextArea;
