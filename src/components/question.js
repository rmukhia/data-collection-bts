import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

import { addActionCreator } from '../actions/add-data';

const paperStyle = {
  margin: 15,
  padding: 10,
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: [] };

    this.checkBoxOnCheck = this.checkBoxOnCheck.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const len = nextProps.options.length;
    const selected = [];

    if (nextProps.selectedValue[nextProps.ident]) {
      for (let index = 0; index < len; index += 1) {
        if (index + 1 === nextProps.selectedValue[nextProps.ident]) {
          selected.push(true);
        } else { selected.push(false); }
      }
    }

    if (prevState.selected.lenth !== len) {
      for (let index = 0; index < len; index += 1) {
        selected.push(false);
      }
    }

    return { selected };
  }

  checkBoxOnCheck(sindex) {
    const len = this.state.selected.length;
    const selected = [];

    for (let index = 0; index < len; index += 1) {
      if (sindex === index) {
        selected.push(true);
      } else {
        selected.push(false);
      }
    }
    if (!_.isEqual(this.state.selected, selected)) {
      this.props.onSelect(this.props.ident, sindex + 1);
      this.setState({ selected });
    }
  }

  render() {
    return (
        <Paper zDepth={1} style={paperStyle}>
        <List>
          <Subheader>{this.props.question}</Subheader>
          {this.props.options.map((el, index) => (
            <ListItem
              primaryText={el}
              index={index}
              key={index}
              leftCheckbox={<Checkbox
                checked={this.state.selected[index]}
                onCheck={(obj, check) => {
                                if (check) {
                                    this.checkBoxOnCheck(index);
                                }
                            }}
              />}
            />
                ))}
        </List>
      </Paper>);
  }
}

const mapStateToProps = state => ({
  selectedValue: state.data,
});

const mapDispatchToProps = dispatch => ({
  onSelect: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
