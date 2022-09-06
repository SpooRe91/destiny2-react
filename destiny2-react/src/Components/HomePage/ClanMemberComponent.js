import styles from "./HomePage.module.css";

export const ClanMemberComponent = ({ data }) => {
    const dateJoined = new Date(data?.joinDate);

    return (
        <div>
            <p>Title: {
                data.memberType === 5 &&
                <span style={{ "color": 'red' }}>
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
                    <span style={{ "color": 'lightblue' }}>
                        <strong>
                            {data.memberType < 3 && 'Member'}
                        </strong>
                    </span>
                }
            </p>
            <p>
                Name: <a href={`https://www.bungie.net/7/en/User/Profile/${data.bungieNetUserInfo.membershipType}/${data.bungieNetUserInfo.membershipId}`}
                    target="_blank" rel="noreferrer" className={styles["player-name"]}>
                    <strong>
                        {data?.bungieNetUserInfo.displayName}
                    </strong>
                </a>
            </p>
            <p className={styles["player-joined"]}>
                Joined: <strong>{`${dateJoined.getDate()}/${dateJoined.getMonth() + 1}/${dateJoined.getFullYear()}`}</strong>
            </p>
            <a href={`https://www.bungie.net/7/en/User/Profile/${data.bungieNetUserInfo.membershipType}/${data.bungieNetUserInfo.membershipId}`}
                target="_blank" rel="noreferrer">
                <img src={`https://www.bungie.net/${data?.bungieNetUserInfo.iconPath}`} alt="#" className={styles["player-avatar"]} />
            </a>
        </div >
    )
}