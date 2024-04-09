import React, { useState } from 'react';
import styles from './Register.module.css';
import Input from '../../components/Input';
import Button from "../../components/Button";
import api from '../../services/api';
import logo from './img/logo.png';
import SweetAlerts from '../../components/SweetAlert';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const initialStateUser = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    const [user, setUser] = useState(initialStateUser);
    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const navigate =  useNavigate();
    const handlerSubmit = e => {
        e.preventDefault();
        api.post('/users', user).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Conta criada com sucesso');
            setSweetTitle('Sucesso');        
        });
    }

    const onClose = () => {
        navigate('/');
        setSweetShow(false);
    }
    const handlerChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }
    return (
        <div className={styles.Login}>
            <form onSubmit={handlerSubmit}>
                <img src={logo}/>
                <Input
                    placeholder={'Digite seu nome'}
                    label={'Nome'}
                    required
                    name={'name'}
                    onChange={handlerChange}
                    value={user.name}
                    type={'text'}
                />
                <Input
                    placeholder={'example@domain.com'}
                    label={'Email'}
                    required
                    name={'email'}
                    onChange={handlerChange}
                    value={user.email}
                    type={'email'}
                />
                <Input
                    placeholder={'*******'}
                    label={'Senha'}
                    required
                    name={'password'}
                    onChange={handlerChange}
                    value={user.password}
                    type={'password'}
                />

                <Input
                    placeholder={'*******'}
                    label={'Senha'}
                    required
                    name={'password_confirmation'}
                    onChange={handlerChange}
                    value={user.password_confirmation}
                    type={'password'}
                />

                <Button>Criar conta</Button>
            </form>
            
            <SweetAlerts
                onConfirm={onClose}
                title={sweetTitle}
                type={sweetType}
                btnConfirmStyle={'success'}
                text={sweetText}
                show={sweetShow}
                confirmBtnText={'Ok'}
                closeOnClickOutside={false}
            />

        </div>
    );
}

export default Index;