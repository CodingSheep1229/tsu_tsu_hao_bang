import React, { Component } from 'react';
import ToDoTable from '../components/toDoTable.js';
import Menu from '../components/menu';
class Todo extends Component {

    render() 
    {
      return (
        <div>
          <Menu />
          <ToDoTable/>
        </div>

      )
    }

}

export default Todo;