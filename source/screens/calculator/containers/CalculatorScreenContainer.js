import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalculatorScreen from '../components/CalculatorScreen';
import { refreshTreatments } from '../../../store/treatments/actions';

const millisecondsToMinutes = time => time / 1000 / 60;

const calculateTotalRemain = (speed, items) => {
  const { total, top } = speed;
  const fallTime = total - top;
  const riseSquare = (top * top) / 2;
  const fallSquare = (top * fallTime) / 2;
  const totalSquare = riseSquare + fallSquare;
  const now = Date.now();

  return (items.reduce((accum, item) => {
    const minutesDif = millisecondsToMinutes(now - item.date);
    let timePercent = 1;

    if (minutesDif === top) {
      timePercent = (top / total);
    } else if (minutesDif < top) {
      const diffSquare = (minutesDif * minutesDif) / 2;
      timePercent = ((riseSquare - diffSquare) + fallSquare) / totalSquare;
    } else {
      const lastTime = total - minutesDif;
      const cathetus = (lastTime / fallTime) * top;
      const diffSquare = (lastTime * cathetus) / 2;
      timePercent = diffSquare / totalSquare;
    }

    return accum + (item.amount * timePercent);
  }, 0));
};

const getRemains = (speed, treatments) => {
  const { insulin: insulinSpeed, carbs: carbsSpeed } = speed;

  const insulinTreatments = treatments
    .filter(treatment => treatment.insulin > 0)
    .map(treatment => ({ date: treatment.timestamp, amount: treatment.insulin }));
  const carbsTreatments = treatments
    .filter(treatment => treatment.carbs > 0)
    .map(treatment => ({ date: treatment.timestamp, amount: treatment.carbs }));
  const iob = calculateTotalRemain(insulinSpeed, insulinTreatments);
  const iog = calculateTotalRemain(carbsSpeed, carbsTreatments);

  return {
    iob,
    iog,
  };
};

const mapStateToProps = state => ({
  user: state.userData.user,
  dishes: state.dishesData.dishes,
  products: state.productsData.products,
  speed: state.speedData.speed.common,
  bg: state.treatments.bg,
  treatments: state.treatments.data,
  isTreatmentsRefresh: state.treatments.isRefresh,
  ...getRemains(state.speedData.speed.common, state.treatments.data),
});


const mapActionsToProps = dispatch => ({
  refreshTreatments: bindActionCreators(refreshTreatments, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps, null, { withRef: true })(CalculatorScreen);
