import React from 'react';
import InputMask from "react-input-mask";
import styles from './Input.module.css';

const Input = (props) => {

    if (props.type === 'file') {

        return (
            <div className={styles.InputFile}>
                <label htmlFor={props.id}>{props.label}</label>
                <div><label htmlFor={props.id} className={styles.ButtonFile}>Selecione</label><span>{props.placeholder}</span></div>
                <input
                    style={{ display: "none" }}
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    onBlur={props.onBlur}
                />
            </div>

        );
    }

    let randomId = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

    return (
        <div className={styles.FormGroup}>

            <InputMask
                autoFocus={props.autoFocus}
                alwaysShowMask={props.alwaysShowMask}
                mask={props.mask}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                className={props.type === 'radio' || props.type === 'checkbox' ? styles.Radio : `${styles.Input} ${styles[props.className]}`}
                checked={props.checked}
                id={props.id ?? randomId.toString()}
                disabled={props.disabled}
                step={props.step}
                required={props.required}
                defaultChecked={props.defaultChecked}
                ref={props.ref}
                min={props.min}
                max={props.max}
                maxLength={props.maxLength}
                minLength={props.minLength}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onKeyUp={props.onKeyUp}
                onClick={props.onClick}
            />
            <label htmlFor={props.id ?? randomId.toString()}>{props.label} {props.required ? '(Obrigatório)' : null}</label>
        </div>

    );

}

export default Input;
