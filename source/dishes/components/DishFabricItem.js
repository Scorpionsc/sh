import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';
import TextField from '../../textField/TextField';

const styles = StyleSheet.create({
  productFabricItem: {
    flex: 1,
    backgroundColor: palette.color3,
  },
  productFabricItemFirst: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
});

class DishFabricItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,

    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
  };

  state = {
    fieldRef: React.createRef(),
  };

  onSubmitEditing = (val) => {
    const { onSubmitEditing, index } = this.props;
    onSubmitEditing(this.validateVal(val), index);
  };

  onChangeText = (val) => {
    const { onChangeText, index } = this.props;

    onChangeText(this.validateVal(val), index);
  };

  validateVal = (val) => {
    const number = Number(val);
    return Number.isNaN(number) ? 0 : number;
  };

  render() {
    const { title, weight, index } = this.props;
    const { fieldRef } = this.state;
    const style = !index ? styles.productFabricItemFirst : null;

    return (
      <TextField
        style={style}
        label={title}
        keyboardType={'number-pad'}
        ref={fieldRef}
        required={true}
        value={weight.toString()}
        onSubmitEditing={this.onSubmitEditing}
        onChangeText={this.onChangeText}/>
    );
  }
}

export default DishFabricItem;
