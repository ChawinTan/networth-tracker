export function saveUserNetworth(networth) {
    return {
        type: 'SAVE_USER_NETWORTH',
        payload: networth
    }
}