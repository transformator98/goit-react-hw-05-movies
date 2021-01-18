import './App.css';
import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Container from './components/Container';
import AppBar from './components/AppBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';

// import HomeView from './views/HomeView';
// import MoviesView from './components/MoviesView';
// import MovieDetailsPage from './components/MoviesView/MovieDetailsPage';
// import NotFoundView from './views/NotFoundView';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "HomeView" */),
);
const MoviesView = lazy(() =>
  import('./components/MoviesView' /* webpackChunkName: "MoviesView" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MoviesView/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
