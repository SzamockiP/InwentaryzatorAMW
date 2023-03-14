import React from 'react';
import '../styles/NavBar.css';

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    closeNavBar() {
        document.getElementById('nav-bar').style.width = '0px'
    }

    searchPhrase() {
        console.log("Szukana fraza: ", document.getElementById('searchField').value);
        const searchPhrase = document.getElementById('searchField').value;
        const url = new URL(window.location.href);
        url.searchParams.set("search", searchPhrase);
        window.location.replace(url.href);
    }

    render() {
        return (
            <div className="nav-bar" id='nav-bar'>
                <button className="nav-bar--close" onClick={this.closeNavBar}>X</button>
                <br/>
                <label htmlFor="searchField">Szukaj</label>
                <input type="text" id="searchField"/>
                <button onClick={this.searchPhrase}>Szukaj</button>
            </div>
        );
    };
};

export default NavBar;