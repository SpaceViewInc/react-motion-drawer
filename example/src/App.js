import Drawer from '../../lib/drawer.jsx';
import React, { Component } from 'react';

const style = {
  background: '#F9F9F9',
  boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px'
};

export default class App extends Component {
  state = {
    openLeft: false,
    openRight: false
  };

  render() {
    const { openLeft, openRight } = this.state;
    const drawerProps = {
      overlayColor: 'rgba(255,255,255,0.6)',
      drawerStyle: style
    };

    return (
      <div>
      <Drawer position={"bottom"} width={"100%"} height={300}  {...drawerProps} open={openLeft} onChange={open => this.setState({ openLeft: open})}>
      {val => {
        var per = val/ 300;
        return <div style={{ backgroundColor: `rgba(0, 184, 212, ${per})`, width: '100%', height: '100%' }} />;
        }
      }
         </Drawer>
      <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper cyan accent-4">
          <a href="#" className="brand-logo center">rm-drawer</a>
          <ul className="left">
            <li style={{ cursor: 'pointer', height: '100%' }}>
            <a style={{ padding: 15}} className='' onClick={()=>this.setState({openLeft: !openLeft})}>
              <i className="fa fa-bars"></i>
            </a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
      </div>
    );
  }
}
