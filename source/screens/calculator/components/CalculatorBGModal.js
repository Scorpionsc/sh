import React from 'react';
import {
  StyleSheet, View, Modal, TouchableHighlight, Text, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import TextField from '../../../share/textField/TextField';

const styles = StyleSheet.create({
  calculatorBGModal: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    alignSelf: 'stretch',
    margin: 20,
  },
  textField: {
    borderTopWidth: 1,
  },
  buttons: {
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: 40,
    backgroundColor: palette.color4,
    lineHeight: 40,
    paddingRight: 20,
    paddingLeft: 20,
  },
});

class CalculatorBGModal extends React.Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,

    closeModal: PropTypes.func.isRequired,
    saveBg: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  closeModal = () => {
    this.props.closeModal();
  };

  saveBg = () => {
    const { value } = this.state;
    const convert = 18.0182;
    const isNumber = !Number.isNaN(window.parseInt(value));

    if (isNumber) {
      const bg = value < 40 ? value * convert : value;
      this.props.saveBg({
        date: Date.now(),
        sgv: window.parseInt(bg),
      });
    } else {
      this.props.saveBg(null);
    }
  };

  onValChange = (text) => {
    this.setState({
      value: text,
    });
  };


  render() {
    const { modalVisible } = this.props;
    const { value } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({
            value: '',
          });
        }}>
        <SafeAreaView style={styles.calculatorBGModal}>
          <View style={styles.control}>
            <TextField
              style={styles.textField}
              label={'Set current BG:'}
              keyboardType={'decimal-pad'}
              value={value}
              onChangeText={this.onValChange}/>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={this.closeModal}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.saveBg}>
              <Text style={styles.button}>Set</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default CalculatorBGModal;
