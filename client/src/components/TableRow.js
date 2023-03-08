import React from 'react';

class TableRow extends React.Component{

    constructor (props) {
        super(props);
        this.columns = [];
        for(let item in props.data){
            this.columns.push(props.data[item]);
        }
        this.columns = this.columns.map(data => {return(<td className='table-data'>{data}</td>)})
    }

    render () {
        return (
            <tr className="table-row">
                {this.columns}
            </tr>
        );
    }
};

export default TableRow;