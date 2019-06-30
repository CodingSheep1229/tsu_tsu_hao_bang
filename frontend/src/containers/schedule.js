import React, { Component } from 'react';
import ScheduleTable from '../components/scheduleTable';
import Menu from '../components/menu';
class Schedule extends Component {

    render() 
    {
      return (
        
        <div>
          {/* <Parent/> */}
          <Menu/>
          <ScheduleTable/>
        </div>

      )
    }

}

export default Schedule;