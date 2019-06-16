import React,{ Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
    state = {
      persons : [
        {
          id : 0,
          name : 'Luca',
          age : '34',
          hobbie: 'I like get drunk'
        },
        {
          id : 1,
          name : 'Silvia',
          age : '31',
          hobbie : 'I like chilling and play Nintendo Switch'
        },
        {
          id : 2,
          name : 'Lorenzo',
          age : '29',
          hobbie : 'I\'m a funcking genius'
        },
      ],
      showPersons : false
    };

    initialState = {...this.state};

    nameChangeHandler = ( event , id ) => {
      //console.log('button clicked');
      // DON'T DO THIS :: this.state.persons[0].name = 'Luca';

      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      })

      const person = {...this.state.persons[personIndex]};

      person.name = event.target.value;

      const persons = [...this.state.persons];

      persons[personIndex] = person;

      this.setState({persons : persons});
    };

    deletePersonHandler = (index) => {
      //ES6 Sintax
      const persons = [...this.state.persons];
      persons.splice(index,1);
      console.log(persons,this.state.persons);
      this.setState({persons : persons});
    }

    restorePersonsArray = () => {
      this.setState(this.initialState);
    }

    togglePersonsHandler = () =>{
        const doesShow = this.state.showPersons;
        this.setState({showPersons:!doesShow});
    }

    render(){

      let persons   = null;

      if (this.state.showPersons) {
        persons = (
          <div >
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/> 
          </div>
        );
        
      }      

      return (
        <div className={classes.App}>
          <header>
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              persons={this.state.persons}
              toggle={this.togglePersonsHandler}
              restoreToggle={this.restorePersonsArray}
            />
            {persons}
        </header>
       </div>
     );
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'I\'m a react app!! '));
    }
}

export default App;
