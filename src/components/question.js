import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

const paperStyle = {
  margin: 15,
  padding: 10,
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.value };

    this.checkBoxOnCheck = this.checkBoxOnCheck.bind(this);
  }

  checkBoxOnCheck(sindex) {
    if (this.props.callback) {
      this.props.callback(this.props.id, sindex);
    }
    this.setState({ selected: sindex });
  }

  render() {
    const selected = this.props.options.map((val, index) => ((index) === this.state.selected));
    return (
      <Paper zDepth={1} style={paperStyle}>
        <List>
          <h4>{this.props.question}</h4>
          {this.props.options.map((el, index) => (
            <ListItem
              primaryText={el}
              index={index}
              key={index}
              leftCheckbox={<Checkbox
                checked={selected[index]}
                onCheck={(obj, check) => {
                if (check) {
                  this.checkBoxOnCheck(index);
                }
              }}
              />}
            />
          ))}
          {this.props.child ? this.props.child : null}
        </List>
      </Paper>);
  }
}


export default Question;
