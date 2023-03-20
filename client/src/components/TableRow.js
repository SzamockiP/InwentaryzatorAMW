import React from 'react';
import SelectWithSearch from './SelectWithSearch';
import Axios from 'axios';

class TableRow extends React.Component{
    updateRow(){
        Axios.put(`http://localhost:3001/dane_rekordy/update/${this.data.id}`, this.data).then((response) => {
            this.setState({});
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
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        });
        this.data[event.target.name] = event.target.value;

        // Here you can make db update query
        // place for query
        this.updateRow();
    }    

    handleRowDelete = () => {
        this.setState({shouldRender:false})
        Axios.delete(`http://localhost:3001/dane_rekordy/delete/${this.data.id}`)
        .catch(error => {
            console.error(error);
        });
    }


    render () {
        // fetch here nr_laborantow, miejsca, uzytkownicy, rodzaje with data from db
        if (!this.state.shouldRender) {
            return null; // don't render anything if shouldRender is false
        }

        return (
            <tr className="table-row">
                {/* unchangable id field */}
                <td className='table-data'><p className='table-data-id'>{this.data.id}</p></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type='laboranci'
                        name={'laborant_id'}
                        onChange={(newValue) => {
                            this.setState({
                                inputValue: newValue
                            });
                            this.data.laborant_id = newValue;
                            this.updateRow();
                        }}
                        value={this.data.laborant_id}
                    />
                </td>

                {/* number field */}
                <td className='table-data'><input type='number' name={"ilosc"} min='1' max='9999' onChange={this.handleInputChange} value={this.data.ilosc}/></td>

                {/* selectable number field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type='miejsca'
                        name={'miejsce_id'}
                        onChange={(newValue) => {
                            this.setState({
                                inputValue: newValue
                            });
                            this.data['miejsce_id'] = newValue;
                            this.updateRow();
                        }}
                        value={this.data.miejsce_id}
                    />
                </td>

                {/* text field */}
                <td className='table-data'><input type="text" name={'nazwa'} onChange={this.handleInputChange} value={this.data.nazwa}/></td>

                {/* number field */}
                <td className='table-data'><input type="text"  name={'nr_inwentarzowy'} onChange={this.handleInputChange} value={this.data.nr_inwentarzowy}/></td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type='uzytkownicy'
                        name={'uzytkownik_id'}
                        onChange={(newValue) => {
                            this.setState({
                                inputValue: newValue
                            });
                            this.data['uzytkownik_id'] = newValue;
                            this.updateRow();
                        }}
                        value={this.data.uzytkownik_id}
                    />
                </td>

                {/* selectable text field */}
                <td className='table-data'>   
                    <SelectWithSearch 
                        type='rodzaje'
                        name={'rodzaj_id'}
                        onChange={(newValue) => {
                            this.setState({
                                inputValue: newValue
                            });
                            this.data['rodzaj_id'] = newValue;
                            this.updateRow();
                        }}
                        value={this.data.rodzaj_id}
                    />
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'typ'} onChange={this.handleInputChange} value={this.data.typ}>
                        <option value={1}>Stanowy</option>
                        <option value={0}>Bezstanowy</option>
                    </select>
                </td>

                {/* selectable bool field */}
                <td className='table-data'>
                    <select name={'wybrakowanie'} onChange={this.handleInputChange} value={this.data.wybrakowanie}>
                        <option value={1}>Tak</option>
                        <option value={0}>Nie</option>
                    </select>
                </td>

                <td className='table-data'>
                    <button className="buttonUsun-data" onClick={this.handleRowDelete}>Usuń</button>
                </td>
            </tr>
        );
    }
};

export default TableRow;