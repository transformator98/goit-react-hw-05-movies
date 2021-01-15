import './App.css';
import { Switch, Route } from 'react-router-dom';

import Container from './components/Container';
import AppBar from './components/AppBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import DetailsPageView from './views/DetailsPageView';

// import fetchApi from './API';

export default function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>

        <Route path="/movies">
          <MoviesView />
        </Route>

        <Route path="/movies/details" exact>
          <DetailsPageView />
        </Route>
      </Switch>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
