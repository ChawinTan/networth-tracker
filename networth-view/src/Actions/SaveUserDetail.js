export function saveUserDetail(email) {
    return {
        type: 'SAVE_USER_DETAIL',
        payload: email
    };
}