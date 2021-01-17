import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [querry, setQuerry] = useState('');

  const handleNameChange = event => {
    setQuerry(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (querry.trim() === '') {
      toast.error('Введите текст для поиска');
      return;
    }

    onSubmit(querry);
    setQuerry('');
  };

  return (
    <section className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>
        <input
          value={querry}
          onChange={handleNameChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </section>
  );
}

Searchbar.propTypes = {
  imageName: PropTypes.string,
};
