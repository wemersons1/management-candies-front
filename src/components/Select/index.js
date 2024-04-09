import React from 'react';
import styles from './Select.module.css';

const Select = (props) => {

    let randomId = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

    return (
        <div className={styles.FormGroup}>
            <label htmlFor={props.id  ?? randomId.toString()}>{props.label} {props.required ? '*' : null}</label>
            <select
                disabled={props.disabled}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                id={props.id ?? randomId.toString()}
                className={styles.Select}
                onBlur={props.onBlur}
                required={props.required}
                defaultValue={props.defaultValue}
            >{props.children}</select>
        </div>
    );
}

export default Select;
