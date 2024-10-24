import React, { Component } from 'react';
import logo from '../assets/images/re-vistete.png';
import footer from '../assets/images/footer.jpg';
import '../assets/styles/index.css';

class AppMain extends Component {
    render() {
        return (
            <>
                <div className="content">
                    <img src={logo} alt="Logo Revistete" />
                </div>
                <div className='clothing-footer'>
                    <img src={footer} alt="Logo Revistete" />
                </div>
            </>
        );
    }
}
export default AppMain;