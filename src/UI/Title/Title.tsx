import styles from './title.module.scss'
interface PropsType {
    imgUrl: string
    title: string
}
const Title = ({imgUrl, title}: PropsType) => {
    return (
        <div className={styles.title}>
            <img className={styles.title__img} src={imgUrl} alt=""/>
            <span className={styles.title__text}>{title}</span>
        </div>
    );
};

export default Title;