const networthReducer = (state=[], action) => {
    switch(action.type) {
        case 'SAVE_USER_NETWORTH':
            return [ ...action.payload ];
        default:
            return state;
    }
}

export default networthReducer;