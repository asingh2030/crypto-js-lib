/**
    * Utility to encrypt using RSA Asymmetric public key.
**/
var RSA2AsymmetricKeyUtil = function(publicKey) {
  this.publicKey = publicKey;
};
/**
    * takes appKey (Symmetric key) and encrypt using Asymmetric public key.
    * JSEncrypt lib is used to read public key as Base64 and apply encryption.
**/
RSA2AsymmetricKeyUtil.prototype.encrypt = function(symmetricKey){
    // create a new JSEncrypt object for rsa encryption
    var rsaEncrypt = new JSEncryptUtil();
    // set the public key (which we passed into the function)
    rsaEncrypt.setPublicKey(this.publicKey);
    // now encrypt the key & iv with our public key
    var encryptedText = rsaEncrypt.encrypt(symmetricKey);
    return encryptedText;
}
/**
    * takes encrypted appKey  and decrypt using Asymmetric private key.
    * JSEncrypt lib is used to read private key as Base64 and apply decryption.
    * This method only used for testing purpose because we don't know about private key.
**/
RSA2AsymmetricKeyUtil.prototype.decrypt = function(encryptedText, privateKey){
    // create a new JSEncrypt object for rsa encryption
    var rsaEncrypt = new JSEncryptUtil();
    rsaEncrypt.setPrivateKey(privateKey);
    // now decrypt the text & iv with our private key
    var text = rsaEncrypt.decrypt(encryptedText);
    return text;
}

