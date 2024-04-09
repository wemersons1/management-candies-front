import React from 'react';
import styles from './Button.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

const Button = (props) => {

    if (props.type === 'add') {
        return (
            <button
                onClick={props.onClick}
                className={`${styles.add} ${props.className}`}
                type={'button'}
            ><IoMdAddCircleOutline style={{ fill: "white" }} className={'mr-2'} size={15} />{props.children}</button>
        );
    }
    else if (props.type === 'remove') {
        return (
            <button
                onClick={props.onClick}
                className={`${styles.Delete} ${props.className}`}
                type={'button'}
            ><IoMdRemoveCircleOutline style={{ fill: "white" }} className={'mr-2'} size={15} />{props.children}</button>
        );
    }
    else if (props.type === 'delete') {
        return (
            <button
                type={'button'}
                onClick={props.onClick}
                className={styles.Delete}
            ><AiOutlineDelete size={20} style={{ fill: "white" }} /></button>
        );
    }
    else if (props.type === 'destroy') {
        return (
            <button
                type={'button'}
                onClick={props.onClick}
                className={`${styles.Destroy} ${props.className}`}
            ><AiOutlineDelete size={20} style={{ fill: "white" }} /></button>
        );
    }

    return (
        <div className={styles.Button}>
            <button
                disabled={props.disabled}
                onClick={props.onClick}
                type={props.style === 'remove' ? 'button' : props.type}
                value={props.value}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                className={`${props.className} ${props.style ? styles[props.style] : styles.default}`}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Button;
