import { useNavigate, useParams } from "react-router"

import styles from "./VideoComponent.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
export const VideoComponent = ({ videoName }) => {

    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className={styles["all-videos-container"]}>
            <title>{videoName}</title>
            <h1 className={styles["video-header"]}>{videoName ? videoName : "Current video"}</h1>
            <div className={styles["button-holder"]}>
                <button onClick={() => navigate(-1)} className={styles["back-button"]}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
            </div>
            <div className={styles["single-video-container"]}>
                <iframe
                    src={`https://www.youtube.com/embed/watch?${id}?autoplay=0`} title="#" loading="lazy">
                </iframe>
            </div>
        </div>
    )
}