
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
                    <NavLink to="#">Some Stuff</NavLink>
                    <ul className={styles["submenu"]}>
                        <li>
                            <NavLink to="">Photos</NavLink>
                        </li>
                        <li>
                            <NavLink to="">Videos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/bgs/links">Useful links</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/bgs/news">News</NavLink>
                </li>
                <li>
                    <a href='https://www.bungie.net/en/ClanV2?groupid=4131725' target="_blank" rel="noreferrer">About us & Join (redirects to Bungie.net)</a>
                </li>
            </ul>
        </>
    )
}