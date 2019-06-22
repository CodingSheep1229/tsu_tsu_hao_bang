import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';

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

  const updateDb = () => {
    console.log('11');
  }
export default function MaterialTableDemo() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Time', field: 'time', type: 'time'},
      { title: 'Itinerary', field: 'itinerary' },
      { title: 'Spending', field: 'spending', type: 'numeric' },
      {
        title: 'Remark',
        field: 'remark',
        // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { time: '10:00-11:00', itinerary: '起床', spending: 0, remark: '嘿嘿' },
      {
        time: '11:00-12:00',
        itinerary: '搭車',
        spending: 20,
        remark: '不能遲到喔',
      },
    ],
  });


  return (
    <MaterialTable
      title="Schedule"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {  
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
              
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
              console.log('2312');
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
