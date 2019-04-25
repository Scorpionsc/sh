import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalculatorScreen from '../components/CalculatorScreen';
import { refreshTreatments, addTreatments, updateBG} from '../../../store/treatments/actions';

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

const mergeTreatments = (treatments, treatmentsToAdd) => {

  if (treatmentsToAdd.length === 0) return treatments;
  return treatments.concat(treatmentsToAdd);

};

const mapStateToProps = (state) => {
  const treatments = mergeTreatments(state.treatments.data, state.treatments.toAdd);

  return ({
    user: state.userData.user,
    dishes: state.dishesData.dishes,
    products: state.productsData.products,
    speed: state.speedData.speed.common,
    bg: state.treatments.bg,
    treatments,
    treatmentsToAdd: state.treatments.toAdd,
    isTreatmentsRefresh: state.treatments.isRefresh,
    ...getRemains(state.speedData.speed.common, treatments),
  });
};


const mapActionsToProps = dispatch => ({
  refreshTreatments: bindActionCreators(refreshTreatments, dispatch),
  addTreatments: bindActionCreators(addTreatments, dispatch),
  updateBG: bindActionCreators(updateBG, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps, null, { withRef: true })(CalculatorScreen);
