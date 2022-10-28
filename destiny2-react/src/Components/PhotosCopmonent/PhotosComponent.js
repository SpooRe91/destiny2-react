import { NavLink } from 'react-router-dom';
import styles from './PhotosComponent.module.css';

export const PhotosComponent = () => {

    return (
        <section className={styles["photos-container"]}>
            <div className={styles["wrapper"]}>
                <h1 className={styles["notice"]}>UNDER CONSTRUCTION!</h1>
                <p>
                    Please excuse us, the site is still under construction. This feature
                    will be available as soon as possible, until then - make sure you
                    check our VIDEOS section instead! <NavLink to={"/bgs/videos"}>CLICK</NavLink>
                </p>
            </div>
        </section>
    );
}