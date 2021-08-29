import React, {Component} from 'react';
import ItemsList from '../items-list';
import PostAddForm from '../post-add-form';
import SearchPanel from '../search-panel';
import Spinner from '../spinner';
import gotService from '../../services/gotService';
import './app.css';

export default class App extends Component {
    gotService = new gotService();
    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            maxId : 0,
            term: '',
            count: 1
        }
    }
    
    componentDidMount (){
        this.updateItem();
       
    }
    componentDidUpdate() {
        if(this.state.count) {
            this.updateItem();
        }
    }
    updateItem = () => {
        this.gotService.getResource()
        .then( (data) => {
            let countId = data[data.length-1].id;
            this.setState({
                data,
                maxId: ++countId,
                count: 0
            })
        })  
    }
   
    searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }
        const sortItems = items.map(item => {
            return item.tag.filter(ite => {
                return ite.indexOf(term) >= 0;
                
            });
        });
        let count = -1;
        return items.filter(item => {
            count++;
            if(sortItems[count].length !== 0){
                return item
            }
            
        })
    }
    onUpdateSearch = (term) => {
        this.setState({term})
    }
    addItem = (body) => {
        this.setState({
            count: 1
        })
        let val = body.split(/(#[a-z\d-]+)/ig);
        let array = [];
        for (let i of val) {
            if (i[0] === "#") {
                array.push(i);
            }
        }
        const newItem = {
            id: this.state.maxId,
            title: body,
            tag: array
        }
        this.gotService.postResource(newItem);
    }
    addChange = (body) => {
        this.setState({
            count: 1
        })
        let val = body.text.split(/(#[a-z\d-]+)/ig);
        let array = [];
        for (let i of val) {
            if (i[0] === "#") {
                array.push(i);
            }
        }
        const newItem = {
            id: body.number,
            title: body.text,
            tag: array
        }
        this.gotService.putResource(newItem);
    }
    deleteItem = (id) => {
        this.setState({
            count: 1
        })
        this.gotService.deleteResource(id);
    }
    render() {
        const {data, maxId, term} = this.state;
        const notes = this.searchPost(data, term);
        if (!data) {
            return <Spinner/>
        }
        
        return(
            <div className="app">
                <SearchPanel 
                    onUpdateSearch={this.onUpdateSearch}
                />
                <ItemsList 
                    dataItems={notes}
                    onDelete={this.deleteItem}
                    someChange={this.addChange}
                />
                <PostAddForm 
                    onAdd={this.addItem}
                />
                
          
            </div>
        )
    }

}