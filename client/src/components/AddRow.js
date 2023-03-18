import React, { useState } from 'react';
import Axios from 'axios';

class TableRow extends React.Component{
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

    constructor (props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            uzytkownicy:[],
            miejsca:[],
            rodzaje:[],
            laboranci:[]
        };

        // gets all data for states from db
        this.getLaboranci();
        this.getMiejsca();
        this.getRodzaje();
        this.getUzytkownicy();
    }

    handleRowAdd = () => {
        // check if all required fields are filled
        let flag = true;
        let newRowData = {}
        if(!this.state.laborant_id)flag = false;
        else newRowData.laborant_id = this.state.laborant_id;

        if(!flag || !this.state.ilosc) flag = false;
        else newRowData.ilosc = this.state.ilosc;

        if(!flag || !this.state.nazwa) flag = false;
        else newRowData.nazwa = this.state.nazwa;

        if(!flag || !this.state.nr_inwentarzowy) flag = false;
        else newRowData.nr_inwentarzowy = this.state.nr_inwentarzowy;
        
        if(!flag || !this.state.rodzaj_id) flag = false;
        else newRowData.rodzaj_id = this.state.rodzaj_id;

        if(!flag || !this.state.typ) flag = false;
        else newRowData.typ = this.state.typ;
        
        if(!flag || !this.state.wybrakowanie) flag = false;
        else newRowData.wybrakowanie = this.state.wybrakowanie;

        if(this.state.uzytkownik_id) newRowData.uzytkownik_id = this.state.uzytkownik_id;
        if(this.state.miejsce_id) newRowData.miejsce_id = this.state.miejsce_id;
        
        // if any field is empty, break this function
        if(!flag){
            alert("Trzeba wypełnić wszystkie pola aby dodać rekord.")
            return
        }
        // rerender whole component, so it has empty fields
        this.setState({
            laborant_id:undefined,
            ilosc:undefined,
            nazwa:undefined,
            nr_inwentarzowy:undefined,
            rodzaj_id:undefined,
            typ:undefined,
            wybrakowanie:undefined,
            uzytkownik_id:undefined,
            miejsce_id:undefined
        })

        Axios.post(`http://localhost:3001/dane_rekordy/create`, {...newRowData})
            .then(response => {
                console.log(response.data);
                // update TableDisplay
                this.props.onRowAdd({});
            })
            .catch(error => {
                console.error(error);
            });
    }

    render () {
        // fetch here nr_laborantow, miejsca, uzytkownicy, rodzaje with data from db
        const laboranci_fields = this.state.laboranci.map(data => {return(<option value={data.id}>{data.nr_laboranta}</option>)});
        const miejsca_fields = this.state.miejsca.map(data => {return(<option value={data.id}>{data.nr_miejsca}</option>)});
        const uzytkownicy_fields = this.state.uzytkownicy.map(data => {return(<option value={data.id}>{data.imie} {data.nazwisko}</option>)});
        const rodzaje_fields = this.state.rodzaje.map(data => {return(<option value={data.id}>{data.rodzaj}</option>)});

        return (
            <tr className="table-row">
                {/* unchangable id field */}
                <td className='table-data'></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'nr_laboranta'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ laborant_id: event.target.value })} 
                        value={this.state.laborant_id ? this.state.laborant_id : ""}
                    >
                        <option value=""></option>
                        {laboranci_fields}
                    </select>
                </td>

                {/* number field */}
                <td className='table-data'>
                    <input type='number' name={"ilosc"} 
                        onChange={(event) => this.setState({ ilosc: event.target.value })}
                        value={this.state.ilosc ? this.state.ilosc : ""}
                    />
                </td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'miejsce'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ miejsce_id: event.target.value })}
                        value={this.state.miejsce_id ? this.state.miejsce_id : ""}
                    >
                        <option value=""></option>
                        {miejsca_fields}
                    </select>
                </td>

                {/* text field */}
                <td className='table-data'>
                    <input type="text" name={'nazwa'} 
                        onChange={(event) => this.setState({ nazwa: event.target.value })}
                        value={this.state.nazwa ? this.state.nazwa : ""}
                    />
                </td>

                {/* number field */}
                <td className='table-data'>
                    <input type="number" name={'nr_inwentarzowy'} 
                        onChange={(event) => this.setState({ nr_inwentarzowy: event.target.value })}
                        value={this.state.nr_inwentarzowy ? this.state.nr_inwentarzowy : ""}
                    />
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'uzytkownik'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ uzytkownik_id: event.target.value })}
                        value={this.state.uzytkownik_id ? this.state.uzytkownik_id : ""}
                    >
                        <option value=""></option>
                        {uzytkownicy_fields}
                    </select>
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'rodzaj'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ rodzaj_id: event.target.value })}
                        value={this.state.rodzaj_id ? this.state.rodzaj_id : ""}
                    > 
                        <option value=""></option>
                        {rodzaje_fields}
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'typ'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ typ: event.target.value })}
                        value={this.state.typ ? this.state.typ : ""}
                    >
                        <option value=""></option>
                        <option value={1}>Stanowy</option>
                        <option value={0}>Bezstanowy</option>
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'wybrakowanie'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ wybrakowanie: event.target.value })}
                        value={this.state.wybrakowanie ? this.state.wybrakowanie : ""}
                    >
                        <option value=""></option>
                        <option value={1}>Tak</option>
                        <option value={0}>Nie</option>
                    </select>
                </td>

                <td className='table-data'>
                    <div className="button-container">
                        <button className="buttonDodaj-data" onClick={this.handleRowAdd}>Dodaj</button>
                    </div>
                </td>
            </tr>
        );
    }
};

export default TableRow;