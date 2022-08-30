
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {

    return (
        <>
            <ul className={styles["menu"]}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="https://www.blogger.com/blogger.g?blogID=1719501309664700552">Some Stuff</NavLink>
                    <ul className={styles["submenu"]}>
                        <li>
                            <NavLink to="">Photos</NavLink>
                        </li>
                        <li>
                            <NavLink to="">Videos</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/bungie/news">News</NavLink>
                </li>
                <li>
                    <a href='https://www.bungie.net/en/ClanV2?groupid=4131725' target="_blank" rel="noreferrer">About us & Join</a>
                </li>
            </ul>
        </>
    )
}