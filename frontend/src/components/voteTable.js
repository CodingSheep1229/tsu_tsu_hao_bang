import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import { url } from '../url'
import './table.css';
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
class VoteTable extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
         token : localStorage.getItem('token'),
         columns : [
            { title: 'Subject', field: 'subject' },
            { title: 'Description', field: 'description'},
            { title: 'Member', field: 'member', type:'list',editable: 'never',
            render: rowData => rowData == null ? <p></p> : rowData.member.map((m) => <p> {m}</p>) 
            },
            { title: 'Vote', field: 'ischeck',type: 'boolean',editable: 'onUpdate',
              render: rowData => <Checkbox checked={rowData == null ? 
                false : rowData.member == [] ? false : 
                rowData.member.includes(localStorage.getItem('user'))} 
                onChange={(e) => {
                  const present_user = localStorage.getItem('user')
                  if(rowData != null){
                    var finish = false
                    const update_member = rowData.member
                    for(var i=0;i<rowData.member.length & finish === false;i++){
                      if(present_user === rowData.member[i]){
                        update_member.splice(i, 1); 
                        rowData.member.splice(i,1)
                        finish = true
                        console.log(finish)
                        break;
                      }
                    }
                    if (finish == false){
                      update_member.push(present_user)
                    }
                    const data = [...this.state.data.data];
                    const newData = {
                      "member":update_member,
                      "_id":rowData._id,
                      "description":rowData.description,
                      "subject":rowData.subject,
                    }
                    data[data.indexOf(rowData)] = newData;
                    console.log(data)
                    this.setState({ data: {...this.state.data, data: data}});
                    const allData = {
                      "_id":this.state.data._id,
                      "data":data,
                      "title":this.state.data.title
                    }
                    console.log(allData)
                    // this.setState({data: allData})
                    
                    // console.log('newData:',newData)
                    // this.setState({polled: '1213'})
                    this.UpdateVote(allData)
                    setTimeout(() => window.location.reload(),100)
                  }}}/>
            },
            
          ],

          data:{
          } ,
          polled:false,   
        }  
    }
    // checked = (rowData) => {
    //   // console.log("inside")
    //   // event.preventDefau
    //   }
      
      
      // this.props.history.push('/vote')

    // }
    UpdateVote = async (newData) => {
      let data = newData;
      await fetch(url + '/api/vote/updateVote', {
          method: 'post',
          body: JSON.stringify({
            data
        }),
        headers: new Headers({
            'Authorization': 'Token ' + this.state.token, 
            'Content-Type': 'application/json',
        })
      })
      .then(res => { return res.json() })
      .then(res => {
          if(res.success){

          }
          else
              alert('Fail.');
      })
      .catch((err) => console.error(err));
    }
    componentDidMount(){
        var data = this.props.table
        this.setState({data:data})
    }
    
    
    render(){
    return (
        <div className = "materialTable" >
          <br/><br/>
            <MaterialTable className = "table"
              title={
              <CssTextField
                variant="outlined"
                value = {this.state.data.title}
                style={this.margin}
                onChange = {async e => {
                await this.setState({ data:{...this.state.data, title: e.target.value}});
                this.UpdateVote(this.state.data)
                }
                }/>     
              }

              // title={this.state.polled}
            columns={this.state.columns}
            data={this.state.data.data}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: '#ffff',
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
                      "member":[],
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
