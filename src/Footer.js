import React from 'react';
import './App.css';

import FontAwesome from 'react-fontawesome';

import {
  Link,
} from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-container'>
        <div className='company-masthead-container'>
          <div className='company-name-and-icon-container'>
            <div className='hat-icon'
              style={{mask: 'url(/hat.svg) no-repeat center',
                      WebkitMask: 'url(/hat.svg) no-repeat center'}}>
            </div>
            <div>{"Uncle Sam's Club"}</div>
          </div>
          <div className='phone-container'><FontAwesome name='phone' style={{ width: '30px', marginRight: '8px', textAlign: 'center'}}></FontAwesome>1-800-CALL-SAM</div>
          <div className='email-container'><FontAwesome name='envelope'style={{ width: '30px', marginRight: '8px', textAlign: 'center'}}></FontAwesome>help@samsclub.gov</div>
          <div className='company-masthead-item'>© 2018 {"Uncle Sam's Club."}</div>
          <div className='company-masthead-item'>All rights reserved.</div>
        </div>
        <div className='footer-menus-container'>
          <div className='footer-menu'>
            <div className='footer-menu-header'>Company</div>
            <div className='footer-menu-item'>About</div>
            <div className='footer-menu-item'>Careers</div>
            <div className='footer-menu-item'>Contact us</div>
            <div className='footer-menu-item'>Press</div>
          </div>
          <div className='footer-menu'>
            <div className='footer-menu-header'>Social</div>
            <div className='footer-menu-item'>Facebook</div>
            <div className='footer-menu-item'>Twitter</div>
            <div className='footer-menu-item'>Instagram</div>
          </div>
          <div className='footer-menu'>
            <div className='footer-menu-header'>Legal</div>
            <div className='footer-menu-item'>Terms of Use</div>
            <div className='footer-menu-item'>Privacy Policy</div>
            <div className='footer-menu-item'>HIPAA</div>
            <div className='footer-menu-item'>Nondiscrimination</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
