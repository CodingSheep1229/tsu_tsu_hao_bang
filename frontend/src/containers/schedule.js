import React, { Component } from 'react';
import ScheduleTable from '../components/scheduleTable';
class Schedule extends Component {

    render() 
    {
      return (
        
        <div className = "main_section">
          {/* <Parent/> */}
          <ScheduleTable/>
        </div>

      )
    }

}

export default Schedule;