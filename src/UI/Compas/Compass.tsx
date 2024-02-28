import React, { useState, useEffect } from 'react';
import styles from './compass.module.scss'
interface PropsType {
    angle: number
}

const Compass = ({ angle }: PropsType) => {
    const [arrowAngle, setArrowAngle] = useState(angle);

    useEffect(() => {
        setArrowAngle(angle);
    }, [angle]);

    const arrowStyle = {
        transform: `rotate(calc( 180deg + ${arrowAngle}deg))`
    };

    return (
        <div className={styles.compass}>
            <div className={styles.compass_circle}>
                <div className={styles.arrow} style={arrowStyle}>
                    <div className={styles.arrow__up}></div>
                    <div className={styles.arrow__down}></div>
                </div>
                <div className={styles.compass_label_N}>N</div>
                <div className={styles.compass_label_S}>S</div>
                <div className={styles.compass_label_W}>W</div>
                <div className={styles.compass_label_E}>E</div>
            </div>

        </div>
    );
};

export default Compass;
