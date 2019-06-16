import React,{ Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium,{ StyleRoot } from 'radium';

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
      const style = {
        backgroundColor : 'green',
        font:'inherit',
        border:'1px solid black',
        padding : '8px',
        cursor : 'pointer',
        color : 'white',
        ':hover' : {
          backgroundColor : 'lightgreen',
          color : 'black'
        }
      }

      let persons = null;

      if (this.state.showPersons) {
        persons = (
          <div >
          { this.state.persons.map( (element,index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={element.name} 
              age={element.age}
              key={element.id}
              changed={(event) => this.nameChangeHandler(event,element.id)}>
              My hobbies : {element.hobbie}
              </Person>
          })}
          </div>
        );

        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor:'salmon',
          color : 'white'
        }
      }

      let restorePersons = null;

      if(this.state.persons.length === 0){
        restorePersons  = (<button style={style} onClick={this.restorePersonsArray}>Restore Persons</button>);
      }

      const classes = [];

      if(this.state.persons.length <= 2){
        classes.push('red') //classes will be [red]
      }

      if(this.state.persons.length <= 1){
        classes.push('bold') // classes will be [red,bold]
      }

      if(this.state.persons.length === 0){
        classes.push('green') // classes will be [red,bold]
      }

      return (
        <StyleRoot>
        <div className="App">
          <header>
            <h1>Hi i'm a React App</h1>
            <p className={classes.join(' ')}>This lessons are really teaching me something!</p>
            <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {restorePersons}
            {persons}
        </header>
       </div>
       </StyleRoot>
     );
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'I\'m a react app!! '));
    }
}

export default Radium(App);
