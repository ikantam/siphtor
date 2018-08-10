import { connect } from 'react-redux';
import definePasswordStrength from '../actions';
import { notify } from 'reapop';
import SignUp from '../pages/signUp';

const mapStateToProps = state => ({
  strength: state.define.strength,
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => { dispatch(definePasswordStrength(e.target.value)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

