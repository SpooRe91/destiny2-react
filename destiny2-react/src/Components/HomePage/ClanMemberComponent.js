import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export const ClanMemberComponent = ({ data }) => {
    const dateJoined = new Date(data?.joinDate);
    const id = (data?.bungieNetUserInfo.membershipId);


    return (
        <div className={styles["clan-member-element"]}>
            <div className={styles["info-container"]}>
                <div className={styles["data-container"]}>
                    <Link to={`bgs/details/${id}`} className={styles["player-name"]}>
                        <img src={`https://www.bungie.net/${data?.bungieNetUserInfo.iconPath}`} alt="#" className={styles["player-avatar"]} />
                        <span className={styles['bar']}>
                        </span>
                    </Link>
                    <p>
                        Name: <Link to={`bgs/details/${id}`} className={styles["player-name"]}>
                            {data.memberType === 5 ?
                                <strong style={{ "color": '#ff0000a1' }}>
                                    {data?.bungieNetUserInfo.displayName}
                                </strong>
                                : null
                            }
                            {
                                data.memberType === 3 ?
                                    <strong style={{ "color": '#ff4400fa' }}>
                                        {data?.bungieNetUserInfo.displayName}
                                    </strong>
                                    : null
                            }
                            {
                                data.memberType < 3 ?
                                    <strong style={{ "color": '#1bce09' }}>
                                        {data?.bungieNetUserInfo.displayName}
                                    </strong>
                                    : null
                            }
                        </Link>
                    </p>
                    <p>Title: {
                        data.memberType === 5 &&
                        <span style={{ "color": '#cf5b5b' }}>
                            <strong>
                                {data.memberType === 5 && 'Clan Leader'}
                            </strong>
                        </span>
                    }
                        {
                            data.memberType === 3 &&
                            <span style={{ "color": 'coral' }}>
                                <strong>
                                    {data.memberType === 3 && 'Admin'}
                                </strong>
                            </span>
                        }
                        {
                            data.memberType < 3 &&
                            <span style={{ "color": '#65a85e' }}>
                                <strong>
                                    {data.memberType < 3 && 'Member'}
                                </strong>
                            </span>
                        }
                    </p>

                    <p className={styles["player-joined"]}>
                        Joined: <strong>{`${dateJoined.getDate()}/${dateJoined.getMonth() + 1}/${dateJoined.getFullYear()}`}</strong>
                    </p>

                    <p>Link to Bungie.net - <a href={`https://www.bungie.net/7/en/User/Profile/${data.bungieNetUserInfo.membershipType}/${data.bungieNetUserInfo.membershipId}`}
                        target="_blank" rel="noreferrer" className={styles["player-name"]}>here</a></p>
                </div>

                <div className={styles["buttons-container"]}>

                    <a href={`https://raid.report/pc/${data?.destinyUserInfo.membershipId}/`}
                        target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#4db6ac" }}>
                        Raid report
                    </a>
                    <a href={`https://dungeon.report/pc/${data?.destinyUserInfo.membershipId}/`}
                        target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#03a9f4" }}>
                        Dungeon report
                    </a>
                    <a href={`https://destinytrialsreport.com/report/3/${data?.destinyUserInfo.membershipId}/`}
                        target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#dc5062" }}>
                        Trials report
                    </a>
                    <a href={`https://crucible.report/report/3/${data?.destinyUserInfo.membershipId}/`}
                        target="_blank" rel="noreferrer" className={styles["raid-report"]} style={{ "color": "#ea1430" }}>
                        Crucible report
                    </a>
                </div>
            </div>
        </div>
    )
}