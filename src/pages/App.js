import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/styles/App.css';
import NewUser from '../pages/user/new';
import RecyclingPoints from '../pages/recyclingPoints';
import Events from '../pages/events';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppMain from './index';
import NavBar from '../components/NavBar';

const App = () => {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route
                        path="/users/new"
                        element={<NewUser />}
                    />
                    <Route
                        path="/"
                        element={<AppMain />}
                    />
                    <Route
                        path="/recycling-points"
                        element={<RecyclingPoints />}
                    />
                    <Route
                        path="/events"
                        element={<Events />}
                    />
                </Routes>
            </div>
        </Router >
    );
}

export default App;
