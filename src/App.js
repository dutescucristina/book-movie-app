import './App.css';
import BookMovieApp from './components/BookMovieApp';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import BookingInformation from './components/BookingInformation';
import Login from './components/Login';
import Admin from './components/Admin';
import AddCinema from './components/AddCinema';
import ViewCinemas from './components/ViewCinemas';
import AddMovie from './components/AddMovie';
import ViewMovies from './components/ViewMovies';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <BookMovieApp/> */}
        <Routes>
          <Route path='/' element={<Navigate to="/home" replace />}></Route>
          <Route path='/home' element={<Login />}></Route>
          <Route path='/booking' element={<Booking />}></Route>
          <Route path='/bookingInformation' element={<BookingInformation />}></Route>
          <Route path='/movies' element={<BookMovieApp />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/addCinema' element={<AddCinema />}></Route>
          <Route path='/viewCinemas' element={<ViewCinemas />}></Route>
          <Route path='/addMovie' element={<AddMovie />}></Route>
          <Route path='/viewMovies' element={<ViewMovies />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;