import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import VoteTable from '../components/voteTable.js';
class Vote extends Component {

    render() 
    {
      return (
        <div className = "main_section">
          <VoteTable/>
        </div>

      )
    }

}

export default Vote;