import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { getClanInfo, getClanMembers } from "../../Services/requests";
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

        getClanInfo()
            .then(clanInfo => {
                if (clanInfo?.ErrorCode !== 2101
                    && clanInfo?.Response?.detail !== null
                    && clanInfo.Response?.detail !== undefined) {
                    setClanData(clanInfo.Response?.detail);
                    setIsLoading(state => false)
                } else {
                    throw new Error("Unable to fetch clan info, please try again later!");
                }
            })
            .catch(error => {
                alert(error)
            })
        // ---------------------------------------------------------------------------------------------------
        getClanMembers()
            .then(membersData => {
                if (membersData?.ErrorCode !== 2101
                    && membersData.Response !== null
                    && membersData.Response !== undefined) {
                    setClanMembers(sate => membersData.Response.results);
                    setIsLoading(state => false)
                } else {
                    throw new Error('Unble to fetch clan members, please try again later!')
                }
            })
            .catch(error => {
                alert(error)
            })
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
                            <div className={styles["clan-info"]}>
                                <h1 className={styles["welcome-h1"]}>
                                    Welcome to the BGs Destiny 2 clan, website!
                                    <p>
                                        Created by: SpooRe
                                    </p>
                                </h1>
                                <h2 className={styles["head-2"]}>CLAN INFO</h2>
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