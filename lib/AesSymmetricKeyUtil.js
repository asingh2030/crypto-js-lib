/*
    Util class to generate appKey and AES encryption and decryption.
*/
var AesSymmetricKeyUtil = function(keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
    this.iv = CryptoJS.lib.WordArray.random(keySize);//keySize = 256/32
    this.salt = CryptoJS.lib.WordArray.random(keySize);//keySize = 256/32
    this.options = { iv: this.iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
  };


/*
 * Generate AES 256 key based on Given passphrase.
 * here random generated Salt is used to generate 256 hashing key.
*/
AesSymmetricKeyUtil.prototype.generateKey = function(passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase,
      this.salt,
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
}

AesSymmetricKeyUtil.prototype.encrypt = function(appKey, base64Text) {
  var encrypted = CryptoJS.AES.encrypt(
      base64Text,
      appKey,
      this.options
     /* {
        iv: this.iv,
        mode : CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }*/);
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesSymmetricKeyUtil.prototype.decrypt = function(appKey, cipherText) {
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      appKey,
//      this.options
       {
          iv: this.iv,
          mode : CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
 /* Salt is used when hashing, IV when encrypting.
  * In both cases, the purpose is to prevent the same input from always resulting in the same output by adding a random input.
  * If you see 'salt' in context of encryption, it probably means IV. If you see IV in context of hashing, it probably is the salt.
 */
AesSymmetricKeyUtil.prototype.encryptWithSaltAndIV = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv),
        mode : CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesSymmetricKeyUtil.prototype.decryptWithSaltAndIV = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv),
        mode : CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7});
  return decrypted.toString(CryptoJS.enc.Utf8);
}
