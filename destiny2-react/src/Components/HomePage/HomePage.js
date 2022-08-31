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



    const creation = new Date(clanData?.creationDate);

    return (
        <>
            <title>Home</title>
            <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto', 'background': '#000000ce', "padding": '10px', 'width': 'fit-content' }}>
                Welcome to the BGs Destiny 2 clan, website!
                <p style={{ 'fontSize': '14px' }}>
                    Created by: SpooRe
                </p>
            </h1>
            {
                <div className="homeContainer">
                    {isLoading
                        ?
                        <ClockLoader color="lightblue" size="50px" />
                        :
                        clanData
                        &&
                        <>
                            <div>
                                <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto 15px', "padding": '10px', "textDecoration": "underline" }}>CLAN INFO</h1>
                                <h3>{clanData?.name}</h3>
                                <p>Since: {`${creation?.getDate()}/${creation?.getMonth() + 1}/${creation?.getFullYear()}`}</p>
                                <p>Our moto: </p>
                                <h4>{clanData?.motto}</h4>
                                <h4>Callsign: {clanData?.clanInfo.clanCallsign}</h4>
                                <div>
                                    <article>
                                        {clanData?.about}
                                    </article>
                                </div>
                                <button className={styles["showMembers"]}
                                    onClick={() => [setToShowMembers(state => !state), window.scroll({ top: 800, behavior: 'auto' })]}
                                    style={toShowMembers ? { 'color': 'coral' } : { 'color': 'lightblue' }}
                                >
                                    {!toShowMembers ? "Show clan members" : "Hide clan members"}

                                </button>
                            </div>
                            <div className={styles["clan-member-container"]}>

                                {toShowMembers &&

                                    <>
                                        {
                                            clanMembers?.sort((a, b) => b.memberType - a.memberType)
                                                .map(el =>
                                                    <h1 key={el.destinyUserInfo.membershipId}>
                                                        {el.memberType === 5 ? 'Clan Owner' : ""} <ClanMemberComponent key={el.destinyUserInfo.membershipId} data={el} />
                                                    </h1>)
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