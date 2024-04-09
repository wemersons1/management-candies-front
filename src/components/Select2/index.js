import React from 'react';
import styles from "./Select2.module.css";
import Select2 from 'react-select';

const Index = (props) => {

    if (props.isMulti) {
        return (
            <div onClick={props.onClick} id={props.id} className={styles.Select2}>
                <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>

                <Select2
                    closeMenuOnSelect={props.closeMenuOnSelect}
                    isMulti={props.isMulti}
                    options={props.options}
                    onChange={props.onChange}
                    value={props.value}
                    required={props.required}
                    isClearable={props.isClearable}
                    isDisabled={props.isDisabled}
                />

            </div>
        );
    }

    return (
        <div className={styles.SelectNormal} onClick={props.onClick} id={props.id} >
            <label htmlFor={props.id} className={styles[props.type]}>{props.label} {props.required ? '*' : null}</label>

            <Select2
                id={props.id}
                closeMenuOnSelect={props.closeMenuOnSelect}
                isMulti={props.isMulti}
                options={props.options}
                onChange={props.onChange}
                value={props.value}
                required={props.required}
                isClearable={props.isClearable}
            />

        </div>
    );
}

export default Index;
