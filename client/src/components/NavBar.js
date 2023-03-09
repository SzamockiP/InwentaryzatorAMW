import '../styles/NavBar.css';

function closeNavBar() {
    document.getElementById('nav-bar').style.width = '0px'
}

function NavBar(){
    return (
        <div className="nav-bar" id='nav-bar'>
            <button className="nav-bar--close" onClick={closeNavBar}>X</button>
        </div>
    );
};

export default NavBar;