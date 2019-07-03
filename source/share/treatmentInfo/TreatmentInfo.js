import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';

const styles = StyleSheet.create({
  treatmentInfo: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bg: {
    color: palette.color2,
    fontSize: 40,
  },
  additional: {
    color: palette.color2,
    fontSize: 14,
  },
});

class TreatmentInfo extends React.Component {
  static propTypes = {
    bg: PropTypes.object,
    iob: PropTypes.number.isRequired,
    iog: PropTypes.number.isRequired,

    onSetBG: PropTypes.func.isRequired,
  };

  static defaultProps = {
    bg: null,
  };

  millisecondsToMinutes = time => time / 1000 / 60;

  setBG = () => {
    const { onSetBG } = this.props;
    onSetBG();
  };

  renderBG = () => {
    const { bg } = this.props;
    const convert = 18.0182;

    return bg
      ? (<TouchableWithoutFeedback onPress={this.setBG}>
          <Text style={styles.bg}>{(this.props.bg.sgv / convert).toFixed(1)}</Text>
      </TouchableWithoutFeedback>)
      : (<TouchableWithoutFeedback onPress={this.setBG}>
        <Text style={styles.bg}>--</Text>
      </TouchableWithoutFeedback>);
  };

  renderBGUpdatedDiff = () => {
    const { millisecondsToMinutes, props } = this;
    const { bg } = props;
    let timeDiff = '--';

    if (bg !== null) {
      const dateNow = Date.now();

      timeDiff = Math.round(millisecondsToMinutes(dateNow - bg.date));
    }


    return <Text style={styles.additional}>{timeDiff} minutes ago</Text>;
  };

  renderTreatment = () => {
    const { iob, iog } = this.props;

    return (
      <Text style={styles.additional}>
        Iob: {iob.toFixed(2)} :: IoG: {iog.toFixed(2)}
      </Text>
    );
  };

  render() {
    const { renderBG, renderBGUpdatedDiff, renderTreatment } = this;

    return (
      <View style={styles.treatmentInfo}>
        <View>
          {renderBG()}
        </View>
        <View>
          {renderBGUpdatedDiff()}
          {renderTreatment()}
        </View>
      </View>
    );
  }
}

export default TreatmentInfo;
