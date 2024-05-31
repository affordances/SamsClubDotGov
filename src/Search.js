import React from "react";
import "./App.css";

import Autocomplete from "react-autocomplete";
import { withRouter } from "react-router";

class Search extends React.Component {
  state = {
    value: "",
  };

  goToProductPage = () => {
    const product = this.props.products.find(
      (x) => x.name === this.state.value
    );
    this.props.history.push("/product/" + product.id);
  };

  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.goToProductPage}>
          <Autocomplete
            getItemValue={(item) => item.name}
            items={this.props.products}
            shouldItemRender={(item, string) =>
              string.length > 0 &&
              item.name.toLowerCase().indexOf(string.toLowerCase()) !== -1
            }
            renderItem={(item, isHighlighted) => (
              <div
                style={{
                  background: isHighlighted ? "#fafafa" : "white",
                  padding: "10px",
                  color: "#555555",
                  cursor: "pointer",
                }}
              >
                {item.name}
              </div>
            )}
            renderMenu={(items, value) => {
              const style = {
                borderBottom: "2px solid #5e5f60",
                borderRight: "2px solid #5e5f60",
                borderLeft: "2px solid #5e5f60",
                position: "absolute",
                width: "300px",
                zIndex: "2",
                marginLeft: "-2px",
                marginTop: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              };
              const styleNoBorder = { border: "none" };
              return (
                <div
                  style={items.length === 0 ? styleNoBorder : style}
                  children={items}
                />
              );
            }}
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onSelect={(val) => this.setState({ value: val })}
            inputProps={{
              type: "text",
              placeholder: "Search",
              spellCheck: "false",
            }}
            wrapperStyle={{}}
          />
        </form>
      </div>
    );
  }
}

Search = withRouter(Search);

export default Search;
