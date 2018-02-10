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
        color: '#5e5f60',
        cursor: 'pointer'
      }} size='2x'></FontAwesome>,
      animate: false,
      align: 'right',
      textAlign: 'center',
      size: 'sm'
    };

    return (
      <DropdownMenu {...menuOptions}>
        <li><Link to='/profile' className='on-click-link'>My profile</Link></li>
        <li><div className='on-click-link' onClick={this.props.onLogout}>Sign out</div></li>
      </DropdownMenu>
      );
  }
}

export default UserDropdown;
