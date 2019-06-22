import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import ScheduleTable from '../components/scheduleTable';
class Schedule extends Component {

    render() 
    {
      return (
        <div className = "main_section">
          <ScheduleTable/>
        </div>

      )
    }

}

export default Schedule;