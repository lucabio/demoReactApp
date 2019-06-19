import React,{useEffect,useRef,useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';


const Cockpit = (props) => {

    const toggleButtonRef   = useRef(null);
    const authContext       = useContext(AuthContext);

    //  in functional component useEffect is called after render() function
    //  toggleButtonRef reference is ready when the 'DOM'(the JSX code) is ready
    useEffect(()=>{
        console.log('[Cockpit.js] useEffect')
        //Http Request...
        // setTimeout(()=>{
        //     alert('saved data to cloud...');
        // },1000);

        //toggleButtonRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    },[]);

    // useEffect(()=>{
    //     return () => {
    //         console.log('[Cockpit.js] cleanup work in 2useEffect');
    //     }
    // })

    const assignedClasses   = [];
    let btnClass            = '';

    if(props.showPersons){
        btnClass = classes.red;
    }

    if(props.personsLength <= 2){
        assignedClasses.push(classes.red) // assignedClasses will be [red]
    }

    if(props.personsLength <= 1){
        assignedClasses.push(classes.bold) // assignedClasses will be [red,bold]
    }

    if(props.personsLength === 0){
        assignedClasses.push(classes.green) // assignedClasses will be [red,bold]
    }

    let restorePersons = null;

    if(props.personsLength === 0){
        restorePersons  = (<div><button className={classes.restore} onClick={props.restoreToggle}>Restore Persons</button></div>);
    }

    let personsRemains = '';
    if (props.showPersons){
        if(props.personsLength >0){
            personsRemains += 'It remains ' + props.personsLength + ' person'+(props.personsLength >1?'s':'');
        }else{
            personsRemains = 'No person remains';
        }
    }
    

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>{personsRemains}</p>
            <button className={btnClass} onClick={props.toggle}>Toggle Persons</button>
            <button onClick={authContext.login}>Log In</button>
            {restorePersons}
        </div>
    )
}

export default React.memo(Cockpit);