import React from 'react';
import TableRow from './TableRow';
import '../styles/TableDisplay.css';

class TableDisplay extends React.Component{
    

    constructor (props) {
        super(props);
        // Temporary placeholder for data from db
        this.resRows = [
            {
                id: 1,
                nr_laboranta: 2137,
                ilosc: 1,
                miejsce: 102,
                nazwa: 'Ławka',
                nr_inwentarzowy: 2115,
                uzytkownik: 'Tamul',
                rodzaj: 'Mebel',
                typ: true,
                wybrakowanie: false
            },
            {
                id: 2,
                nr_laboranta: 2137,
                ilosc: 1,
                miejsce: 102,
                nazwa: 'Ławka',
                nr_inwentarzowy: 2115,
                uzytkownik: 'Tamul',
                rodzaj: 'Mebel',
                typ: false,
                wybrakowanie: false
            },
            {
                id: 3,
                nr_laboranta: 2137,
                ilosc: 1,
                miejsce: 102,
                nazwa: 'Ławka',
                nr_inwentarzowy: 2115,
                uzytkownik: 'Tamul',
                rodzaj: 'Mebel',
                typ: true,
                wybrakowanie: true
            }
        ];
        console.log(this.props.link)
    }


    render() {
        console.log('TableRerender');
        // creates list of <TableRow/> containing data from props.rows
        this.rows = this.resRows.map(row => {return (<TableRow key={row.id} data={row}/>)});

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