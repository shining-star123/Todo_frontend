import React from 'react';
import './components.css';

const Navbar : React.FC = () => {
    return (
        <div className='navbar'>
            <div className='container navitems'>
                <div className='navbar-title'>Todo List</div>
                <div className='navbar-name'>Johnathan Tafoya</div>
            </div>
        </div>
    )
}

export default Navbar;