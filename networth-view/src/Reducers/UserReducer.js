const saveUserDetailReducer = (state = '', action) => {
    switch(action.type) {
        case 'SAVE_USER_DETAIL':
            return action.payload;
        default:
            return state
    }
}

export default saveUserDetailReducer;