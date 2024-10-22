import '../assets/styles/App.css';
import NewUser from '../pages/user/new';
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
                </Routes>
            </div>
        </Router >
    );
}

export default App;
