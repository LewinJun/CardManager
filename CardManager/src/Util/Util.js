const isEmpty = (content) => {
    if(content === undefined || content === null || content.length === 0){
        return true;
    }
    return false;
}
const getImgUrl = (url) => {
    if(url.indexOf('http')<0){
        return 'http://weiyuntest-1253191691.image.myqcloud.com/'+url;
    }
    return url; 
}
export default {
    isEmpty,
    getImgUrl,
};