import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import AppContext from "../../AppContext/Context";
import Input from '../../components/Input';
import Button from "../../components/Button";
import { Link } from 'react-router-dom';
import logo from './img/logo.png';

const Index = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { sign } = useContext(AppContext);

    const handlerSubmit = e => {
        e.preventDefault();
        sign(email, password);
    }

    return (
        <div className={styles.Login}>
            <form onSubmit={handlerSubmit}>
                <img src={logo}/>
                <Input
                    placeholder={'example@domain.com'}
                    label={'Email'}
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type={'email'}
                />
                <Input
                    placeholder={'Senha'}
                    label={'Senha'}
                    required
                    type={'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Link to={'/register'}>Registrar-se</Link>
            
                <Button>Entrar</Button>
            </form>
        </div>
    );
}

export default Index;