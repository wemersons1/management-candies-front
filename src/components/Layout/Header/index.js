import { useContext } from 'react';
import headerStyles from './Header.module.css';
import AppContext from '../../../AppContext/Context';

const Index = () => {
    const { user } = useContext(AppContext);

    return (
        <div className={headerStyles.header}>
            <button className={headerStyles.signOut}>Olá, {user.name}</button>
        </div>
    );
}

export default Index;