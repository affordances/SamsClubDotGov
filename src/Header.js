import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div className='header-and-searchbar-container'>
        <div className='header'>
          <div>
            <Link to='/'>
              <img src="/logo.png"
                   alt='logo' />
            </Link>
          </div>
            {this.props.loggedIn ? <Link to='/profile'>My profile</Link> : null}
            {this.props.loggedIn ? <div className='on-click-link' onClick={this.props.onLogout}>Sign out</div> :
                                   <Link to='/login'>Sign In</Link>}
            {this.props.loggedIn ? <Link to='/cart'>Cart</Link> : null}
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
