import { useNavigate, useParams } from "react-router"
import styles from "./VideoComponent.module.css"
export const VideoComponent = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className={styles["all-videos-container"]}>
            <button onClick={() => navigate(-1)} className={styles["video-button"]}>Back</button>
            <div className={styles["single-video-container"]}>
                <iframe name="spoore"
                    src={`https://www.youtube.com/embed/watch?${id}?autoplay=0`} title="spoore">
                </iframe>
            </div>
        </div>
    )
}