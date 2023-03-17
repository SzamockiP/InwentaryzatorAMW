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
            laboranci:[],
            shouldRender:true
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        // gets all data for states from db
        this.getLaboranci();
        this.getMiejsca();
        this.getRodzaje();
        this.getUzytkownicy();
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        });
        this.data[event.target.name] = event.target.value;

        // Here you can make db update query
        // place for query
    }    

    handleRowDelete = () => {
        this.setState({shouldRender:false})
        Axios.delete(`http://localhost:3001/dane_rekordy/${this.data.id}`)
        .then(response => {
          console.log(response.data);
          // update the state or do something else
        })
        .catch(error => {
          console.error(error);
        });


    }

    render () {
        // fetch here nr_laborantow, miejsca, uzytkownicy, rodzaje with data from db
        if (!this.state.shouldRender) {
            return null; // don't render anything if shouldRender is false
        }

        const laboranci_fields = this.state.laboranci.map(data => {return(<option value={data.id}>{data.nr_laboranta}</option>)});
        const miejsca_fields = this.state.miejsca.map(data => {return(<option value={data.id}>{data.nr_miejsca}</option>)});
        const uzytkownicy_fields = this.state.uzytkownicy.map(data => {return(<option value={data.id}>{data.imie} {data.nazwisko}</option>)});
        const rodzaje_fields = this.state.rodzaje.map(data => {return(<option value={data.id}>{data.rodzaj}</option>)});

        return (
            <tr className="table-row">
                {/* unchangable id field */}
                <td className='table-data'>{this.data.id}</td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'nr_laboranta'} onChange={this.handleInputChange} defaultValue={this.data.nr_laboranta}>
                        {laboranci_fields}
                    </select>
                </td>

                {/* number field */}
                <td className='table-data'><input type='number' name={"ilosc"} onChange={this.handleInputChange} value={this.data.ilosc}/></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'miejsce'} onChange={this.handleInputChange} defaultValue={this.data.miejsce}>
                        {miejsca_fields}
                    </select>
                </td>

                {/* text field */}
                <td className='table-data'><input type="text"   name={'nazwa'} onChange={this.handleInputChange} value={this.data.nazwa}/></td>

                {/* number field */}
                <td className='table-data'><input type="number" name={'nr_inwentarzowy'} onChange={this.handleInputChange} value={this.data.nr_inwentarzowy}/></td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'uzytkownik'} onChange={this.handleInputChange} defaultValue={this.data.uzytkownik}>
                        {uzytkownicy_fields}
                    </select>
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'rodzaj'} onChange={this.handleInputChange} defaultValue={this.data.rodzaj}>
                        {rodzaje_fields}
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'typ'} onChange={this.handleInputChange} defaultValue={this.data.typ}>
                        <option value={1}>Stanowy</option>
                        <option value={0}>Bezstanowy</option>
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'wybrakowanie'} onChange={this.handleInputChange} defaultValue={this.data.wybrakowanie}>
                        <option value={1}>Tak</option>
                        <option value={0}>Nie</option>
                    </select>
                </td>

                <td className='table-data'>
                    <button className="table-data__delete" onClick={this.handleRowDelete}>Usuń</button>
                </td>
            </tr>
        );
    }
};

export default TableRow;