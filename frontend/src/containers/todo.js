import React, { Component } from 'react';
import ToDoTable from '../components/toDoTable.js';
class Todo extends Component {

    render() 
    {
      return (
        <div className = "main_section">
          <ToDoTable/>
        </div>

      )
    }

}

export default Todo;