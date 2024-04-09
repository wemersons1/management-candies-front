import React from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

const SweetAlerts = ({show, showCancel, onConfirm, onCancel, type, title, btnConfirmStyle, btnCancelStyle, confirmBtnText, cancelBtnText, text, children}, props)=> {

    const cancelBtnStyle = {
        width: '10rem',
        height:"5rem",
        fontSize: "2rem",
        paddingTop: '0.9rem',
        backgroundColor: "#d9534f",
        color: "white",
        textDecoration: "none",
    };

    return (
        <div>
            <SweetAlert
                closeOnClickOutside= {false}
                type={type}
                showCancel={showCancel}
                confirmBtnText={confirmBtnText}
                cancelBtnText = {cancelBtnText}
                confirmBtnBsStyle={btnConfirmStyle}
                cancelBtnBsStyle={btnCancelStyle}
                confirmBtnStyle={{width: '10rem', height:"5rem",fontSize: "2rem", paddingTop: '0.9rem'}}
                cancelBtnStyle={cancelBtnStyle}
                onConfirm={onConfirm}
                onCancel={onCancel}
                openAnim={{ name: 'showSweetAlert', duration: 900 }}
                closeAnim={{ name: 'hideSweetAlert', duration: 200 }}
                title={title}
                show={show}
            >
                {text ?? children}

            </SweetAlert>
        </div>
    );
};
export default SweetAlerts;
