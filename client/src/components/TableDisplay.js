import React from 'react';
import Axios from 'axios';
import TableRow from './TableRow';
import AddRow from './AddRow'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

        if(prevState.orderAsc !== this.state.orderAsc){
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

        // console.log(this.state.orderBy, this.state.orderAsc)
        // this.getDataRekordy()
    }

    handlePrint = () => {
        Axios.get('http://localhost:3001/dane_rekordy/print_table', {
                params:{
                    ...this.props.searchParams,
                    page: this.state.page,
                    order: this.state.orderBy,
                    orderAsc: this.state.orderAsc
                } 
            })
            .then((response) => {
                const headers = [['ID',
                    'Numer Laboranta',
                    'Ilość ',
                    'Miejsce',
                    'Nazwa',
                    'Numer Inwentarzowy',
                    'Użytkownik',
                    'Rodzaj',
                    'Typ',
                    'Wybrakowanie']];
                
                const tableData = response.data.map((row) => [
                    row.id,
                    row.nr_laboranta,
                    row.ilosc,
                    row.miejsce,
                    row.nazwa,
                    row.nr_inwentarzowy,
                    row.imie + ' ' + row.nazwisko,
                    row.rodzaj,
                    row.typ ? 'Stanowy' : 'Bezstanowy',
                    row.wybrakowanie ? 'Tak' : 'Nie']);

                const doc = new jsPDF('a4');

                // Add the Roboto font
                doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
                // Set the font family to Roboto
                doc.setFont('Roboto');

                doc.autoTable({
                    // ...
                    head: headers,
                    body: tableData,
                    // Set the font family for the table
                    styles: {
                        font: 'Roboto',
                    },
                    columnStyles:{
                        0:{cellWidth:12},
                        1:{cellWidth:20},
                        2:{cellWidth:13},
                        3:{cellWidth:20},
                        4:{cellWidth:25},
                        5:{cellWidth:25},
                        6:{cellWidth:25},
                        7:{cellWidth:20},
                        8:{cellWidth:23},
                        9:{cellWidth:27}
                    },
                
                    margin:{left:0, top:0, bottom:0, right:0}
                  });

                doc.save('wykazEwidencyjny.pdf');
            })
            .catch((error) => {
                console.error(error);
            });
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
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.id')}>
                            Id {currentOrderBy === 're.id' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('l.nr_laboranta')}>
                            Numer Laboranta {currentOrderBy === 'l.nr_laboranta' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.ilosc')}>
                            Ilość {currentOrderBy === 're.ilosc' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('m.nr_miejsca')}>
                            Miejsce {currentOrderBy === 'm.nr_miejsca' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.nazwa')}>
                            Nazwa {currentOrderBy === 're.nazwa' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.nr_inwentarzowy')}>
                            Numer Inwentarzowy {currentOrderBy === 're.nr_inwentarzowy' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('u.nazwisko')}>
                            Użytkownik {currentOrderBy === 'u.nazwisko' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('r.rodzaj')}>
                            Rodzaj {currentOrderBy === 'r.rodzaj' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.typ')}>
                            Typ {currentOrderBy === 're.typ' ? orderText:''}
                        </td>
                        <td className='table-data' onClick={()=>this.handleSortOrderChange('re.wybrakowanie')}>
                            Wybrakowanie {currentOrderBy === 're.wybrakowanie' ? orderText:''}
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
            <div className='pagination-container'>
                <button onClick={this.handlePageDown}>{'<'}</button>
                <p id='paginationNumber'>{this.state.page}</p>
                <button onClick={this.handlePageUp}>{'>'}</button>
                <span style={{display: 'none'}} id='tablePrinterLink' onClick={this.handlePrint}></span>
            </div>
            </>
        );
    }
    
};

export default TableDisplay;