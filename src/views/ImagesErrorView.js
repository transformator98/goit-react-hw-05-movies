import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function ImageErrorView({ message }) {
  return toast.error(`${message}`);
}

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
