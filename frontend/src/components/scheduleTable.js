import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { url,} from '../url'
import Menu from './menu';
import { basicColor } from '../decorate';
var _pid = localStorage.getItem('_pid')
var token = localStorage.getItem('token')
class ScheduleTable extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Time', field: 'time',type:"datetime"},
                { title: 'Itinerary', field: 'itinerary' },
                { title: 'Spending', field: 'spending', type: 'numeric' },
                {
                    title: 'Remark',
                    field: 'remark',
                },
            ],
            data:[]
            // data: [
            //     { time: '10:00-11:00', itinerary: '起床', spending: 0, remark: '嘿嘿' },
            //     {
                    // time: '11:00-12:00',
                    // itinerary: '搭車',
                    // spending: 20,
                    // remark: '不能遲到喔',
            //     },
            // ],              
        }  
    }

    getDb = async () => {
        _pid = localStorage.getItem('_pid');
        token = localStorage.getItem('token');
        await fetch(url + '/api/schedule/getSchedule', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Token ' + token, 
                '_pid': _pid
            })
            
        })
        .then(data => data.json())
        .then(data => data.data)
        .then(data => this.setState({ ...this.state, data}));
    };
    
    
    PutDb = async (newData) => {
        _pid = localStorage.getItem('_pid')
        let data = newData;
        await fetch(url + '/api/schedule/addSchedule', {
            method: 'post',
            body: JSON.stringify({
              data
          }),
          headers: new Headers({
              'Authorization': 'Token ' + token, 
              'Content-Type': 'application/json',
          })
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                console.log(res);
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
      }

      UpdateDb = async (newData) => {
        let data = newData;
        await fetch(url + '/api/schedule/updateSchedule', {
            method: 'post',
            body: JSON.stringify({
              data
          }),
          headers: new Headers({
              'Authorization': 'Token ' + token, 
              'Content-Type': 'application/json',
              '_pid': _pid
          })
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                console.log(res);
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
      }
      DeleteDb = async (deleteId) => {
        let data = {"id":deleteId};
        await fetch(url + '/api/schedule/deleteSchedule', {
            method: 'post',
            body: JSON.stringify({
              data
          }),
          headers: new Headers({
              'Authorization': 'Token ' + token, 
              'Content-Type': 'application/json',
          })
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                console.log(res);
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
      }

    componentDidMount(){
        this.getDb();
    }
    // const classes = useStyles();
    render(){    
    return (
        <div className = "materialTable">
          <br/><br/>
            
            <MaterialTable
            title="Schedule"
            columns={this.state.columns}
            data={this.state.data}
            options={{
                searchFieldStyle:{
                    borderBottomColor: basicColor,
                },
                actionsColumnIndex: -1,
            }}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    newData = {
                        "_id":String(Date.now()),
                        "time": newData.time,
                        "itinerary": newData.itinerary,
                        "spending": newData.spending,
                        "remark": newData.remark,
                        "_pid": _pid
                    };
                    this.PutDb(newData);
                    data.push(newData);
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data[data.indexOf(oldData)] = newData;
                    newData = {
                        "_id": oldData._id,
                        "time": newData.time,
                        "itinerary": newData.itinerary,
                        "spending": newData.spending,
                        "remark": newData.remark,
                        "_pid": _pid
                    };
                    this.setState({ ...this.state, data });
                    this.UpdateDb(newData)
                    this.getDb();
                    }, 10);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    this.DeleteDb(oldData._id)
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
            }}
            />
        </div>
    );
}
};
export default ScheduleTable;
