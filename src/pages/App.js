import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/styles/App.css';
import NewUser from '../pages/user/new';
import RecyclingPoints from '../pages/recyclingPoints';
import Events from '../pages/events';
import AboutUs from '../pages/aboutUs';
import Contact from '../pages/contact';
import Company from '../pages/companies';
import CreateCompany from '../pages/companies/new';
import Profile from '../pages/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppMain from './index';
import NavBar from '../components/NavBar';
import ProtectedRoute from '../ProtectedRoute';

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
                    <Route 
                        path="/about-us"
                        element={<AboutUs />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
                    />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute element={Profile} />}
                    />
                    <Route
                        path="/companies"
                        element={<Company />}
                    />
                    <Route
                        path="/companies/new"
                        element={<CreateCompany />}
                    />
                </Routes>
            </div>
        </Router >
    );
}

export default App;
