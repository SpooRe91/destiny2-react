import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { ClockLoader } from "react-spinners";
import { getCharacter, getClanMembers } from "../../Services/requests";
import { ScrollButton } from "../Common/ScrollButton";
import styles from './ClanMemberDetails.module.css'

export const ClanMemberDetails = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [clanMembersInfo, setClanMemberInfo] = useState(null);
    const [characterStats, setCharacterStats] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getClanMembers()
            .then(data => {
                if (data.Response !== null
                    && data.Response !== undefined) {
                    setClanMemberInfo(state =>
                        data.Response.results.find(el => el?.bungieNetUserInfo.membershipId === id));
                    setIsLoading(state => false)
                } else {
                    throw new Error('Unable to retreive the stats for the current user!')
                }
            })
            .catch(error => {
                alert(error)
            });
    }, [id]);

    useEffect(() => {
        if (clanMembersInfo) {

            getCharacter(clanMembersInfo?.destinyUserInfo.membershipType, clanMembersInfo?.destinyUserInfo.membershipId)
                .then(data => {
                    setCharacterStats(state => data.Response)
                    setIsLoading(state => false)
                })
                .catch(error => {
                    alert(error)
                });
        }
    }, [clanMembersInfo])

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
                            <div className="main-info">

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
                                <button onClick={() => navigate(-1)} className={styles["video-button"]}>Back</button>
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

                            <div className={styles["section-container"]}>
                                {
                                    !characterStats
                                        ?
                                        <ClockLoader color="coral" size="75px" margin="0px auto" />
                                        :
                                        <>
                                            <section>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th><h3>Raid Info</h3></th>
                                                            <th className={styles["stats-th"]}>stats</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Activities done</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.activitiesCleared.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.kills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total precision kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.precisionKills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total deaths</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.deaths.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total efficiency</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.efficiency.basic.value.toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total fireteam activities done</td>
                                                            <td className={styles["name-td"]}><b className={styles["stats-td"]}>{characterStats?.raid.allTime.fireTeamActivities.basic.value}</b></td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total orbs created</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.orbsDropped.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total objectives completed</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.objectivesCompleted.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.raid.allTime.secondsPlayed.basic.displayValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played (hours)</td>
                                                            <td className={styles["stats-td"]}>{(characterStats?.raid.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </section>
                                            <section>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th><h3>PVE Info</h3></th>
                                                            <th className={styles["stats-th"]}>stats</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Activities done</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.activitiesCleared.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.kills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total precision kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.precisionKills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total deaths</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.deaths.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total efficiency</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.efficiency.basic.value.toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total fireteam activities done</td>
                                                            <td className={styles["name-td"]}><b className={styles["stats-td"]}>{characterStats?.allPvE.allTime.fireTeamActivities.basic.value}</b></td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total orbs created</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.orbsDropped.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total objectives completed</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.objectivesCompleted.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvE.allTime.secondsPlayed.basic.displayValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played (hours)</td>
                                                            <td className={styles["stats-td"]}>{(characterStats?.allPvE.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </section>
                                            <section>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th><h3>PVP Info</h3></th>
                                                            <th className={styles["stats-th"]}>stats</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.kills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total K/D</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.killsDeathsRatio.basic.displayValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total K/D/A</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.killsDeathsAssists.basic.value.toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total precision kills</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.precisionKills.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total deaths</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.deaths.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total efficiency</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.efficiency.basic.value.toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.secondsPlayed.basic.displayValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total time played (hours)</td>
                                                            <td className={styles["stats-td"]}>{(characterStats?.allPvP.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </section>
                                            <section>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th><h3>PVP Info - weapons info</h3></th>
                                                            <th className={styles["stats-th"]}>stats</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>handcannon</b> kills: </td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsHandCannon.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>sniper rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsSniper.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>pulse rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsPulseRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>scout rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsScoutRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>auto rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsAutoRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>submachine gun</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsSubmachinegun.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>fusion rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsFusionRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>bow </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsBow.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>shotgun</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsShotgun.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>sidearm </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsSideArm.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>linear-fusion rifle </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsBeamRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>trance rifle</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsTraceRifle.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>galive </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsGlaive.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>machine gun </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsMachineGun.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>grenade launcher</b> kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsGrenadeLauncher.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>sword </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsSword.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>rocket launcher </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsRocketLauncher.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>super </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsSuper.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>Total <b style={{ "color": "coral" }}>grenade </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsGrenade.basic.value}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={styles["name-td"]}>otal <b style={{ "color": "coral" }}>melee </b>kills:</td>
                                                            <td className={styles["stats-td"]}>{characterStats?.allPvP.allTime.weaponKillsMelee.basic.value}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </section>
                                        </>
                                }
                            </div>
                        </>
                }
            </div>
            <ScrollButton />
        </div >
    )
}