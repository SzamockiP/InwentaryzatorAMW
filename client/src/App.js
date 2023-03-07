import './App.css';
import TableDisplay from './components/TableDisplay'

function App() {
	const resRows = [
		{
			'id':1,
			'desc':"123"
		},
		{
			'id':2,
			'desc':"1234"
		},
		{
			'id':3,
			'desc':"12345"
		}
	];
	
    return (
        <div className="App">
            <TableDisplay rows={resRows}/>
        </div>
    );
}

export default App;
