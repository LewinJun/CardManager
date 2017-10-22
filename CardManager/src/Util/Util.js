const isEmpty = (content) => {
    if(content === undefined || content === null || content.length === 0){
        return true;
    }
    return false;
}
export default {
    isEmpty,
};