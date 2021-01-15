import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';

// import s from './Cast.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    movieApi
      .fetcthReviewsMovie(movieId)
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <>
      {reviews &&
        (reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie</p>
        ))}
    </>
  );
}
