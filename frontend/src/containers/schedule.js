import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import ScheduleTable from '../components/scheduleTable';
import Parent from '../components/sidebar'
class Schedule extends Component {

    render() 
    {
      return (
        
        <div className = "main_section">
          <Parent></Parent>
          <ScheduleTable/>
        </div>

      )
    }

}

export default Schedule;