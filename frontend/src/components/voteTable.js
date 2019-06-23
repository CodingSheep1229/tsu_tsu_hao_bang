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
class VoteTable extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
          columns: [
            { title: 'Subject', field: 'subject' },
            { title: 'Link', field: 'link' },
            { title: 'Member', field: 'member', type:'list',
              render: rowData =>  rowData.member.map((imag) => <img src={imag} style={{width: 50, height:50, borderRadius: '50%'}}/>) 
            },
            { title: 'Vote', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck} />
            },
          ],
          data: [
            { 
              subject: 'A hotel',
              link: 'https://material-ui.com/components/drawers/',
              member: [require('../images/portfolio/work-1.jpg'),require('../images/portfolio/work-2.jpg')],
              Vote: true
            },
          ],     
        }  
    }

    getDb = async () => {
        await fetch('http://localhost:5000/api/schedule/getToDo', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
            })
            
        })
        .then(data => data.json())
        .then(data => data.data)
        .then(data => this.setState({ ...this.state, data}));
        // .then(data => setState(VRFrameData{ ...state, data }));
    };
    componentDidMount(){
        this.getDb();
    }
    // const classes = useStyles();
    render(){    
    return (
        <div>
            <MaterialTable
            title="Vote"
            columns={this.state.columns}
            data={this.state.data}
            onChange={() => this.getDb()}
            options={{
              actionsColumnIndex: -1
            }}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
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
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
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
export default VoteTable;
