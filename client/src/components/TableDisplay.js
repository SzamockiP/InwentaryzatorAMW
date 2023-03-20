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

    getDataRekordy = () => {
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
    }

    // update everything, i think it runs before rerender, so it doesnt trigger it again
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchParams !== this.props.searchParams) {
            this.getDataRekordy();

            // count returned pages
            this.getCountRekordy();
        }

        if(prevState.page !== this.state.page){
            this.getDataRekordy();
            this.getCountRekordy();
        }
    }

    handleRowAddUpdate = () => {
        this.getDataRekordy();
        
        this.setState({});

        // count returned pages
        this.getCountRekordy();
    }

    handlePageUp = () => {
        const maxPage = Math.ceil((this.state.countRekordy+0.01) / 30);
        if(this.state.page < maxPage) {
            this.setState((prevState)=>({page:prevState.page+1}));
        }
    }

    handlePageDown = () => {
        if(this.state.page > 1){ 
            this.setState((prevState) => ({page:prevState.page-1}));
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
        this.getDataRekordy()
        
        // count returned pages
        this.getCountRekordy();
    }


    handleSortOrderChange = (event) => {

        this.setState({orderBy:event.target.name,orderASC:true});
        








    }

    render() {
        // console.log(this.state.count)
        // creates list of <TableRow/> containing data from props.rows
        const rows = this.state.resRows.map(row => { return (<TableRow key={row.id} data={row}/>) });

        return (
            <>
            <table className="table-display">
                <thead className='table-display__thead'>
                    {/* Header of data */}
                    <tr className="table-row">
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'id'}>Id</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'laborant_id'}>Numer Laboranta</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'ilosc'}>Ilość</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'miejsce_id'}>Miejsce</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'nazwa'}>Nazwa</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'nr_inwentarzowy'}>Numer Inwentarzowy</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'uzytkownik_id'}>Użytkownik</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'rodzaj_id'}>Rodzaj</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'typ'}>Typ</td>
                        <td className='table-data' onClick={this.handleSortOrderChange} name={'wybrakowanie'}>Wybrakowanie</td>
                        <td className='table-data'>Funkcje</td>
                    </tr>
                    <AddRow onRowAdd={this.handleRowAddUpdate}/>
                </thead>
                <tbody>
                    {/* Rows of data */}
                    {rows}
                </tbody>
            </table>
            <button onClick={this.handlePageDown}>{'<'}</button>
            <p id='paginationNumber'>{this.state.page}</p>
            <button onClick={this.handlePageUp}>{'>'}</button>
            </>
        );
    }
    
};

export default TableDisplay;