import TableRow from './TableRow';
import '../styles/TableDisplay.css';

function TableDisplay(props){
    const headerRowData = Object.keys(props.rows[0]);
    
    const rows = props.rows.map(row => {return (<TableRow key={row.id} data={row}/>)});
    return (
        <table className="table-display">
            <thead className='table-display__thead'>
                {/* Add here a header row */}
                <TableRow key={'headerDataId'} data={headerRowData}/>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                {/* Add here an empty row to edit */}
            </tfoot>
        </table>
    );
};

export default TableDisplay;