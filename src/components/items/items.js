import React, {Component} from 'react';
import ItemsTag from '../items-tag';
import './items.css'

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.title,
            number: 0
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onChanges = this.onChanges.bind(this);
        this.valueChanges = this.valueChanges.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    onChanges(e){
        let btnId = e.target.classList[2];
        let inPut = document.querySelectorAll('input');
        inPut.forEach((item,i)=>{
            if(item.classList.item(1) == btnId){
                item.removeAttribute('readonly');
                this.setState({
                    number: btnId
                });
            }
        });
       
    }
    valueChanges(e){
               
        if (e.keyCode === 13) {
            this.props.someChange(this.state);
        }            
    }
    
    render() {
        
        const {id, tag, onDelete} = this.props;
        let classNameId = `app-list-item-label ${id}`;
        let classNameBtn = `fa fa-pencil ${id}`;
        let classNameBtnBain = `btn-pencil btn-sm ${id}`;

        const elements = tag.map(item => {
            return(        
                <li  key={id} className='list-group-tag'>
                    <ItemsTag
                        tag = {item}
                    />
                </li>
            )
         });
        return (
            <div>
            <div className='app-list-item d-flex justify-content-between'>
                <input 
                className={classNameId}
                readOnly
                onChange={this.onValueChange}
                onKeyDown={this.valueChanges}
                value={this.state.text}
                />
           
                <div className="d-flex justify-content-center align-items-center">
                    <button 
                    type="button" 
                    className={classNameBtnBain}
                  
                    onClick={this.onChanges} 
                    >
                        <i className={classNameBtn}></i>
                       
                    </button>
                    <button 
                    type="button" 
                    className="btn-trash btn-sm"
                    onClick={onDelete}
                    >
                        <i className="fa fa-trash-o" ></i>
                    </button>
                </div>
            </div>
                <ul className='app-list-tag'>
                    {elements}
                </ul>
            </div>
        )
    }


}