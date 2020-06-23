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
//    this.key=CryptoJS.lib.WordArray.random(ivSize/32);;
    /*this.salt = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length
    this.password = CryptoJS.lib.WordArray.random(this.ivSize/32);// password will be random string 8 in length
    this.key = CryptoJS.PBKDF2(this.password, this.salt, {
          keySize: this.keySize/32,
          iterations: this.iterations
        });*/
//    this.iv = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length
      this.base64Util = new Base64Util();
}
/*
 * Generate AES 256 key based on Given passphrase.
 * here random generated Salt is used to generate 256 hashing key.
*/
AESUtil.prototype.generateKey = function(){
    var salt = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length
    var password = CryptoJS.lib.WordArray.random(this.ivSize/32);// random string treated as passphrase of length 8
    var randomStr = CryptoJS.lib.WordArray.random(this.ivSize/32);// random string treated as message of length 8
//    console.log("AES salt - "+salt);
//    console.log("AES password - "+password);
//    console.log("AES random string - "+randomStr);
    var randomKey = CryptoJS.PBKDF2(password, salt, {
          keySize: this.keySize/32,
          iterations: this.iterations
        });
//     console.log("AES random key - "+randomKey);
    var encryptedKey = CryptoJS.AES.encrypt(randomStr, randomKey, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
    this.key = encryptedKey.toString();
//    console.log("AES appKey - "+this.key);
    return this.key;
}

AESUtil.prototype.decryptBySymetricKey = function(encryptedSek, appKey){
    var decrypted = CryptoJS.AES.decrypt(encryptedSek, appKey, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return decrypted.toString(CryptoJS.enc.Base64);
    console.log("Decrypted SEK - "+decrypted);
    return decrypted.toString();
}

AESUtil.prototype.encryptBySymmetricKey = function(json, decryptedSek){
//    var sekByte = CryptoJS.enc.Base64.parse(decryptedSek);
//    var encryptedJSON = CryptoJS.AES.encrypt(json, sekByte, {
    var encryptedJSON = CryptoJS.AES.encrypt(json, decryptedSek, {
    //    iv: this.iv,
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return encryptedJSON.toString(CryptoJS.enc.Base64);
    return encryptedJSON.toString();
}

AESUtil.prototype.decryptDataBySymmentricKey = function(data, decryptedSek){
//    var sekArr = CryptoJS.enc.Base64.parse(decryptedSek);
//    var dataArr = CryptoJS.enc.Base64.parse(data);
//    var decryptedData = CryptoJS.AES.decrypt(dataArr, sekArr, {
    var decryptedData = CryptoJS.AES.decrypt(data, decryptedSek, {
        padding: CryptoJS.pad.Pkcs7,
        mode : CryptoJS.mode.ECB
      });
//    return decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedData.toString();
}

/*
    * AES encryption based on generated key.
    * padding: CryptoJS.pad.Pkcs7,
    * mode : CryptoJS.mode.ECB
*/
/*AESUtil.prototype.encrypt = function(msg) {
  var encrypted = CryptoJS.AES.encrypt(msg, this.key, {
//    iv: this.iv,
    padding: CryptoJS.pad.Pkcs7,
    mode : CryptoJS.mode.ECB
  });
  
  return encrypted.toString();
}
*//*
    * AES decryption based on generated key.
    * padding: CryptoJS.pad.Pkcs7,
    * mode : CryptoJS.mode.ECB
*//*
AESUtil.prototype.decrypt = function(encryptedMsg) {
  var decrypted = CryptoJS.AES.decrypt(encryptedMsg, this.key, {
//    iv: this.iv,
    padding: CryptoJS.pad.Pkcs7,
    mode : CryptoJS.mode.ECB
  });
  return decrypted;
}*/

