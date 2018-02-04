import React from 'react';
import './App.css';

import Autocomplete from 'react-autocomplete';
import FontAwesome from 'react-fontawesome';

class Search extends React.Component {
  state = {
    value: ''
  }

  render() {
    return (
      <div className='searchbar'>
        <Autocomplete
          getItemValue={(item) => item.name}
            items={this.props.products}

          shouldItemRender={(item, string) =>
            string.length > 0 && item.name.toLowerCase().indexOf(string.toLowerCase()) !== -1
          }

          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? '#fafafa' : 'white',
                          padding: '10px',
                          color: '#555555',
                          cursor: 'pointer'
                       }}>
              {item.name}
            </div>
          }

          value={this.state.value}

          onChange={(e) =>
            this.setState({ value: e.target.value })
          }

          onSelect={(val) =>
            this.setState({ value: val })
          }

          menuStyle={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            background: 'rgba(255, 255, 255, 0.9)',
            position: 'fixed',
            paddingBottom: '0px',
            overflow: 'auto',
            input: { width: '100%' },
            borderBottom: '2px solid #5e5f60',
            borderRight: '2px solid #5e5f60',
            borderLeft: '2px solid #5e5f60',
          }}
        />
      </div>
    )
  }
}

export default Search;
