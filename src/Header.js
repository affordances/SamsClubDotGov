import React from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';

import {
  Link,
} from 'react-router-dom'

// <FontAwesome name='fa-shopping-cart' size='2x' />

class Header extends React.Component {
  render() {
    return (
      <div className='header-and-searchbar-container'>
        <div className='header'>
          <div className='logo'>
            <Link to='/'>
              Uncle Sam's Club
            </Link>
          </div>
            {this.props.loggedIn ? <Link to='/profile'>My profile</Link> : null}
            {this.props.loggedIn ? <Link to='/cart'><FontAwesome name='shopping-cart' size='2x'></FontAwesome></Link> : null}
            {this.props.loggedIn ? <div className='on-click-link' onClick={this.props.onLogout}>Sign out</div> :
                                   <Link to='/login'>Sign in</Link>}
        </div>
        <div className='searchbar'>
          <form>
            <input type='text'
                   placeholder='Search'
                   spellCheck='false'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
