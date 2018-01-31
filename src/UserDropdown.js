import React from 'react';
import './App.css';

import FontAwesome from 'react-fontawesome';
import DropdownMenu from 'react-dd-menu';

import { Link } from 'react-router-dom'

class UserDropdown extends React.Component {
  state = {
    isMenuOpen: false
  };

  toggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  close = () => {
    this.setState({
      isMenuOpen: false
    });
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <FontAwesome name='user' onClick={this.toggle} style={{
        color: '#5e5f60'
      }} size='2x'></FontAwesome>,
      textAlign: 'right',
      size: 'sm',
      animate: false
    };

    return (
      <DropdownMenu {...menuOptions}>
        <li><Link to='/profile'>My profile</Link></li>
        <li className='on-click-link' onClick={this.props.onLogout}>Sign out</li>
      </DropdownMenu>
      );
  }
}

export default UserDropdown;
