import React,{ Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props){
      super(props);
      console.log('[App.js] constructor'); 
    }
  
    state = {
      persons : [
        {
          id : 0,
          name : 'Luca',
          age : 34,
          hobbie: 'I like get drunk'
        },
        {
          id : 1,
          name : 'Silvia',
          age : 31,
          hobbie : 'I like chilling and play Nintendo Switch'
        },
        {
          id : 2,
          name : 'Lorenzo',
          age : 29,
          hobbie : 'I\'m a funcking genius'
        },
      ],
      showPersons : false,
      changeCounter : 0,
      authenticated : false
    };

    initialState = {...this.state};

    static getDerivedStateFromProps(props,state){
      console.log('[App.js] getDerivedStateFromProps',props);
      return state;
    }

    // componentWillMount(){
    //   console.log('[App.js] componentWillMount')
    // }

    componentDidMount(){
      console.log('[App.js] componentDidMount')
    }

    shouldComponentUpdate(nextProps,nextState){
      console.log('[App.js] shouldComponentUpdate')
      return true;
    }

    componentDidUpdate(){
      console.log('[App.js] componentDidUpdate')
    }

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

      //use this sintax to update a state when you depend from the old state.
      this.setState((prevState,props) => {
        return {
          persons : persons,
          changeCounter: prevState.changeCounter + 1
        }
      });
    };

    deletePersonHandler = (index) => {
      //ES6 Sintax
      const persons = [...this.state.persons];
      persons.splice(index,1);
      console.log(persons,this.state.persons);
      this.setState({persons : persons});
    }

    loginHandler = () =>{
      this.setState({authenticated:true})
    }

    restorePersonsArray = () => {
      this.setState(this.initialState);
    }

    togglePersonsHandler = () =>{
        const doesShow = this.state.showPersons;
        this.setState({showPersons:!doesShow});
    }

    render(){
      console.log('[App.js] render')
      let persons   = null;

      if (this.state.showPersons) {
        persons = (
          <div >
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}/> 
          </div>
        );
      }      

      return (
        <Aux>
          <header>
            <AuthContext.Provider value={{
              authenticated:this.state.authenticated,
              login:this.loginHandler
              }}>
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              toggle={this.togglePersonsHandler}
              restoreToggle={this.restorePersonsArray}
            />
            {persons}
            </AuthContext.Provider>
        </header>
       </Aux>
     );
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'I\'m a react app!! '));
    }
}

export default withClass(App,classes.App);