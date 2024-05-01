import { useParams } from "react-router";
import styles from "./VideoComponent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

export const VideoComponent = ({ videoName }) => {
    const { id } = useParams();

    return (
        <div className={styles["all-videos-container"]}>
            <title>{videoName}</title>
            <h1 className={styles["video-header"]}>{videoName ? videoName : "Current video"}</h1>
            <div className={styles["button-holder"]}>
                <NavLink to={'/bgs/videos'} className={styles["back-button"]}><FontAwesomeIcon icon={faArrowLeft} /> Back</NavLink>
            </div>
            <div className={styles["single-video-container"]}>
                <div className={styles["video-wrapper"]}>
                    <iframe
                        src={`https://www.youtube.com/embed/watch?${id}?autoplay=0`}
                        title="#"
                        loading="lazy"
                        className={styles["video-iframe"]}
                    />
                </div>
            </div>
        </div>
    );
};
