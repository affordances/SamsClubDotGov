import React from 'react';
import './App.css';

import {
  Link,
} from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className='header'>
          <div>
            <Link to='/'>
              <img src="/logo.png" alt='logo' />
            </Link>
          </div>
          <div>
            <form>
              <input type='text' placeholder='Search' spellCheck='false'
              />
            </form>
          </div>
          <div>
            {this.props.loggedIn ? <Link to='/profile'>My profile</Link> : <div></div>}
          </div>
          <div>
            {this.props.loggedIn ? <div style = {{cursor:'pointer'}} onClick={this.props.onLogout}>Sign Out</div> :
                                   <Link to='/login'>Sign In</Link>}
          </div>
          <div>
            <Link to='/cart'>
              Cart
            </Link>
          </div>
        </div>
        <div className='navbar'>
          <div>Med 1</div>
          <div>Med 2</div>
          <div>Med 3</div>
          <div>Med 4</div>
          <div>Med 5</div>
          <div>Med 6</div>
        </div>
      </div>
    );
  }
}

export default Header;
