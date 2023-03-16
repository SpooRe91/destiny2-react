import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { ClockLoader } from "react-spinners";
import { getCharacter, getClanMembers } from "../../Services/requests";
import { ScrollButton } from "../Common/ScrollButton";
import styles from './ClanMemberDetails.module.css'
import TableDataComponent from "./TableDataComponent";

export const ClanMemberDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [clanMembersInfo, setClanMemberInfo] = useState(null);
    const [characterStats, setCharacterStats] = useState(null);


    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        getClanMembers(signal, controller)
            .then(data => {
                if (data?.Response !== null
                    && data?.Response !== undefined
                    && !signal.aborted) {
                    setClanMemberInfo(state =>
                        data?.Response.results.find(el => el?.bungieNetUserInfo.membershipId === id));
                    setIsLoading(state => false)
                } else {
                    if (controller.signal.aborted) { return }
                    throw new Error('Unable to fetch the stats for the current user!')
                }
            })
            .catch(error => {
                console.log(error)
            });
        return (() => {
            controller.abort();
        })
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        if (clanMembersInfo && !signal.aborted) {
            getCharacter(
                clanMembersInfo?.destinyUserInfo.membershipType,
                clanMembersInfo?.destinyUserInfo.membershipId,
                signal, controller)
                .then(data => {
                    setCharacterStats(state => data?.Response)
                    setIsLoading(state => false)
                })
                .catch(error => {
                    console.log(error)
                });
        }
        return (() => {
            controller.abort();
        })
    }, [clanMembersInfo]);

    return (
        <div>
            <title>Details {clanMembersInfo?.bungieNetUserInfo.displayName}</title>
            <div className={styles["profile-container"]}>
                {
                    isLoading
                        ?
                        <ClockLoader color="coral" size="75px" />
                        :
                        <>
                            <div className={styles["main-info"]}>

                                <a href={`https://www.bungie.net/7/en/User/Profile/254/${id}`}
                                    target="_blank" rel="noreferrer" className={styles["profile-name"]}>
                                    <p className={styles["profile-name"]}>
                                        {clanMembersInfo?.bungieNetUserInfo.displayName}
                                    </p>
                                </a>
                                <p className={styles["title-paragraph"]}> <b>Title</b>: {
                                    clanMembersInfo?.memberType === 5 &&
                                    <span style={{ "color": '#cf5b5b' }}>
                                        <strong>
                                            {clanMembersInfo?.memberType === 5 && 'Clan Leader'}
                                        </strong>
                                    </span>
                                }
                                    {
                                        clanMembersInfo?.memberType === 3 &&
                                        <span style={{ "color": 'coral' }}>
                                            <strong>
                                                {clanMembersInfo?.memberType === 3 && 'Admin'}
                                            </strong>
                                        </span>
                                    }
                                    {
                                        clanMembersInfo?.memberType < 3 &&
                                        <span style={{ "color": '#65a85e' }}>
                                            <strong>
                                                {clanMembersInfo?.memberType < 3 && 'Member'}
                                            </strong>
                                        </span>
                                    }
                                </p>
                            </div>
                            <a href={`https://www.bungie.net/7/en/User/Profile/254/${id}`} target="_blank" rel="noreferrer">
                                <img src={`https://www.bungie.net/${clanMembersInfo?.bungieNetUserInfo.iconPath}`} alt="#" className={styles["player-avatar"]} />
                            </a>
                            <div className={styles["buttons-container"]}>
                                <button onClick={() => navigate('/')} className={styles["video-button"]}>Back</button>
                                <a href={`https://raid.report/pc/${clanMembersInfo?.destinyUserInfo.membershipId}/`}
                                    target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#4db6ac" }}>
                                    Raid report
                                </a>
                                <a href={`https://dungeon.report/pc/${clanMembersInfo?.destinyUserInfo.membershipId}/`}
                                    target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#03a9f4" }}>
                                    Dungeon report
                                </a>
                                <a href={`https://destinytrialsreport.com/report/3/${clanMembersInfo?.destinyUserInfo.membershipId}/`}
                                    target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#dc5062" }}>
                                    Trials report
                                </a>
                                <a href={`https://crucible.report/report/3/${clanMembersInfo?.destinyUserInfo.membershipId}/`}
                                    target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#ea1430" }}>
                                    Crucible report
                                </a>
                            </div>
                            <TableDataComponent characterStats={characterStats} />
                        </>
                }
            </div>
            <ScrollButton />
        </div >
    )
}