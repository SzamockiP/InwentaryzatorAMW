import React from "react";
import Axios from "axios";
import '../styles/SelectWithSearch.css';

class SelectWithSearch extends React.Component {

	// fetches data from db based on type of component
    getOptions = () =>{
        Axios.get(`http://localhost:3001/dane_${this.state.type}`).then((response) => {
			switch(this.state.type){
				case 'laboranci': 
					this.setState({options:response.data.map(
						(data) => {return({value:data.id, label:data.nr_laboranta})}
					)});
					if(this.props.value){
						const findData = response.data.find(option => option.id === this.props.value)
						this.setState({selectedOption:
							{
								value:findData.id,
								label:findData.nr_laboranta
							}	
						})
					}
				break;
	

				case 'miejsca': 
					this.setState({options:response.data.map(
						(data) => {return({value:data.id, label:data.nr_miejsca})}
					)});
					if(this.props.value){
						const findData = response.data.find(option => option.id === this.props.value)
						this.setState({selectedOption:
							{
								value:findData.id,
								label:findData.nr_miejsca
							}	
						})
					}
				break;


				case 'uzytkownicy': 
					this.setState({options:response.data.map(
						(data) => {return({value:data.id, label:data.imie + ' ' + data.nazwisko})}
					)});
					if(this.props.value){
						const findData = response.data.find(option => option.id === this.props.value)
						this.setState({selectedOption:
							{
								value:findData.id,
								label:findData.imie + ' ' + findData.nazwisko
							}	
						})
					}
				break;


				case 'rodzaje':
					this.setState({options:response.data.map(
						(data) => {return({value:data.id, label:data.rodzaj})}
					)});

					if(this.props.value){
						const findData = response.data.find(option => option.id === this.props.value)
						this.setState({selectedOption:
							{
								value:findData.id,
								label:findData.rodzaj
							}	
						})
					}
				break;

				
				default:
				break;
			}	
        }).catch(error => {
			console.error(error);
		});
    }

  	constructor(props) {
		super(props);

		this.state = {
			type: props.type,
			isOpen: false,
			selectedOption: null,
			options:[],
			searchValue: "",
			addValue:"",
		};

		this.handleOptionSelect = this.handleOptionSelect.bind(this);
		this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
		this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
		this.filterOptions = this.filterOptions.bind(this);

		this.getOptions();
  	}

  	// handler for selectiong options
  	handleOptionDelete = (optionToRemove) => {
		const newOptions = this.state.options.filter(obj => {
			return obj.value !== optionToRemove.value && obj.label !== optionToRemove.label;
		});
		this.setState({options:newOptions})

		// update db here
		Axios.delete(`http://localhost:3001/dane_${this.state.type}/delete/${optionToRemove.value}`)
            .then(response => {
				// pull from db options
				this.getOptions();
            })
            .catch(error => {
                console.error(error);
            });
  	}

	// does selection
  	handleOptionSelect(option) {
		// sends value of selection to the parent
		this.props.onChange(option.value)

    	this.setState({ selectedOption: option, isOpen: false});
  	}

  	// handler for toggling dropdown
  	handleDropdownToggle(){
    	this.setState((prevState) => {return{isOpen: !prevState.isOpen}});
		// this.setState({isOpen:true})
		
  	}

  	// search input change
  	handleSearchInputChange(event) {
    	const value = event.target;
   	 	this.setState({ searchValue: value });
  	}

  	// input for adding new options
  	handleAddInputChange = (event) => {
		const { value } = event.target;
    	this.setState({ addValue: value });
  	}

  	// button handler for adding new options
  	handleAddOption = () => {
		const addValue = this.state.addValue;
    	const newOption = { value: addValue.toLowerCase(), label: addValue };
    	
		let dataToInsert;
		switch(this.state.type){
			case 'laboranci': 
				dataToInsert = {nr_laboranta:addValue}
			break;
				

			case 'miejsca': 
				dataToInsert = {nr_miejsca:addValue}
			break;


			case 'uzytkownicy': 
				if(addValue.split(' ').length() > 1)
					dataToInsert = {imie:addValue.split(' ')[0], nazwisko:addValue.split(' ')[1]}
				else
					return
			break;


			case 'rodzaje': 
				dataToInsert = {rodzaj:addValue}
			break;


			default:
			break;
		}

		this.setState({options:[...this.state.options, newOption]});

		// add new option to the db
		Axios.post(`http://localhost:3001/dane_${this.state.type}/create`, dataToInsert)
            .then(response => {
                // update SelectWithSearch
				this.setState({addValue:""});
				// pull from db options
				this.getOptions();
            })
            .catch(error => {
                console.error(error);
            });
  	};

  	// filters options based on search value
  	filterOptions() {
    	const { options, searchValue } = this.state;
    	const filteredOptions = options.filter((option) =>
      		option.label.toLowerCase().includes(searchValue.toLowerCase()))
		return filteredOptions;
	};

	// functions that are responsible for closing dropdown after clicking somewhere else
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	
	handleClickOutside = (event) => {
		if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
		  	this.setState({ isOpen: false });
		}
	}

	componentDidUpdate(prevProps,prevState){
		// run only after adding new row
		if(prevProps.value !== this.props.value  && this.props.value === undefined){
			// this.setState({selectedValue:this.props.value});
			this.setState({selectedOption:{value:this.props.value, label:"Nie wybrano"}})
		}
	}
	
	render() {
		const { selectedOption, searchValue } = this.state;
		// takes value from parent and changes things i guess
		return (
			<div className="select-with-search" ref={(ref) => { this.dropdownRef = ref; }}>
				{/* This is what is displayed in td */}
				<div
					className="select-with-search-header"
					onClick={this.handleDropdownToggle}
				>
					{selectedOption ? selectedOption.label : "Nie wybrano"}
				</div>
	
				{/* this is dropdown */}
				{this.state.isOpen && (
					<div className="select-with-search-dropdown">
						{/* search input */}
						<input
							type="text"
							value={searchValue}
							onChange={this.handleSearchInputChange}
							placeholder="Szukaj..."
						/>
						{/* options */}
						<ul>
							<li value='' onClick={() => this.handleOptionSelect({value:'',label:'Nie wybrano'})}>Nie wybrano</li>
							{this.state.options.map((option) => (
								<li key={option.value} value={option.value} onClick={() => this.handleOptionSelect(option)}>
									{option.label}<span onClick={() => this.handleOptionDelete(option)}>X</span>
								</li>
							))}
						</ul>
	
						{/* adding part */}
						<div className="select-with-search-add-option">
							<input type="text" placeholder="Dodaj nowy" onChange={this.handleAddInputChange} />
							<button onClick={this.handleAddOption}>Dodaj</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default SelectWithSearch;
