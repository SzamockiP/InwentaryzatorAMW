import React, { useState } from 'react';

class TableRow extends React.Component{
    constructor (props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            inputValue: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        // fill these variables with data from DB
        this.nr_laborantow = [1,2,3,4];
        this.miejsca = [303,111,2];
        this.uzytkownicy = ['Adam', "Marek", "Heniek"];
        this.rodzaje = ['Komputery', 'Stoły', 'Krzesła'];
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        });
        
        console.log(this.state, event.target.value, event.target.name)
        this.data[event.target.name] = event.target.value;

        // Here you can make db update query
        // place for query
    }    

    render () {
        // fetch here nr_laborantow, miejsca, uzytkownicy, rodzaje with data from db
        const nr_laboranta_fields = this.nr_laborantow.map(data => {return(<option value={data}>{data}</option>)});
        const miejsce_fields = this.miejsca.map(data => {return(<option value={data}>{data}</option>)});
        const uzytkownik_fields = this.uzytkownicy.map(data => {return(<option value={data}>{data}</option>)});
        const rodzaj_fields = this.rodzaje.map(data => {return(<option value={data}>{data}</option>)});

        return (
            <tr className="table-row">
                {/* unchangable id field */}
                <td className='table-data'>{this.data.id}</td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'nr_laboranta'} onChange={this.handleInputChange} defaultValue={this.data.nr_laboranta}>
                        {nr_laboranta_fields}
                    </select>
                </td>

                {/* number field */}
                <td className='table-data'><input type='number' name={"ilosc"} onChange={this.handleInputChange} value={this.data.ilosc}/></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <select name={'miejsce'} onChange={this.handleInputChange} defaultValue={this.data.miejsce}>
                        {miejsce_fields}
                    </select>
                </td>

                {/* text field */}
                <td className='table-data'><input type="text"   name={'nazwa'} onChange={this.handleInputChange} value={this.data.nazwa}/></td>

                {/* number field */}
                <td className='table-data'><input type="number" name={'nr_inwentarzowy'} onChange={this.handleInputChange} value={this.data.nr_inwentarzowy}/></td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'uzytkownik'} onChange={this.handleInputChange} defaultValue={this.data.uzytkownik}>
                        {uzytkownik_fields}
                    </select>
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <select name={'rodzaj'} onChange={this.handleInputChange} defaultValue={this.data.rodzaj}>
                        {rodzaj_fields}
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'typ'} onChange={this.handleInputChange} defaultValue={this.data.typ}>
                        <option value={true}>Stanowy</option>
                        <option value={false}>Bezstanowy</option>
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'wybrakowanie'} onChange={this.handleInputChange} defaultValue={this.data.wybrakowanie}>
                        <option value={true}>Tak</option>
                        <option value={false}>Nie</option>
                    </select>
                </td>
            </tr>
        );
    }
};

export default TableRow;