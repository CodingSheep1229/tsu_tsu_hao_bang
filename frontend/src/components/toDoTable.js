import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { slide as Menu } from 'react-burger-menu'
import { url,styles } from '../url'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
const token = localStorage.getItem('token')
var _pid = localStorage.getItem('_pid')
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
class TodoTable extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
          data:[
            {
              _id:'a',
              ischeck: true,
              work: 'sleep',
              principle: 'meme',
              deadtime: '10:00'
            },
            {
              _id:'b',
              ischeck: true,
              work: 'pleep',
              principle: 'peme',
              deadtime: '10:00'
            },
          ],
          columns: [
            { title: '', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck} onClick = {() => {
                this.getDb()
                
                for(var i=0;i<Number(this.state.data.length);i++){
                  if(rowData._id == this.state.data[i]._id){
                    let temp = this.state.data
                    temp[i].ischeck = !rowData.ischeck
                    this.setState({data: temp});
                    this.UpdateDb(temp[i])
                  }
                }
                
              }} />
            },
            { title: 'Work', field: 'work' },
            { title: 'Principal', field: 'principle'},
            { title: 'DeadLine', field: 'deadtime', type: 'time'},
          ],
        }  
    }
    getDb = async () => {
        _pid = localStorage.getItem('_pid')
        await fetch(url + '/api/todo/getTodo', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Token ' + token,
                '_pid':_pid
              })
            
        })
        .then(data => data.json())
        .then(data => data.data)
        .then(data => this.setState({ ...this.state, data}));
    };
    PutDb = async (newData) => {
      let data = newData;
      await fetch(url + '/api/todo/addTodo', {
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
      await fetch(url + '/api/todo/updateTodo', {
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
    DeleteDb = async (deleteId) => {
      let data = {"id":deleteId};
      await fetch(url + '/api/todo/deleteTodo', {
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
            columns={this.state.columns}
            data={this.state.data}
            options={{
              actionsColumnIndex: -1
            }}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout( () => {
                    const data = [...this.state.data];
                    newData = {
                      "_id":String(Date.now()),
                      "ischeck": newData.ischeck,
                      "work": newData.work,
                      "principle": newData.principle,
                      "deadtime": newData.deadtime,
                      '_pid':_pid
                    };
                    this.PutDb(newData);
                    resolve();
                    data.push(newData);
                    this.setState({ ...this.state, data });
                    }, 10);
                    
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    newData = {
                      "_id":data[data.indexOf(oldData)]._id,
                      "ischeck": newData.ischeck,
                      "work": newData.work,
                      "principle": newData.principle,
                      "deadtime": newData.deadtime,
                      '_pid':_pid
                    }
                    this.UpdateDb(newData)
                    data[data.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, data });
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
export default TodoTable;
