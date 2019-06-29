import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { slide as Menu } from 'react-burger-menu'
import { withStyles} from '@material-ui/core/styles';
import { url, styles } from '../url'
import './table.css';
// const random_img = [require('../images/portfolio/work-1.jpg'),require('../images/portfolio/work-2.jpg')]
const token = localStorage.getItem('token')
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
            { title: 'Member', field: 'member', type:'list' 
              // render: rowData => 
            },
            { title: 'Vote', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck}/>
            },
          ],
          data:{
            // p_id:'jjj',
            // title:'nnnnn',
            // data : {
            //   "_id":this.state.data.data._id,
            //   "subject":this.state.data.data.subject,
            //   "description":this.state.data.data.description,
            //   "member":this.state.data.data.memeber,
            //   "ischeck":false
            // },
          }    
        }  
    }
    checked = (member) => {
      var data = []
      console.log(this.state.data.data)
      const num = this.state.data.data.length
      console.log(num)
      for(var i=0; i < num;i++){
        const user = localStorage.getItem('user')
        var ischeck = true
        // console.log(member)
        const mem_num = this.state.data.data[i].member.length
        console.log(mem_num)
        for (var m = 0; m < mem_num; m++){
          if (user === this.state.data.data[i].member[m]){
            ischeck = true
          } 
        }
        var temp = {
          "_id":this.state.data.data[i]._id,
          "subject":this.state.data.data[i].subject,
          "description":this.state.data.data[i].description,
          "member":this.state.data.data[i].member,
          "ischeck":ischeck
        }
        data.push(temp)
        // console.log("hhh")
        // console.log(data)
      }
      return data
    }
    checking = (rowId) => {
      

    }
    UpdateVote = async (newData) => {
      let data = newData;
      await fetch(url + '/api/vote/updateVote', {
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
    async componentDidMount(){
        var data = this.props.table
        await this.setState({data:data})
        console.log(this.state.data)
        const newData = await this.checked()
        console.log(newData)
        await this.setState({ data:{...this.state.data, data: newData}});
        console.log(this.state.data)
        // await this.setState({data:data})
        // console.log(this.state.data)
    }
    
    render(){
    return (
        <div>
            <MaterialTable className = "table"
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
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: '#6abe83',
                color: 'rgba(53,75,94)'
              }
            }}
            actions={[
              {
                icon: 'delete',
                tooltip: 'delte table',
                isFreeAction: true,
                onClick: () => {
                  this.props.deleteTable(this.state.data)
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
                    newData = {
                      "_id":String(Date.now()),
                      "description":newData.description,
                      "member":newData.member,
                      "subject":newData.subject,
                    }
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
                    console.log("here")
                    console.log(newData)
                    const allData = {
                      "_id":this.state.data._id,
                      "data":data,
                      "title":this.state.data.title
                    }
                    console.log(data)
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
