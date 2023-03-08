import TableRow from './TableRow';
import '../styles/TableDisplay.css';

function TableDisplay(props){
    const rows = props.rows.map(row => {return (<TableRow key={row.id} data={row}/>)});
    return (
        <table className="table-display">
            <thead>
                {/* Add here a header row */}
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