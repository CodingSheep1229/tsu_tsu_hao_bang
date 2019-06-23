import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

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
          columns: [
            { title: '', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck} onClick={e => this.checked(e,rowData)}/>
            },
            { title: 'Work', field: 'work' },
            { title: 'Principal', field: 'principle'},
            { title: 'DeadLine', field: 'deadtime', type: 'time'},
          ],
          data:[],
          newData:[],
          check:[] 
        }  
    }
    checked = (e,rowData) => {
        rowData.ischeck = e.target.checked;
        console.log("hi")
        console.log(rowData);
        this.UpdateDb(rowData);
    };
    getDb = async () => {
        await fetch('http://localhost:5000/api/todo/getTodo', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
            })
            
        })
        .then(data => data.json())
        .then(data => data.data)
        .then(data => this.setState({ ...this.state, data}));
    };
    PutDb = async (newData) => {
      let data = newData;
      await fetch('http://localhost:5000/api/todo/addTodo', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
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
      await fetch('http://localhost:5000/api/todo/updateTodo', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
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
      await fetch('http://localhost:5000/api/todo/deleteTodo', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
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
            <MaterialTable
            title="To Do List"
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
                      "deadtime": newData.deadtime
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
                      "deadtime": newData.deadtime
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
