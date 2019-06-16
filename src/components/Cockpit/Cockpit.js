import React from 'react';
import classes from './Cockpit.css';


const cockpit = (props) => {
    const assignedClasses   = [];
    let btnClass            = '';

    if(props.showPersons){
        btnClass = classes.red;
    }

    if(props.persons.length <= 2){
        assignedClasses.push(classes.red) //assignedClasses will be [red]
    }

    if(props.persons.length <= 1){
        assignedClasses.push(classes.bold) // assignedClasses will be [red,bold]
    }

    if(props.persons.length === 0){
        assignedClasses.push(classes.green) // assignedClasses will be [red,bold]
    }

    let restorePersons = null;

    if(props.persons.length === 0){
        restorePersons  = (<div><button className={classes.restore} onClick={props.restoreToggle}>Restore Persons</button></div>);
    }

    let personsRemains = '';
    if (props.showPersons){
        if(props.persons.length >0){
            personsRemains += 'It remains ' + props.persons.length + ' person'+(props.persons.length >1?'s':'');
        }else{
            personsRemains = 'No person remains';
        }
    }
    

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>{personsRemains}</p>
            <button className={btnClass} onClick={props.toggle}>Toggle Persons</button>
            {restorePersons}
        </div>
    )
}

export default cockpit;