import React from 'react';
import Axios from 'axios';
import TableRow from './TableRow';
import AddRow from './AddRow'
import '../styles/TableDisplay.css';

class TableDisplay extends React.Component{

    getCountRekordy(){
        Axios.get('http://localhost:3001/dane_rekordy/count_rekordy', {
                params:{
                    ...this.props.searchParams
                } 
            })
            .then((response) => {
                this.setState({countRekordy:response.data[0].countRekordy});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // update everything, i think it runs before rerender, so it doesnt trigger it again
    componentDidUpdate(prevProps) {
        if (prevProps.searchParams !== this.props.searchParams) {
            Axios.get('http://localhost:3001/dane_rekordy/data', {
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

            // count returned pages
            this.getCountRekordy();
        }
    }

    handleRowAddUpdate = () => {
        
        Axios.get('http://localhost:3001/dane_rekordy/data', {
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
        
        this.setState({test:null});

        // count returned pages
        this.getCountRekordy();
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
        Axios.get('http://localhost:3001/dane_rekordy/data', {
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
        
        // count returned pages
        this.getCountRekordy();
    }


    render() {
        // console.log(this.state.count)
        // creates list of <TableRow/> containing data from props.rows
        const rows = this.state.resRows.map(row => { return (<TableRow key={row.id} data={row}/>) });

        const max_pages = Math.ceil((this.state.countRekordy+0.01)/30);
        return (
            <>
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
                        <td className='table-data'>Funkcje</td>
                    </tr>
                    <AddRow onRowAdd={this.handleRowAddUpdate}/>
                </thead>
                <tbody>
                    {/* Rows of data */}
                    {rows}
                </tbody>
            </table>
            <p>{max_pages}</p>

            
            </>
        );
    }
    
};

export default TableDisplay;