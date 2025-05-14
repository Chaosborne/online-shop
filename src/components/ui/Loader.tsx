import styles from './Loader.module.scss';

const Loader = ({ fullScreen = false }: { fullScreen?: boolean }) => (
  <div className={`${styles.loader} ${fullScreen ? styles.fullScreen : ''}`}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
