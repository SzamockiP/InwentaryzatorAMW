import './App.css';
import TableDisplay from './components/TableDisplay'
import MenuBar from './components/MenuBar'
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

function openNavBar() {
	document.getElementById('nav-bar').style.width = '250px';
}

function App() {
    return (
        <div className="app">
			<MenuBar/>
            <TableDisplay/>
			<FooterBar/>
			<button className="nav-bar--open" onClick={openNavBar}>O</button>
			<NavBar/>
        </div>
    );
}

export default App;
