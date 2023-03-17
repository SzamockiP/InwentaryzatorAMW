import React from 'react';
import Axios from 'axios';
import TableRow from './TableRow';
import '../styles/TableDisplay.css';

class TableDisplay extends React.Component{
    // update everything, i think it runs before rerender, so it doesnt trigger it again
    componentDidUpdate(prevProps) {
        if (prevProps.searchParams !== this.props.searchParams) {
            Axios.get('http://localhost:3001/dane_rekordy', {
                params:{
                    ...this.props.searchParams,
                    page: this.state.page,
                    order: this.state.orderBy
                } 
            })
            .then((response) => {
                this.setState({resRows:response.data});
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    constructor (props) {
        super(props);
        // state for rekordy data
        this.state = {
            resRows:[],
            page:1,
            orderBy:null
        };

        // get data from table rekordy
        Axios.get('http://localhost:3001/dane_rekordy', {
                params:{
                    ...this.props.searchParams,
                    page: this.state.page,
                    order: this.state.orderBy
                } 
            })
            .then((response) => {
                this.setState({resRows:response.data});
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        // creates list of <TableRow/> containing data from props.rows
        const rows = this.state.resRows.map(row => { return (<TableRow key={row.id} data={row}/>) });

        return (
            <table className="table-display">
                <thead className='table-display__thead'>
                    {/* Header of data */}
                    <tr>
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
                    {rows}
                </tbody>
                <tfoot>
                    {/* Add here an empty row to edit */}
                </tfoot>
            </table>
        );
    }
    
};

export default TableDisplay;