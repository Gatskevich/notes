
import React  from 'react';
import Items from '../items';
import './items-list.css';


const ItemsList = ({dataItems, onDelete, someChange}) => {


    const elements = dataItems.map(item => {
        const {id, ...itemProps} = item;
        let text = '';
        return(        
        <li  key={id} className='list-group-item'>
            <Items
                 id={id}
                 {...itemProps}
                 onDelete={() => onDelete(id)}
                 someChange={someChange}
            />
        </li>
        )
     });
    return(
            
        <ul className="app-list list-group">
            {elements}
        </ul>

    )
    
}

export default ItemsList;