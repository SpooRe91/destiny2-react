import styles from "./VideoComponent.module.css"
import { ScrollButton } from "../Common/ScrollButton";

export const VideosComponent = () => {

    return (
        <>
            <div className={styles["all-videos-container"]}>
                <label htmlFor="spoore" className={styles["video-label"]}>SpooRe's playlist</label>
                <div className={styles["single-video-container"]}>
                    <iframe name="spoore"
                        src="https://www.youtube.com/embed/watch?v=OiiNBQ7hev8&list=PLh8Yxx5KxoxmkdHBUOnpSmG5-IISGM_OB&index=1&ab_channel=M.B.?autoplay=0" title="spoore">
                    </iframe>
                </div>
                <label htmlFor="spoore" className={styles["video-label"]}>PecTheSpec's playlist</label>
                <div className={styles["single-video-container"]}>
                    <iframe name="PecTheSpec"
                        src="https://www.youtube.com/embed/watch?v=hv28twBiXfY&list=PLeZb0pbAM8v1aRR3ZvPGR-w0zJe6l6g6_&ab_channel=PetkoPetkov?autoplay=0" title="UC07TA3Zpp_-3oZ_sRq7Wung">
                    </iframe>
                </div>
            </div>
            <ScrollButton />
        </>
    )

}