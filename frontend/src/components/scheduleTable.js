import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import { slide as Menu } from 'react-burger-menu'
import { url,styles } from '../url'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
var _pid = localStorage.getItem('_pid')
var token = localStorage.getItem('token')
const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
class Schedule extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Time', field: 'time'},
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
        await fetch(url + ':5000/api/schedule/getSchedule', { 
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
        await fetch(url + ':5000/api/schedule/addSchedule', {
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
        await fetch(url + ':5000/api/schedule/updateSchedule', {
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
        await fetch(url + ':5000/api/schedule/deleteSchedule', {
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
        <div>
            <Menu styles={ styles } > 
                <a className="menu-item"><NavLink to="/schedule">Schedule</NavLink></a><br />
                <a className="menu-item"><NavLink to="/todo">To Do List</NavLink></a><br />
                <a className="menu-item"><NavLink to="/vote">vote</NavLink></a>
            </ Menu>
            <MaterialTable
            title="Schedule"
            columns={this.state.columns}
            data={this.state.data}
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
export default Schedule;
