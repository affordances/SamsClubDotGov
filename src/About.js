import React from 'react';
import './App.css';

class About extends React.Component {
  render() {
    return (
      <div className='about-container'>
        <div className='about-items-container'>
          <div className='about-header'>About</div>
          <div className='about-item'>Site by <a href="https://github.com/affordances">Gabriel Duquette</a>.</div>
          <div className='about-item'>{'"Top Hat"'} icon by <a href="https://thenounproject.com/search/?q=top%20hat&i=1102415">anbileru adaleru</a>, all other icons by <a href="https://thenounproject.com/vectorsmarket/collection/medical-line-icons/">Vectors Market</a>, via <a href="https://thenounproject.com/">the Noun Project</a>.</div>
        </div>
      </div>
    );
  }
}

export default About;
