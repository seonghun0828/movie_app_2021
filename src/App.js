import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';
import { Fragment } from 'react';

// api 받아와서 Movie 인자로 보내주고 mount async

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
    );
    this.setState({
      movies,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <Fragment>
        {isLoading ? (
          <div className="loader">Loading by rating...</div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                rating={movie.rating}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

// class App extends React.Component {
//   state = {
//     isLoading: true,
//     movies: [],
//   };
//   getMovies = async () => {
// const aa = await axios.get('https://yts-proxy.now.sh/list_movies.json');
// console.log(aa.data.data.movies);
//     const {
//       data: {
//         data: { movies },
//       },
//     } = await axios.get(
//       'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
//     );
//     this.setState({ movies, isLoading: false });
//     // this.setState({movies: movies}); 와 같음. 앞은 from setState, 뒤는 from axios
//   };
//   componentDidMount() {
//     this.getMovies();
//   }
//   render() {
//     const { isLoading, movies } = this.state;
//     return (
//       <section className="container">
//         {isLoading ? (
//           <div className="loader">
//             <span className="loader__text">Loading...</span>
//           </div>
//         ) : (
//           <div className="movies">
//             {movies.map((movie) => (
//               <Movie
//                 key={movie.id}
//                 id={movie.id}
//                 year={movie.year}
//                 title={movie.title}
//                 summary={movie.summary}
//                 poster={movie.medium_cover_image}
//                 genres={movie.genres}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     );
//   }
// }
export default App;
