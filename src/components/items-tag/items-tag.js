import React, {Component} from 'react';
import './items-tag.css'

export default class Items extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        
        const {tag} = this.props;


        return (
            <span>{tag}</span>
        )
    }


}