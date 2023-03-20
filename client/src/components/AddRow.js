import React from 'react';
import Axios from 'axios';
import SelectWithSearch from './SelectWithSearch';

class TableRow extends React.Component{
    getUzytkownicy(){
        Axios.get('http://localhost:3001/dane_uzytkownicy')
        .then((response) => {
            this.setState({uzytkownicy:response.data.map(data => {return({value:data.id, label:data.imie + ' ' + data.nazwisko})})});
        }).catch(error => {
            console.error(error);
        });
    }

    getMiejsca(){
        Axios.get('http://localhost:3001/dane_miejsca')
        .then((response) => {
            this.setState({miejsca:response.data.map(data => {return({value:data.id, label:data.nr_miejsca})})});
        }).catch(error => {
            console.error(error);
        });
    }

    getLaboranci(){
        Axios.get('http://localhost:3001/dane_laboranci')
        .then((response) => {
            this.setState({laboranci:response.data.map(data => {return({value:data.id, label:data.nr_laboranta})})});
        }).catch(error => {
            console.error(error);
        });
    }

    getRodzaje(){
        Axios.get('http://localhost:3001/dane_rodzaje').then((response) => {
            this.setState({rodzaje:response.data.map(data => {return({value:data.id, label:data.rodzaj})})});
        }).catch(error => {
            console.error(error);
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
                // update TableDisplay
                this.props.onRowAdd({});
            })
            .catch(error => {
                console.error(error);
            });
    }

    render () {
        // (event) => this.setState({laborant_id:event.target.value})
        return (
            <tr className="table-row">
                {/* unchangable id field */}
                {/* <td className='table-data'>Nowy Rekord</td> */}
                <td className='table-data'></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    {/* <select name={'nr_laboranta'} 
                        defaultValue="" 
                        onChange={(event) => this.setState({ laborant_id: event.target.value })} 
                        value={this.state.laborant_id ? this.state.laborant_id : ""}
                    >
                        <option value=""></option>
                        {this.state.laboranci}
                    </select> */}
                    <SelectWithSearch 
                        type="laboranci" 
                        onChange={(newValue) => {this.setState({laborant_id:newValue})}}
                        value={this.state.laborant_id}
                    />
                </td>

                {/* number field */}
                <td className='table-data'>
                    <input type='number' min='1' max='9999' name={"ilosc"} 
                        onChange={(event) => this.setState({ ilosc: event.target.value })}
                        value={this.state.ilosc ? this.state.ilosc : ""}
                    />
                </td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type="miejsca"  
                        onChange={(newValue) => {this.setState({miejsce_id:newValue})}}
                        value={this.state.miejsce_id}
                    />
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
                    <input type="text" name={'nr_inwentarzowy'} 
                        onChange={(event) => this.setState({ nr_inwentarzowy: event.target.value })}
                        value={this.state.nr_inwentarzowy ? this.state.nr_inwentarzowy : ""}
                    />
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type="uzytkownicy" 
                        onChange={(newValue) => {this.setState({uzytkownik_id:newValue})}}
                        value={this.state.uzytkownik_id}
                    />
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type="rodzaje" 
                        onChange={(newValue) => {this.setState({rodzaj_id:newValue})}}
                        value={this.state.rodzaj_id}
                    />
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