import React from 'react';
import IntlCurrencyInput from "react-intl-currency-input"
import styles from './InputMoney.module.css';
import Message from "../Message";

const InputMoney = (props) => {

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
            number: {
                BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    };

    let randomId = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

    return (
        <div className={`${styles[props.className] === 'border' ? `${styles[props.className]} ${styles.FormGroup}` : `${styles[props.className] && styles[props.className]!== 'border' ? styles[props.className] : styles.FormGroup}`}`}>
            <label htmlFor={props.id ?? randomId.toString()}>{props.label}</label>
                <IntlCurrencyInput
                    currency="BRL"
                    config={currencyConfig}
                    required={props.required}
                    id={props.id ?? randomId.toString()}
                    onChange={props.onChange}
                    onKeyUp={props.onKeyUp}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    min={props.min}
                    className={`${`${styles[props.className] === 'border' ? `${styles[props.className]} ${styles.Input}` : `${styles[props.className] && styles[props.className]!== 'border' ? styles[props.className] : styles.Input}`}`}`}
                    type={'string'}
                    value={props.value}
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                    style={props.style}
                />
            {
                props.value < props.min && <Message type={'error'}>Valor mínimo {props.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</Message>
            }

        </div>

    )
}
export default InputMoney;
