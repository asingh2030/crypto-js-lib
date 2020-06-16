/*
    *   Util class to generate appKey and AES encryption and decryption.
    *   Salt is used when hashing, IV when encrypting.
    *   In both cases, the purpose is to prevent the same input from always resulting in the same output by adding a random input.
    *   If you see 'salt' in context of encryption, it probably means IV. If you see IV in context of hashing, it probably is the salt.
*/
var AESUtil = function(keySize, password) {
    this.keySize = 256;//256
    if(keySize){
        this.keySize = keySize;//256
    }
    this.password = "password";
    if(password){
        this.password = password;
    }
    this.ivSize = 128;
    this.iterations = 100;
    this.salt = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length
    this.key = CryptoJS.PBKDF2(this.password, this.salt, {
          keySize: this.keySize/32,
          iterations: this.iterations
        });
//    this.iv = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length

}
/*
 * Generate AES 256 key based on Given passphrase.
 * here random generated Salt is used to generate 256 hashing key.
*/
AESUtil.prototype.generateKey = function(password){
    if(password){
        this.password = password;
        this.salt = CryptoJS.lib.WordArray.random(this.ivSize/8);// salt, iv will be hex 32 in length
        this.key = CryptoJS.PBKDF2(this.password, this.salt, {
              keySize: this.keySize/32,
              iterations: this.iterations
            });

    }
    return this.key;
}
/*
    * AES encryption based on generated key.
    * padding: CryptoJS.pad.Pkcs7,
    * mode : CryptoJS.mode.ECB
*/
AESUtil.prototype.encrypt = function(msg) {
  var encrypted = CryptoJS.AES.encrypt(msg, this.key, {
//    iv: this.iv,
    padding: CryptoJS.pad.Pkcs7,
    mode : CryptoJS.mode.ECB
  });
  
  return encrypted.toString();
}
/*
    * AES decryption based on generated key.
    * padding: CryptoJS.pad.Pkcs7,
    * mode : CryptoJS.mode.ECB
*/
AESUtil.prototype.decrypt = function(encryptedMsg) {
  var decrypted = CryptoJS.AES.decrypt(encryptedMsg, this.key, {
//    iv: this.iv,
    padding: CryptoJS.pad.Pkcs7,
    mode : CryptoJS.mode.ECB
  })
  return decrypted;
}

