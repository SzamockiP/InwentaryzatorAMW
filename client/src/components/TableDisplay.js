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
                    order: this.state.orderBy,
                    orderAsc: this.state.orderAsc
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
            orderBy:null,
            orderAsc:null
        };

        // get data from table rekordy
        this.getDataRekordy()
        
        // count returned pages
        this.getCountRekordy();
    }


    handleSortOrderChange = (name) => {
        const currentOrderBy = this.state.orderBy
        const currentOrderAsc = this.state.orderAsc
        // change orderAsc
        if(name === currentOrderBy){
            if(currentOrderAsc === true) 
                this.setState({orderAsc:false})
            else if(currentOrderAsc === false)
                this.setState({orderAsc:null})
            else 
                this.setState({orderAsc:true})
        }
        else 
            this.setState({orderBy:name, orderAsc:true})
    }

    render() {
        // console.log(this.state.count)
        // creates list of <TableRow/> containing data from props.rows
        const rows = this.state.resRows.map(row => { return (<TableRow key={row.id} data={row}/>) });
        const currentOrderBy = this.state.orderBy
        let orderText;
        if(this.state.orderAsc === true)
            orderText='⬆';
        else if(this.state.orderAsc === false)
            orderText='⬇';
        else 
            orderText='';

        return (
            <>
            <table className="table-display">
                <thead className='table-display__thead'>
                    {/* Header of data */}
                    <tr className="table-row">
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('id')}>
                            Id {currentOrderBy === 'id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('laborant_id')}>
                            Numer Laboranta {currentOrderBy === 'laborant_id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('ilosc')}>
                            Ilość {currentOrderBy === 'ilosc' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('miejsce_id')}>
                            Miejsce {currentOrderBy === 'miejsce_id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('nazwa')}>
                            Nazwa {currentOrderBy === 'nazwa' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('nr_inwentarzowy')}>
                            Numer Inwentarzowy {currentOrderBy === 'nr_inwentarzowy' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('uzytkownik_id')}>
                            Użytkownik {currentOrderBy === 'uzytkownik_id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('rodzaj_id')}>
                            Rodzaj {currentOrderBy === 'rodzaj_id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('typ')}>
                            Typ {currentOrderBy === 'typ' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('wybrakowanie')}>
                            Wybrakowanie {currentOrderBy === 'wybrakowanie' ? orderText:''}
                        </td>
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