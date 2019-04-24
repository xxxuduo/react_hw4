import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId:0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: this.state.nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: [...prevState.items].concat(newItem), nextItemId: prevState.nextItemId+1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    let filteredItems = this.state.items.filter((item)=> {return !item.isCompleted} );
    this.setState({items:filteredItems});
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let items_next = [...this.state.items];
    items_next.forEach((item)=>{
      if (item.id === itemId) {
        item.isCompleted = !item.isCompleted;
      }
    });
    this.setState({items:items_next});

  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    let items_next = [...this.state.items];
    items_next.forEach((item)=>{
      if (item.id === itemId) {
        item.sessionsCompleted +=1;
      }
    });
    this.setState({items:items_next});
  }

  startSession(id) {
    // TODO 4
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    });    
  }

  render() {

    let areItemsMarkedAsCompleted = false;

    this.state.items.forEach((item)=>{
      if (item.isCompleted) {
        areItemsMarkedAsCompleted = true;
      }
    });




    const {
      items,
      sessionIsRunning,
      itemIdRunning,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>

          {items.length==0 ? <EmptyState /> : 

            
              sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={()=>this.increaseSessionsCompleted(itemIdRunning)}
              key={this.itemIdRunning}
              autoPlays
            /> }

            

              <div className="items-container">
              {
              /* TODO 3:  display todo items */
              items.map((item)=>(
                <TodoItem  
                  description={item.description}
                  sessionsCompleted={item.sessionsCompleted}
                  isCompleted={item.isCompleted}
                  startSession={()=>this.startSession(item.id)}
                  toggleIsCompleted={()=>this.toggleItemIsCompleted(itemIdRunning)}
                  key={item.id}
                />))}
              </div>
            
          
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
