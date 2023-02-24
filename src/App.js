import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import WatchList from "./components/Watchlist";
import MovieScreen from "./components/MovieScreen";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);

  const addMovie = (movie) => setWatchList([...watchList, movie]);
  const removeMovie = (movie) => {
    const newState = watchList.filter((mov) => {
      return mov.id !== movie.id;
    });
    setWatchList(newState);
  };
  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
  };
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          watchList={watchList}
          page={page}
          setPage={setPage}
          movieList={movieList}
          removeMovie={removeMovie}
          addMovie={addMovie}
        />
        <WatchList watchList={watchList} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
