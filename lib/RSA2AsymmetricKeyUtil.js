/**
    * Utility to encrypt using RSA Asymmetric public key.
**/
var RSA2AsymmetricKeyUtil = function(publicKey) {
  this.publicKey = publicKey;
  this.privateKey = "-----BEGIN RSA PRIVATE KEY-----";
  this.privateKey +="MIICXgIBAAKBgQDhFCVJ8CqYv+c5NI7pV2lmR3vNvLsEVcfiUCY7tPzcvX+YlYb9";
  this.privateKey +="BeWXC23oAKWFzZmykB249sknGkDbugEVluAr6x98Fzt4iSzPD/c6I3qUfU9oQI5d";
  this.privateKey +="EXhx82rv07ygVJRiFvpNaUcG3Af+mpqh7HsYgkA5IF8nSE2z7AelJ2nI+wIDAQAB";
  this.privateKey +="AoGAP/uAFiKlmUKEMmjUb1Sf66lKclPCPhs8dQMfuz1Z3E4qJW/sLaUtfOCM37S/";
  this.privateKey +="WOf3VyFMsbXFvM3jvhKEGGUJWCoo3n4cnfHNuyb5LuWRRalvW9RY2NTlt68Kl5wW";
  this.privateKey +="L8/co9wsKjEoutjQ9sxdKOBsHobuAX7C4rBHcboN96tfmhECQQD6QJYIKCKfrty6";
  this.privateKey +="9/PzXOIKUchiTSxUsRXj1NyxkrF0N3lqnHm7Zx6W9vMAJirTP5WuuiQw1lUZ/J86";
  this.privateKey +="goP7iuG1AkEA5j+LvNwmXInVWxDyfkYpd2bBX5sR0rPIt2scTaTdLU7QbCq7VsUO";
  this.privateKey +="iCBp0qE+p7dAfxcL4iUtRQP29tXSeGtt7wJBAKGtuoC4lW3/RkJRUb3II42xOrov";
  this.privateKey +="y9VHt7HDY3YiJR3FfV8gixFFVSEJmQNepUpoCSeiwSEASGkKqkDd87E/EAUCQQCD";
  this.privateKey +="rxBSgW6HOmWF4dlukt4gZepurZex9BT1ohLb7VB6GztkwcPHSoiXHkKnroTREyOW";
  this.privateKey +="DC5FtpF/iVbzsTLgoECNAkEA0HpMMcv0JUsn1bEP+hnp0UwwKqmlvrgC7Byy/1s9";
  this.privateKey +="x60zWyk4oasyyxOyOkIsrUdSgb+BcMQHOgOlPJtFUfd1Tw==";
  this.privateKey +="-----END RSA PRIVATE KEY-----";
};
/**
    * takes appKey (Symmetric key and encrypt using Asymmetric public key.
    * JSEncrypt lib is used to read public key as Base64 and apply encryption.
**/
RSA2AsymmetricKeyUtil.prototype.encrypt = function(symmetricKey){
    // we create a new JSEncrypt object for rsa encryption
    var rsaEncrypt = new JSEncrypt();
    // we set the public key (which we passed into the function)
    rsaEncrypt.setPublicKey(this.publicKey);
    // now we encrypt the key & iv with our public key
    var encryptedText = rsaEncrypt.encrypt(symmetricKey);
    return encryptedText;
}

RSA2AsymmetricKeyUtil.prototype.decrypt = function(encryptedText){
    // we create a new JSEncrypt object for rsa encryption
    var rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPrivateKey(this.privateKey);
    // now we decrypt the text & iv with our private key
    var text = rsaEncrypt.decrypt(encryptedText);
    return text;
}

