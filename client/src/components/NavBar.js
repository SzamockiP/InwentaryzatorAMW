import React from 'react';
import Axios from 'axios';
import '../styles/NavBar.css';

class NavBar extends React.Component{
    getUzytkownicy(){
        Axios.get('http://localhost:3001/dane_uzytkownicy').then((response) => {
            this.setState({uzytkownicy:response.data});
        });
    }

    getMiejsca(){
        Axios.get('http://localhost:3001/dane_miejsca').then((response) => {
            this.setState({miejsca:response.data});
        });
    }

    getLaboranci(){
        Axios.get('http://localhost:3001/dane_laboranci').then((response) => {
            this.setState({laboranci:response.data});
        });
    }

    getRodzaje(){
        Axios.get('http://localhost:3001/dane_rodzaje').then((response) => {
            this.setState({rodzaje:response.data});
        });
    }

    closeNavBar() {
        document.getElementById('nav-bar').style.width = '0px'
    }

    // Adds filters to the url
    searchFilter = () => {
        let searchParams = {};

        // add all filed search values to the searchParams
        if(document.getElementById('nr_laborantaSearch').value) 
            searchParams.laborant_id = document.getElementById('nr_laborantaSearch').value;
        if(document.getElementById('iloscSearch').value)
            searchParams.ilosc = document.getElementById('iloscSearch').value;
        if(document.getElementById('miejsceSearch').value)
            searchParams.miejsce_id = document.getElementById('miejsceSearch').value;
        if(document.getElementById('nazwaSearch').value)
            searchParams.nazwa = document.getElementById('nazwaSearch').value;
        if(document.getElementById('nr_inwentarzowySearch').value)
            searchParams.nr_inwentarzowy = document.getElementById('nr_inwentarzowySearch').value;
        if(document.getElementById('uzytkownikSearch').value)
            searchParams.uzytkownik_id = document.getElementById('uzytkownikSearch').value;
        if(document.getElementById('rodzajSearch').value)
            searchParams.rodzaj_id = document.getElementById('rodzajSearch').value
        if(document.getElementById('typSearch').value)
            searchParams.typ = document.getElementById('typSearch').value;
        if(document.getElementById('wybrakowanieSearch').value)
            searchParams.wybrakowanie = document.getElementById('wybrakowanieSearch').value;
        
        // passes searchParams to the TableDisplay component
        this.props.onSearchDataUpdate(searchParams);
    }

    // Resets filters and resets table display
    resetFilter = () => {
        document.getElementById('nr_laborantaSearch').value = '';
        document.getElementById('iloscSearch').value = '';
        document.getElementById('miejsceSearch').value = '';
        document.getElementById('nazwaSearch').value = '';
        document.getElementById('nr_inwentarzowySearch').value = '';
        document.getElementById('uzytkownikSearch').value = '';
        document.getElementById('rodzajSearch').value = '';
        document.getElementById('typSearch').value = '';
        document.getElementById('wybrakowanieSearch').value = '';

        this.props.onSearchDataUpdate({});
    }

    constructor(props) {
        super(props);

        this.state = {
            uzytkownicy:[],
            miejsca:[],
            rodzaje:[],
            laboranci:[]
        };

        this.getLaboranci();
        this.getMiejsca();
        this.getRodzaje();
        this.getUzytkownicy();
    }

    render() {
        // fetch here nr_laborantow, miejsca, uzytkownicy, rodzaje with data from db
        const laboranci_fields = this.state.laboranci.map(data => {return(<option value={data.id}>{data.nr_laboranta}</option>)});
        const miejsca_fields = this.state.miejsca.map(data => {return(<option value={data.id}>{data.nr_miejsca}</option>)});
        const uzytkownicy_fields = this.state.uzytkownicy.map(data => {return(<option value={data.id}>{data.imie} {data.nazwisko}</option>)});
        const rodzaje_fields = this.state.rodzaje.map(data => {return(<option value={data.id}>{data.rodzaj}</option>)});

        return (
            <div className="nav-bar" id='nav-bar'>
                <button className="nav-bar--close" onClick={this.closeNavBar}>X</button>
                <br/>

                <label htmlFor="nr_laborantaSearch">Numer Laboranta</label>
                <select name={'nr_laboranta'} defaultValue="" id='nr_laborantaSearch'>
                    <option value="">Puste</option>
                    {laboranci_fields}
                </select>

                <label htmlFor="iloscSearch">Ilość</label>
                <input type="number" id="iloscSearch"/>

                <label htmlFor="miejsceSearch">Miejsce</label>
                <select name={'miejsce'} defaultValue="" id='miejsceSearch'>
                    <option value="">Puste</option>
                    {miejsca_fields}
                </select>

                <label htmlFor="nazwaSearch">Nazwa</label>
                <input type="text" id="nazwaSearch"/>

                <label htmlFor="nr_inwentarzowySearch">Numer Inwentarzowy</label>
                <input type="text" id="nr_inwentarzowySearch"/>

                <label htmlFor="uzytkownikSearch">Użytkownik</label>
                <select name={'uzytkownik'} defaultValue="" id='uzytkownikSearch'>
                    <option value="">Puste</option>
                    {uzytkownicy_fields}
                </select>

                <label htmlFor="rodzajSearch">Rodzaj</label>
                <select name={'rodzaj'} defaultValue="" id='rodzajSearch'>
                    <option value="">Puste</option>
                    {rodzaje_fields}
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
                <button onClick={this.resetFilter}>Reset</button>
            </div>
        );
    };
};

export default NavBar;