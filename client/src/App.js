import './App.css';
import TableDisplay from './components/TableDisplay'
import MenuBar from './components/MenuBar'
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

function openNavBar() {
	document.getElementById('nav-bar').style.width = '250px';
}

function App() {
	// Temporary placeholder for data from db
	const resRows = [
		{
		  id: 2,
		  nr_laboranta: 2137,
		  ilosc: 1,
		  miejsce: 102,
		  nazwa: 'Ławka',
		  nr_inwentarzowy: 2115,
		  uzytkownik: 'Tamul',
		  rodzaj: 'Mebel',
		  typ: 'Stanowy',
		  wybrakowanie: 'Tak'
		},
		{
		  id: 3,
		  nr_laboranta: 69,
		  ilosc: 3,
		  miejsce: 236,
		  nazwa: 'Kąkuter',
		  nr_inwentarzowy: 2023,
		  uzytkownik: 'Tomczak',
		  rodzaj: 'Elektronika',
		  typ: 'Bezstanowy',
		  wybrakowanie: 'Nie'
		},
		{
		  id: 5,
		  nr_laboranta: 2137,
		  ilosc: 10,
		  miejsce: 236,
		  nazwa: 'Fotel',
		  nr_inwentarzowy: 88888,
		  uzytkownik: 'Tomczak',
		  rodzaj: 'Mebel',
		  typ: 'Stanowy',
		  wybrakowanie: 'Tak'
		},
		{
		  id: 7,
		  nr_laboranta: 420,
		  ilosc: 20,
		  miejsce: 236,
		  nazwa: 'okno',
		  nr_inwentarzowy: 21312312,
		  uzytkownik: 'Tamul',
		  rodzaj: 'Mebel',
		  typ: 'Stanowy',
		  wybrakowanie: 'Nie'
		},
		{
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },,
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },,
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
		  {
			id: 1,
			nr_laboranta: 2137,
			ilosc: 1,
			miejsce: 102,
			nazwa: 'Ławka',
			nr_inwentarzowy: 2115,
			uzytkownik: 'Tamul',
			rodzaj: 'Mebel',
			typ: 'Stanowy',
			wybrakowanie: 'Tak'
		  },
	  ]
	;
	
    return (
        <div className="app">
			<MenuBar/>
            <TableDisplay rows={resRows}/>
			<FooterBar/>
			<button className="nav-bar--open" onClick={openNavBar}>O</button>
			<NavBar/>
        </div>
    );
}

export default App;
