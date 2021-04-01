

export const strGen = function (len) {

    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

export const strComp = function(key1, key2) {

    let result = key1 + '-' + key2;

    return result;

}
