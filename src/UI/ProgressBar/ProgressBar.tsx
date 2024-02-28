import React from 'react';
import styles from './progress-bar.module.scss'
interface PropsType {
    progress: string
}

const ProgressBar = ({progress}: PropsType) => {
    return (
        <div className={styles.body}>
            <div style={{ left: `${progress}%`}} className={styles.point}></div>
        </div>
    );
};

export default ProgressBar;