import React from 'react';
import Axios from 'axios';
import TableRow from './TableRow';
import '../styles/TableDisplay.css';

class TableDisplay extends React.Component{
    getRekordy(){

        const url = new URL(window.location.href);
        const urlParams = Object.fromEntries(url.searchParams.entries());
        Axios.get('http://localhost:3001/dane_rekordy', {
            params:urlParams
        }).then((response) => {
            this.setState({resRows:response.data});
        });
    }

    constructor (props) {
        super(props);
        // state for rekordy data
        this.state = {
            resRows:[],
            page:1
        };
        // get data from table rekordy
        this.getRekordy();
    }


    render() {
        // creates list of <TableRow/> containing data from props.rows
        this.rows = this.state.resRows.map(row => {return (<TableRow key={row.id} data={row}/>)});

        return (
            <table className="table-display">
                <thead className='table-display__thead'>
                    {/* Header of data */}
                    <tr className="table-row">
                        <td className='table-data'>Id</td>
                        <td className='table-data'>Numer Laboranta</td>
                        <td className='table-data'>Ilość</td>
                        <td className='table-data'>Miejsce</td>
                        <td className='table-data'>Nazwa</td>
                        <td className='table-data'>Numer Inwentarzowy</td>
                        <td className='table-data'>Użytkownik</td>
                        <td className='table-data'>Rodzaj</td>
                        <td className='table-data'>Typ</td>
                        <td className='table-data'>Wybrakowanie</td>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows of data */}
                    {this.rows}
                </tbody>
                <tfoot>
                    {/* Add here an empty row to edit */}
                </tfoot>
            </table>
        );
    }
    
};

export default TableDisplay;