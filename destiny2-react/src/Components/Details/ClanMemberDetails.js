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
                console.log(data);
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

    console.log(characterStats);
    console.log(clanMembersInfo);
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
                            <a href={`https://www.bungie.net/7/en/User/Profile/254/${id}`}
                                target="_blank" rel="noreferrer" className={styles["profile-name"]}>
                                <p className={styles["profile-name"]}>
                                    {clanMembersInfo?.bungieNetUserInfo.displayName}
                                </p>
                            </a>
                            <p style={{ "margin": "15px auto", "textAlign": 'center', "fontSize": "25px" }}> <b style={{ "color": "white", "fontSize": "25px" }}>Title</b>: {
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
                            <a href={`https://www.bungie.net/7/en/User/Profile/254/${id}`} target="_blank" rel="noreferrer">
                                <img src={`https://www.bungie.net/${clanMembersInfo?.bungieNetUserInfo.iconPath}`} alt="#" className={styles["player-avatar"]} />
                            </a>
                            <button onClick={() => navigate(-1)} className={styles["video-button"]}>Back</button>
                            <section>
                                <article>
                                    <h3>Raid Info:</h3>
                                    <p>Activities done: <b>{characterStats?.raid.allTime.activitiesCleared.basic.value}</b></p>
                                    <p>Total kills: <b>{characterStats?.raid.allTime.kills.basic.value}</b></p>
                                    <p>Total precision kills: <b>{characterStats?.raid.allTime.precisionKills.basic.value}</b></p>
                                    <p>Total deaths: <b>{characterStats?.raid.allTime.deaths.basic.value}</b></p>
                                    <p>Total efficiency: <b>{characterStats?.raid.allTime.efficiency.basic.value.toFixed(2)}</b></p>
                                    <p>Total fireteam activities done: <b>{characterStats?.raid.allTime.fireTeamActivities.basic.value}</b></p>
                                    <p>Total orbs created: <b>{characterStats?.raid.allTime.orbsDropped.basic.value}</b></p>
                                    <p>Total objectives completed: <b>{characterStats?.raid.allTime.objectivesCompleted.basic.value}</b></p>
                                    <p>Total time played: <b>{characterStats?.raid.allTime.secondsPlayed.basic.displayValue}</b></p>
                                    <p>Total time played (hours): <b>{(characterStats?.raid.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</b></p>
                                </article>
                            </section>
                            <section>
                                <article>
                                    <h3>PVE Info:</h3>
                                    <p>Activities done: <b>{characterStats?.allPvE.allTime.activitiesCleared.basic.value}</b></p>
                                    <p>Total kills: <b>{characterStats?.allPvE.allTime.kills.basic.value}</b></p>
                                    <p>Total precision kills: <b>{characterStats?.allPvE.allTime.precisionKills.basic.value}</b></p>
                                    <p>Total deaths: <b>{characterStats?.allPvE.allTime.deaths.basic.value}</b></p>
                                    <p>Total efficiency: <b>{characterStats?.allPvE.allTime.efficiency.basic.value.toFixed(2)}</b></p>
                                    <p>Total fireteam activities done: <b>{characterStats?.allPvE.allTime.fireTeamActivities.basic.value}</b></p>
                                    <p>Total orbs created: <b>{characterStats?.allPvE.allTime.orbsDropped.basic.value}</b></p>
                                    <p>Total objectives completed: <b>{characterStats?.allPvE.allTime.objectivesCompleted.basic.value}</b></p>
                                    <p>Total time played: <b>{characterStats?.allPvE.allTime.secondsPlayed.basic.displayValue}</b></p>
                                    <p>Total time played (hours): <b>{(characterStats?.allPvE.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</b></p>
                                </article>
                            </section>
                            <section>
                                <article>
                                    <h3>PVP Info:</h3>
                                    <p>Activities done: <b>{characterStats?.allPvE.allTime.activitiesCleared.basic.value}</b></p>
                                    <p>Total kills: <b>{characterStats?.allPvP.allTime.kills.basic.value}</b></p>
                                    <p>Total K/D: <b>{characterStats?.allPvP.allTime.killsDeathsRatio.basic.displayValue}</b></p>
                                    <p>Total K/D/A: <b>{characterStats?.allPvP.allTime.killsDeathsAssists.basic.value.toFixed(2)}</b></p>
                                    <p>Total precision kills: <b>{characterStats?.allPvP.allTime.precisionKills.basic.value}</b></p>
                                    <p>Average precision kills per game: <b>{characterStats?.allPvP.allTime.precisionKills.pga.value.toFixed(2)}</b></p>
                                    <p>Total longest kill distance: <b>{characterStats?.allPvP.allTime.longestKillDistance.basic.value} meters</b></p>
                                    <p>Total deaths: <b>{characterStats?.allPvE.allTime.deaths.basic.value}</b></p>
                                    <p>Total efficiency: <b>{characterStats?.allPvP.allTime.efficiency.basic.value.toFixed(2)}</b></p>
                                    <p>Total time played: <b>{characterStats?.allPvP.allTime.secondsPlayed.basic.displayValue}</b></p>
                                    <p>Win-loss ratio: <b>{characterStats?.allPvP.allTime.winLossRatio.basic.value.toFixed(2)}</b></p>
                                    <p>Total time played (hours): <b>{(characterStats?.allPvP.allTime.secondsPlayed.basic.value / 60 / 60).toFixed(2)}</b></p>
                                </article>
                                <hr />
                                <article>
                                    <h3>PVP weapon kills:</h3>
                                    <p>Total <b style={{ "color": "coral" }}>handcannon</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsHandCannon.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>sniper rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsSniper.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>pulse rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsPulseRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>scout rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsScoutRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>auto rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsAutoRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>submachine gun</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsSubmachinegun.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>fusion rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsFusionRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>bow </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsBow.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>shotgun</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsShotgun.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>sidearm </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsSideArm.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>linear-fusion rifle </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsBeamRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>trance rifle</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsTraceRifle.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>galive </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsGlaive.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>machine gun </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsMachineGun.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>grenade launcher</b> kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsGrenadeLauncher.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>sword </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsSword.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>rocket launcher </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsRocketLauncher.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>super </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsSuper.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>grenade </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsGrenade.basic.value}</b></p>
                                    <p>Total <b style={{ "color": "coral" }}>melee </b>kills: <b style={{ "color": "#0cc60c" }}>{characterStats?.allPvP.allTime.weaponKillsMelee.basic.value}</b></p>
                                </article>
                            </section>
                        </>
                }
            </div>
            <ScrollButton />
        </div >
    )
}