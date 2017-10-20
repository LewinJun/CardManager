const GetUrl = (url) => {
    if(url.indexOf('http')>=0){
        return url;
    }else{
        return 'http://wwk.weiyunshidai.com/api/'+url;
    }
}
export default GetUrl;