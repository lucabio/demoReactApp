import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('[Persons.js] shouldComponentUpdate...');
    //     if ( 
    //         nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed || 
    //         nextProps.clicked !== this.props.clicked
    //     )   {
    //         return true;
    //     }else{
    //         return false;
    //     }

    //     //return true;
        
    // }

    getSnapshotBeforeUpdate(prevProp,prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate...');
        return {message : 'snapshot!'};
    }

    componentDidUpdate(prevProp,prevState,snapshot){
        console.log('[Persons.js] componentDidUpdate',snapshot)
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }

    render (){
        console.log('[Persons.js] rendering...')
        return (
            this.props.persons.map( (element,index) => {
            return <Person
            click={() => this.props.clicked(index)}
            name={element.name} 
            age={element.age}
            key={element.id}
            changed={(event) => this.props.changed(event,element.id)}>
            My hobbies : {element.hobbie}
            </Person>
            
        })
        )
    }
    
}

export default Persons;