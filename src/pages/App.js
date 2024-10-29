import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../assets/styles/App.css';
import NewUser from '../pages/user/new';
import RecyclingPoints from '../pages/recyclingPoints';
import Contact from '../pages/contact';
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
                        path="/contact"
                        element={<Contact />}
                    />
                </Routes>
            </div>
        </Router >
    );
}

export default App;
