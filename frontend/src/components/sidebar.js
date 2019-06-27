// import React, { Component } from 'react';
// import MaterialTable from 'material-table';
// var Parent = React.createClass({
//     getInitialState: function(){
//       return {sidebarOpen: false};
//     },
//     handleViewSidebar: function(){
//         this.setState({sidebarOpen: !this.state.sidebarOpen});
//     },
//     render: function() {
//       return (
//         <div>
//           <Header onClick={this.handleViewSidebar} />
//           <SideBar isOpen={this.state.sidebarOpen} />
//           <Content isOpen={this.state.sidebarOpen} />
//         </div>
//       );
//     }
//   });
  
//   var Header = React.createClass({
//     render: function() {
//       return (
//         <header>
//             <a href="javascript:;" onClick={this.props.onClick}>Click Me!</a>
//           </header>
//       );
//     }
//   });
//   var SideBar = React.createClass({
//     render: function() {
//       var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
//       return (
//         <div className={sidebarClass}>
//             <div>I slide into view</div>
//                   <div>Me too!</div>
//             <div>Meee Threeeee!</div>        
//           </div>
//       );
//     }
//   });
  
//   class Content extends React.Component {
//     constructor(props) {
//       super(props);
//     }
//     render() {
//       var contentClass = this.props.isOpen ? 'content open' : 'content';
//       return (
//         <div className={contentClass}>I am content fill me up!</div>
//       );
//     }
//   };
// export default Parent;