/*
    Util class to encode and decode to BAse64.
*/
var Base64Util = function() {
};

/*
    * Parse given text to Base64.
*/
Base64Util.prototype.encodeText = function(str){
    var strArr = CryptoJS.enc.Utf8.parse(str);
    var result = CryptoJS.enc.Base64.stringify(strArr);
    return result;
}
/*
    * Decode given Base64 text to UTF8.
*/
Base64Util.prototype.decodeText = function(str){
    var strArr = CryptoJS.enc.Base64.parse(str);
    var result = strArr.toString(CryptoJS.enc.Utf8);
    return result;
}
