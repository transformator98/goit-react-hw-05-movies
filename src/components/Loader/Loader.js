import s from './Loader.module.css';
import Loader from 'react-loader-spinner';

export default function ImagePendingView() {
  return (
    <Loader
      className={s.loader}
      type="Circles"
      color="#3ccf9e"
      height={30}
      width={30}
    />
  );
}
