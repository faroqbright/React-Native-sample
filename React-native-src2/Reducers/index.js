import { combineReducers } from 'redux';

import loginReducers from './loginReducers';
import signUpReducers from './signUpReducers';
import maahirSignUpReducers from './maahirSignUpReducers';
import landingReducers from './landingReducers';
import serviceReducers from './serviceReducers';
import forgotReducers from './forgotReducers';
import resetPasswordReducers from './resetPasswordReducers';
import serviceByLocationReducers from './serviceByLocationReducers';
import maahirDetailReducers from './maahirDetailReducers'
import maahirAppointmentDetailReducers from './maahirAppointmentDetailReducers'
export default combineReducers({
    loginReducers: loginReducers,
    signUpReducers: signUpReducers,
    maahirSignUpReducers:maahirSignUpReducers,
    landingReducers:landingReducers,
    serviceReducers:serviceReducers,
    forgotReducers:forgotReducers,
    resetPasswordReducers:resetPasswordReducers,
    serviceByLocationReducers:serviceByLocationReducers,
    maahirDetailReducers:maahirDetailReducers,
    maahirAppointmentDetailReducers:maahirAppointmentDetailReducers
})