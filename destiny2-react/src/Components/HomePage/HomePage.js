import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { ScrollButton } from "../Common/ScrollButton";

import { ClanMemberComponent } from "./ClanMemberComponent";
import styles from "./HomePage.module.css";
export const HomePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [clanData, setClanData] = useState(null);
    const [toShowMembers, setToShowMembers] = useState(false);
    const [clanMembers, setClanMembers] = useState(null);
    const [filterValue, setFilterValue] = useState("");

    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;

    useEffect(() => {
        fetch('https://www.bungie.net/Platform/GroupV2/4131725', {
            headers: {
                'content-type': 'application/json',
                "X-API-Key": API_KEY
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.ErrorCode !== 2101 && data?.Response?.detail !== null && data.Response?.detail !== undefined) {
                    setClanData(data.Response?.detail);
                    setIsLoading(state => false)
                } else {
                    throw new Error("Unable to fetch clan info, please try again later!");
                }
            })
            .catch(error => {
                alert(error);
            });

        fetch('https://www.bungie.net/Platform/GroupV2/4131725/Members/', {
            headers: {
                'content-type': 'application/json',
                "X-API-Key": API_KEY
            }
        })
            .then(res => res.json())
            .then(data => setClanMembers(data.Response.results))
            .catch(error => {
                alert(error);
            });
    }, [API_KEY]);

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase().trim());
    };

    const filtered = clanMembers?.filter(x => x.bungieNetUserInfo.displayName.toLowerCase().includes(filterValue));
    const creation = new Date(clanData?.creationDate);
    const sortedAdmins = clanMembers?.filter(a => a.memberType >= 3);
    const sortedMembers = clanMembers?.filter(a => a.memberType < 3)
        .sort((a, b) => a.bungieNetUserInfo.displayName.localeCompare(b.bungieNetUserInfo.displayName));
    console.log(sortedAdmins);
    // User.UserInfoCard

    return (
        <>
            <title>Home</title>

            {
                <div className={styles["home-container"]}>
                    {isLoading
                        ?
                        <ClockLoader color="lightblue" size="50px" />
                        :
                        clanData
                        &&
                        <>
                            <h1>
                                Welcome to the BGs Destiny 2 clan, website!
                                <p style={{ 'fontSize': '14px' }}>
                                    Created by: SpooRe
                                </p>
                            </h1>
                            <div className={styles["clan-info"]}>
                                <h2 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto 15px', "padding": '10px', "textDecoration": "underline" }}>CLAN INFO</h2>
                                <h3>{clanData?.name}</h3>
                                <p>Since: {`${creation?.getDate()}/${creation?.getMonth() + 1}/${creation?.getFullYear()}`}</p>
                                <p>Our moto: </p>
                                <h4 style={{ 'textTransform': 'uppercase' }}>{clanData?.motto}</h4>
                                <h4>Callsign: {clanData?.clanInfo.clanCallsign}</h4>
                                <div>
                                    <article>
                                        {clanData?.about}
                                    </article>
                                </div>
                            </div>
                            <div>
                                <button className={styles["showMembers"]}
                                    onClick={() => [setToShowMembers(state => !state), window.scroll({ top: 800, behavior: 'auto' })]}
                                    style={toShowMembers ? { 'color': 'coral' } : { 'color': 'lightblue' }}
                                >
                                    {!toShowMembers ? "Show members" : "Hide members"}
                                </button>
                            </div>

                            {toShowMembers &&
                                <>
                                    <h1 className={styles["clan-member-sign"]}>CLAN MEMBERS</h1>
                                    <div>
                                        <h1 className={styles["clan-member-search-sign"]}>&#11167; Search for guardian &#11167;</h1>
                                        <form className={styles["search"]} method="GET">
                                            {<input type="text" className={styles["input-field"]} placeholder="Guardian name..." name="search"
                                                defaultValue={filterValue} onChange={filterHandler} />}
                                        </form>
                                    </div>
                                </>
                            }
                            <div className={styles["clan-member-container"]}>
                                {toShowMembers
                                    &&
                                    <>
                                        {
                                            filterValue
                                                ?
                                                filtered?.sort((a, b) => b.memberType - a.memberType)
                                                    .map(el => <ClanMemberComponent key={el.destinyUserInfo.membershipId} data={el} />)
                                                :
                                                <>
                                                    {
                                                        sortedAdmins?.sort((a, b) => b.memberType - a.memberType)
                                                            .map(el => <ClanMemberComponent key={el.destinyUserInfo.membershipId} data={el} />)
                                                    }
                                                    {
                                                        sortedMembers?.sort((a, b) => b.memberType - a.memberType)
                                                            .map(el => <ClanMemberComponent key={el.destinyUserInfo.membershipId} data={el} />)
                                                    }
                                                </>
                                        }
                                    </>
                                }
                            </div>
                        </>
                    }
                    <ScrollButton />
                </div>
            }
        </>
    )
}