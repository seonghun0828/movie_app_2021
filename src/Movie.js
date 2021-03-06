import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import './Movie.css';
// state 가 필요 없으므로 class일 필요가 없음. function component로

function Movie(args) {
  const { title, rating, year, genres, summary, poster } = args;
  return (
    <Fragment>
      <img src={poster} title={title} alt={title} />
      <div className="movie_data">
        <h3 className="movie_title">{title}</h3>
        <h4 className="movie_rating">rating: {rating}</h4>
        <h5 className="movie_year">{year}</h5>
        <ul className="genres">
          {genres.map((genre, index) => (
            <li key={index} className="genres_genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie_summary">{summary}</p>
      </div>
    </Fragment>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

// function Movie({ year, title, summary, poster, genres }) {
//   return (
//     <div className="movie">
//       <img src={poster} title={title} alt={title} />
//       <div className="movie__data">
//         <h3 className="movie__title">{title}</h3>
//         <h5 className="movie__year">{year}</h5>
//         <ul className="genres">
//           {genres.map((genre, index) => (
//             <li key={index} className="genres__genre">
//               {genre}
//             </li>
//           ))}
//         </ul>
//         <p className="movie_summary">{summary}</p>
//       </div>
//     </div>
//   );
// }

// Movie.propTypes = {
//   id: PropTypes.number.isRequired,
//   year: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default Movie;
