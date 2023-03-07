import React from 'react';
import '../styles/TableRow.css';


class TableRow extends React.Component{

    constructor (props) {
        super(props);
        this.columns = [];
        for(let item in props.data){
            this.columns.push(props.data[item]);
        }
        this.columns = this.columns.map(data => {return(<div className='table-data'>{data}</div>)})
    }

    render () {
        return (
            <div className="table-row">
                {this.columns}
            </div>
        );
    }
};

export default TableRow;