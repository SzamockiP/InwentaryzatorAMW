import './App.css';
import TableDisplay from './components/TableDisplay'
import MenuBar from './components/MenuBar'
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

import { useState } from 'react';

function openNavBar() {
	document.getElementById('nav-bar').style.width = '250px';
}

function App() {
    const [searchData, setSearchData] = useState([]);

    const handleSearchDataUpdate = (newSearchData) => {
        setSearchData(newSearchData);
    }

    return (
        <div className="app">
			<MenuBar/>
            <TableDisplay searchParams={searchData}/>
			<FooterBar/>
			<button className="nav-bar--open" onClick={openNavBar}>O</button>
			<NavBar onSearchDataUpdate={handleSearchDataUpdate}/>
        </div>
    );
}

export default App;
