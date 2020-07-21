/*
    *   Util class to generate appKey and AES encryption and decryption.
    *   Salt is used when hashing, IV when encrypting.
    *   In both cases, the purpose is to prevent the same input from always resulting in the same output by adding a random input.
    *   If you see 'salt' in context of encryption, it probably means IV. If you see IV in context of hashing, it probably is the salt.
*/
var AESUtil = function(keySize) {
    this.keySize = 256;//256
    if(keySize){
        this.keySize = keySize;//256
    }
    this.ivSize = 128;
    this.iterations = 1000;
    this.base64Util = new Base64Util();
}
/*
 * Generate AES 256 key based on Given passphrase.
 * here random generated Salt is used to generate 256 hashing key.
*/
AESUtil.prototype.generateKey = function(){
    var salt = CryptoJS.lib.WordArray.random(this.ivSize/32);// salt, iv will be hex 8 in length
    var password = CryptoJS.lib.WordArray.random(this.ivSize/32);// random string treated as passphrase of length 8
    var randomStr = CryptoJS.lib.WordArray.random(this.ivSize/32);// random string treated as message of length 8
    var randomKey = CryptoJS.PBKDF2(password.toString(), salt, {
          keySize: this.keySize/32,
          iterations: this.iterations
        });
//    var encryptedKey = CryptoJS.AES.encrypt("randomStr", "randomKey", {
    var encryptedKey = CryptoJS.AES.encrypt("", randomKey, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });//Returns Base64 string
//    this.key = encryptedKey.toString(CryptoJS.enc.Base64);
    this.key = encryptedKey.toString();
    return this.key;
}
/*
    * Returns Base64 encrypted string
*/
AESUtil.prototype.encryptByAppKey = function(sek, appKey){
    var encryptedSek = CryptoJS.AES.encrypt(sek, appKey, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return decrypted.toString(CryptoJS.enc.Base64);
    return encryptedSek.toString();//Returns Base64 String
}

AESUtil.prototype.decryptBySymetricKey = function(encryptedSek, appKey){
//    var appKeyByteArr = CryptoJS.enc.Base64.parse(appKey);
    var appKeyByteArr = CryptoJS.enc.Utf8.parse(appKey);//Convert given appKey to word array
    var decrypted = CryptoJS.AES.decrypt(encryptedSek, appKeyByteArr, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });//Returns Hex decrypted String value
    var result = decrypted.toString(CryptoJS.enc.Base64);
    return result;
}
/*
    * Returns Base64 encrypted JSON value.
*/
AESUtil.prototype.encryptBySymmetricKey = function(json, decryptedSek){
    var sekByte = CryptoJS.enc.Base64.parse(decryptedSek);
    var encryptedJSON = CryptoJS.AES.encrypt(json, sekByte, {
//    var encryptedJSON = CryptoJS.AES.encrypt(json, decryptedSek, {
    //    iv: this.iv,
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return encryptedJSON.toString(CryptoJS.enc.Base64);
    return encryptedJSON.toString();
}
/*
    * Returns UTF8 String decrypted value.
*/
AESUtil.prototype.decryptDataBySymmentricKey = function(data, decryptedSek){
    var sekArr = CryptoJS.enc.Base64.parse(decryptedSek);
//    var dataArr = CryptoJS.enc.Base64.parse(data);
//    var decryptedData = CryptoJS.AES.decrypt(dataArr, sekArr, {
    var decryptedData = CryptoJS.AES.decrypt(data, sekArr, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedData.toString(CryptoJS.enc.Utf8);
}
