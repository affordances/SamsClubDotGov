import React from 'react';
import './App.css';
import UserDropdown from './UserDropdown.js';

import FontAwesome from 'react-fontawesome';
import NotificationBadge from 'react-notification-badge';

import {
  Link,
} from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div className='header-container'>
        <div className='header'>
          <div className='logo-and-searchbar-container'>
            <div className='logo'>
              <Link to='/'>
                {"Uncle Sam's Club"}
              </Link>
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

            {this.props.loggedIn ? <div className='cart-and-user-icon-container'>
                                    <Link to='/cart' style={{ display: 'inline-block', height: '45px', width: '44px', }}>
                                     <FontAwesome name='shopping-cart' style={{float:'left'}} size='2x'></FontAwesome>
                                       <NotificationBadge
                                         count={this.props.cart.length}
                                         effect={[null, null, {}, {}]}
                                       />
                                     </Link>
                                     <UserDropdown onLogout={this.props.onLogout} />
                                   </div>
                                  : <div className='sign-in-link'><Link to='/login'>Sign in</Link></div>}
      </div>

      </div>
    );
  }
}

export default Header;
