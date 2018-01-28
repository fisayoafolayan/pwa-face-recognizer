import { REGISTER_USER } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            let finalData = {
                name: '',
                faceID: '',
                message: ''
            };

            if (action.payload.Errors) {
                finalData.message = 'error';
            } else if (action.payload.images['0'].transaction.status === 'success') {
                finalData.message = 'success';
            } else if (action.payload.images['0'].transaction.status === 'failure') {
                finalData.message = 'failure';
            }
            return finalData;
        default:
            return state;
    }
}