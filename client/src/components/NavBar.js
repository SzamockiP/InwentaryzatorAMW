import React from 'react';
import '../styles/NavBar.css';

class NavBar extends React.Component{
    
    // Runs after component renders
    componentDidMount(){
        const urlParams = new URL(window.location.href).searchParams;
        if(urlParams.get("nr_laboranta"))
            document.getElementById('nr_laborantaSearch').value = urlParams.get("nr_laboranta");
        if(urlParams.get("ilosc"))
            document.getElementById('iloscSearch').value = urlParams.get("ilosc");
        if(urlParams.get("miejsce"))
            document.getElementById('miejsceSearch').value = urlParams.get("miejsce");
        if(urlParams.get("nazwa"))
            document.getElementById('nazwaSearch').value = urlParams.get("nazwa");
        if(urlParams.get("nr_inwentarzowy"))
            document.getElementById('nr_inwentarzowySearch').value = urlParams.get("nr_inwentarzowy");
        if(urlParams.get("uzytkownik"))
            document.getElementById('uzytkownikSearch').value = urlParams.get("uzytkownik");
        if(urlParams.get("rodzaj"))
            document.getElementById('rodzajSearch').value = urlParams.get("rodzaj");

        if(urlParams.get("typ")){
            if(urlParams.get("typ") === "true")
                document.getElementById('typSearch').value = true;
            else if(urlParams.get("typ") === "false")
                document.getElementById('typSearch').value = false;
        }

        if(urlParams.get("wybrakowanie")){
            if(urlParams.get("wybrakowanie") === "true")
                document.getElementById('wybrakowanieSearch').value = true;
            else if(urlParams.get("wybrakowanie") === "false")
                document.getElementById('wybrakowanieSearch').value = false;
        } 
    }

    // Closes NavBar
    closeNavBar() {
        document.getElementById('nav-bar').style.width = '0px'
    }

    // Adds filters to the url
    searchFilter() {
        const searchParams = {
            'nr_laboranta' : document.getElementById('nr_laborantaSearch').value,
            'ilosc':document.getElementById('iloscSearch').value,
            'miejsce': document.getElementById('miejsceSearch').value,
            'nazwa': document.getElementById('nazwaSearch').value,
            'nr_inwentarzowy':document.getElementById('nr_inwentarzowySearch').value,
            'uzytkownik':document.getElementById('uzytkownikSearch').value,
            'rodzaj':document.getElementById('rodzajSearch').value,
            'typ':document.getElementById('typSearch').value,
            'wybrakowanie':document.getElementById('wybrakowanieSearch').value
        }

        const url = new URL(window.location.href);
        let urlParams = url.searchParams;
        
        for (let key in searchParams) {
            console.log(key + ': ' + searchParams[key]);

            if(searchParams[key])
                urlParams.set(key,searchParams[key])
            else
                urlParams.delete(key)
        }

        window.location.replace(url.href);
    }

    render() {
        return (
            <div className="nav-bar" id='nav-bar'>
                <button className="nav-bar--close" onClick={this.closeNavBar}>X</button>
                <br/>

                <label htmlFor="nr_laborantaSearch">Numer Laboranta</label>
                <select name={'nr_laboranta'} defaultValue="" id='nr_laborantaSearch'>
                    <option value="">Puste</option>
                    {/* {rodzaj_fields} */}
                </select>

                <label htmlFor="iloscSearch">Ilość</label>
                <input type="number" id="iloscSearch"/>

                <label htmlFor="miejsceSearch">Miejsce</label>
                <select name={'miejsce'} defaultValue="" id='miejsceSearch'>
                    <option value="">Puste</option>
                    {/* {rodzaj_fields} */}
                </select>

                <label htmlFor="nazwaSearch">Nazwa</label>
                <input type="text" id="nazwaSearch"/>

                <label htmlFor="nr_inwentarzowySearch">Numer Inwentarzowy</label>
                <select name={'nr_inwentarzowy'} defaultValue="" id='nr_inwentarzowySearch'>
                    <option value="">Puste</option>
                    {/* {rodzaj_fields} */}
                </select>

                <label htmlFor="uzytkownikSearch">Użytkownik</label>
                <select name={'uzytkownik'} defaultValue="" id='uzytkownikSearch'>
                    <option value="">Puste</option>
                    {/* {rodzaj_fields} */}
                </select>

                <label htmlFor="rodzajSearch">Rodzaj</label>
                <select name={'rodzaj'} defaultValue="" id='rodzajSearch'>
                    <option value="">Puste</option>
                    {/* {rodzaj_fields} */}
                </select>

                <label htmlFor="typSearch">Typ</label>
                <select name={'typ'} defaultValue="" id='typSearch'>
                    <option value="">Puste</option>
                    <option value={true}>Stanowy</option>
                    <option value={false}>Bezstanowy</option>
                </select>

                <label htmlFor="wybrakowanieSearch">Wybrakowanie</label>
                <select name={'wybrakowanie'} defaultValue="" id='wybrakowanieSearch'>
                    <option value="">Puste</option>
                    <option value={true}>Tak</option>
                    <option value={false}>Nie</option>
                </select>

                <button onClick={this.searchFilter}>Szukaj</button>
            </div>
        );
    };
};

export default NavBar;