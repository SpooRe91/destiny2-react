
// import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faVideo,
    faLink,
    faImage,
    faNewspaper,
    faCaretRight,
    faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'

import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {

    return (
        <>
            <ul className={styles["menu"]}>
                <li>
                    <NavLink to="/"><FontAwesomeIcon icon={faHouse} className={styles['nav-icon']} /> Home</NavLink>
                </li>
                <li className={styles['rotate-arrow']}>
                    <NavLink to="#" > <FontAwesomeIcon icon={faCaretRight} className={styles['rotate-arrow-1']} /> Some Stuff</NavLink>
                    <ul className={styles["submenu"]}>
                        <li className={styles['hidden-li']}>
                            <NavLink to="/bgs/videos" className={styles['hidden-nav-icon']}><FontAwesomeIcon icon={faVideo} /> Videos</NavLink>
                        </li>
                        <li className={styles['hidden-li']}>
                            <NavLink to="/bgs/links" className={styles['hidden-nav-icon']}><FontAwesomeIcon icon={faLink} /> Useful links</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/bgs/news"><FontAwesomeIcon icon={faNewspaper} className={styles['nav-icon']} /> News</NavLink>
                </li>
                <li>
                    <a href='https://www.bungie.net/en/ClanV2?groupid=4131725' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faCircleQuestion} className={styles['nav-icon']} /> Find us on Bungie.net</a>
                </li>
            </ul >
        </>
    )
}
