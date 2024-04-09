import styles from './Sidebar.module.css';
import logo from '../../../pages/Login/img/logo.png'
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import AppContext from '../../../AppContext/Context';

const Index = () => {
    const { signOut } = useContext(AppContext);

    return (
         <div className={styles.sidebar}>
            <div className={styles.Logo}><img src={logo} alt="Logo" width="80%"/></div>
            <nav>
                <ul>
                    <NavLink
                        className={(navData) =>
                            navData.isActive ? styles.LinkActive : styles.MenuColorLabel
                        }
                        to={"/dashboard"}
                    >
                        <li className={styles.Menu}>
                            Dashboard
                        </li>
                    </NavLink>

                    <NavLink
                        className={(navData) =>
                            navData.isActive ? styles.LinkActive : styles.MenuColorLabel
                        }
                        to={"/categories"}
                    >
                        <li className={styles.Menu}>
                
                            Categorias
                        </li>
                    </NavLink>
            
                    <NavLink
                        className={(navData) =>
                            navData.isActive ? styles.LinkActive : styles.MenuColorLabel
                        }
                        to={"/candies"}
                    >
                        <li className={styles.Menu}>
                                Doces
                        </li>
                    </NavLink>
                    <li className={styles.Menu} onClick={signOut}>
                        Sair
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Index;