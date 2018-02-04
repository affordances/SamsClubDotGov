import React from 'react';
import './App.css';

import Autocomplete from 'react-autocomplete';
import FontAwesome from 'react-fontawesome';

class Search extends React.Component {
  state = {
    value: ''
  }

  render() {
    console.log(this.props.products);
    return (
      <div className='searchbar'>
        <Autocomplete
          getItemValue={(item) => item.name}
            items={this.props.products}

          shouldItemRender={(item, string) =>
            string.length > 0 && item.name.toLowerCase().indexOf(string.toLowerCase()) !== -1
          }

          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
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
        />
      </div>
    )
  }
}

export default Search;
