import s from './Loader.module.scss';

const Loader = () => (
  <div className={`${s.loader}`}>
    <div className={s.spinner}></div>
  </div>
);

export default Loader;
