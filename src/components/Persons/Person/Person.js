import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor (props){
        super(props);
        this.inputElement = React.createRef();
    }

    //static property :
    //it can be accessed outside without create an object based on the class
    //react will access to this property automatically
    //THIS give us new property context (this.context)
    static contextType = AuthContext;

    componentDidMount(){
        this.inputElement.current.focus();
        //based on the static property contextType
        console.log(this.context.authenticated);
    }
    render (){
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                {this.context.authenticated ? <p>User Authenticaded</p> : <p>Please Log In</p>}
                <p onClick={this.props.click}>I'm a {this.props.name} and i'm {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" 
                //ref={(inputEl) => {this.inputElement = inputEl}}
                ref={this.inputElement}
                onChange={this.props.changed} 
                value={this.props.name}/>
            </Aux>
        )
    };
    
}
Person.propTypes = {
    click : PropTypes.func,
    name : PropTypes.string,
    age : PropTypes.number,
    changed : PropTypes.func
};
export default withClass(Person,classes.Person);