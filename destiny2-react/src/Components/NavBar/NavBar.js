
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
// import cryptoRandomString from 'crypto-random-string';

export const NavBar = () => {

    // const [accessToken, setaccessToken] = useState('');
    // const [refreshToken, setRefreshToken] = useState('');
    // const [queryCode] = useSearchParams();

    // const toLogin = () => {

    //     fetch("https://www.bungie.net/Platform/App/OAuth/token/", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/x-www-form-urlencoded",
    //             "Authorization": "Basic NDExNTU6cG5TazNDeUlyYlAxWWlKQjhVeUhZaWRGZzR0ZWNnQktPc1NZTmdrbW5WSQ==",
    //             "Cookie": "Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1gdhRgw__EqR; __cflb=0H28vP5GxS7vgVH4MZT6rB7QcDNQ8jpmJFYtRDVfMjR; bungleanon=sv=BAAAAABJJgAAAAAAAOwfDQAAAAAAAAAAAAAAAAAID2JMKvbZCEAAAAAOOcuwOt0KjtSL8oRYYqStEDCiH2gMRgny6Tf/50UXFBYdwFu4s1F69rEq1deoVYyOxAxmi6GKvIx4hF/oMzU/&cl=MC45ODAxLjg2MDE0MA==; bungled=6697126799407320530; bungledid=BxPhoM1+mU1EhHuZ+eu863QID2JMKvbZCAAA; bungles=WebView=False&UserFlowMode=SignIn&UserICT=None&UserSCT=None&UserForce=False&UserIDN="
    //         },
    //         body: `grant_type=authorization_code&code=dd661df861bd689571179f2bf6b51725`

    //     })
    //         .then(res => res.text())
    //         .then(data => {
    //             setRefreshToken(JSON.parse(data).refresh_token);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

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
                            <NavLink to="/bgs/photos" className={styles['hidden-nav-icon']}><FontAwesomeIcon icon={faImage} /> Photos</NavLink>
                        </li>
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
                {/* {
                    !refreshToken
                        ?
                        <>
                            <li>
                                <button onClick={() => toLogin()}>Login</button>
                            </li>
                            <li>
                                <a href='https://www.bungie.net/en/oauth/authorize?client_id=41155&response_type=code' target={"_self"}>Login</a>
                            </li>
                        </>
                        :
                        <li>
                            <a href='https://www.bungie.net/en/ClanV2?groupid=4131725' target="_blank" rel="noreferrer">{}</a>
                        </li>
                } */}
            </ul >
        </>
    )
}