import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'light blue',
      },
    },
  },
})(TextField);
const style = {
  margin: '5px',
};
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
            { title: 'Description', field: 'description'},
            { title: 'Member', field: 'member', type:'list',
              // render: rowData =>  rowData.member.map((imag) => <img src={imag} style={{width: 50, height:50, borderRadius: '50%'}}/>) 
            },
            { title: 'Vote', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck} />
            },
          ],
          data:{

          }    
        }  
    }
    getData = () => {
      this.setState({data:this.props.table});
    }
    UpdateVote = async (newData) => {
      let data = newData;
      await fetch('http://192.168.43.245:5000/api/vote/updateVote', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QuY29tIiwiaWQiOiI1ZDBmNTFiYjc3YmZkZjFjMjliMzdiMDMiLCJleHAiOjE1NjY2NDA0MDAsImlhdCI6MTU2MTQ1NjQwMH0.cpk_f1MYsnh7A_fVvbR4divaORaxlPs3PKBRcN-hpw8', 
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
        this.getData();
    }
    // const classes = useStyles();
    render(){    
    return (
        <div>
            <MaterialTable
            title={<CssTextField
              variant="outlined"
              value = {this.state.data.title}
              style={this.margin}
              onChange = {async e => {
              await this.setState({ data:{...this.state.data, title: e.target.value}});
              this.UpdateVote(this.state.data)
             }
            }/>}
            columns={this.state.columns}
            data={this.state.data.data}
            options={{
              actionsColumnIndex: -1
            }}
            actions={[
              {
                icon: 'delete',
                tooltip: 'delte table',
                isFreeAction: true,
                onClick: () => {
                  this.props.deleteTable(this.state.data._id)
                  this.props.getTable()
                },
              }
            ]}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data.data];
                    data.push(newData);
                    const allData = {
                      "_id":this.state.data._id,
                      "data":data,
                      "title":this.state.data.title
                    }
                    this.UpdateVote(allData)
                    this.setState({data:allData});
                    }, 10);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data.data];
                    data[data.indexOf(oldData)] = newData;
                    const allData = {
                      "_id":this.state.data._id,
                      "data":data,
                      "title":this.state.data.title
                    }
                    this.UpdateVote(allData)
                    this.setState({data:allData});
                    }, 10);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data.data];
                    data.splice(data.indexOf(oldData), 1);
                    const allData = {
                      "_id":this.state.data._id,
                      "data":data,
                      "title":this.state.data.title
                    }
                    this.UpdateVote(allData)
                    console.log(allData)
                    this.setState({data:allData});
                    }, 10);
                    
                }),
            }}
            />
        </div>
    );
}
};
export default VoteTable;
