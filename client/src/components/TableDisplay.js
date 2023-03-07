import TableRow from './TableRow'

function TableDisplay(props){
    const rows = props.rows.map(row => {return (<TableRow key={row.id} data={row}/>)});
    return (
        <div className="table-display">
            {rows}
        </div>
    );
};

export default TableDisplay;