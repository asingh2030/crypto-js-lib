var base64Util = new Base64Util();
var aesUtil = new AesSymmetricKeyUtil(256, 1000);
var appKey = aesUtil.generateKey("password");

var pubKey ="-----BEGIN PUBLIC KEY-----";
    pubKey +="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhFCVJ8CqYv+c5NI7pV2lmR3vN";
    pubKey +="vLsEVcfiUCY7tPzcvX+YlYb9BeWXC23oAKWFzZmykB249sknGkDbugEVluAr6x98";
    pubKey +="Fzt4iSzPD/c6I3qUfU9oQI5dEXhx82rv07ygVJRiFvpNaUcG3Af+mpqh7HsYgkA5";
    pubKey +="IF8nSE2z7AelJ2nI+wIDAQAB";
    pubKey +="-----END PUBLIC KEY-----";
var rsaUtil = new RSA2AsymmetricKeyUtil(pubKey);
/*
    * Read the input, call encode method and set resultant output.
*/
function doEncode(){
    var txEncode = document.getElementById("txEncode");
    var resultEncode = document.getElementById("resultEncode");
    resultEncode.innerText = base64Util.encodeText(txEncode.value);
}
/*
    * Read the input, call decode method and set resultant output.
*/
function doDecode(){
    var txDecode = document.getElementById("txDecode");
    var resultDecode = document.getElementById("resultDecode");
    resultDecode.innerText = base64Util.decodeText(txDecode.value);
}
/*
    * read given input, call generate key method and set resultant output.
*/
function generateKey(){
    var appKey = aesUtil.generateKey("password");
    var resultEnc = document.getElementById("resultAppKey");
    resultEnc.innerText = appKey;
}
/*
    * Create AES encrypt of given text based on given appKey.
*/
function doAESEncrypt(){
    var textMessage = document.getElementById("textMsg");
    var appKey = document.getElementById("appKeyValue");
    var textMsgBase64 = base64Util.encodeText(textMessage.value);
    var ciphertext = aesUtil.encrypt(appKey.value, textMsgBase64);
    var resultEnc = document.getElementById("resultAESEncrypt");
    resultEnc.innerText = ciphertext;
}
/*
    * Read AES encrypted text and appKey and call AES decrypt method.
    * Set the resultant output.
*/
function doAESDecrypt(){
    var txAESKey = document.getElementById("txAESKey");
    var appKey = document.getElementById("appKeyValue");
    var originalText = aesUtil.decrypt(appKey.value, txAESKey.value);
    var resultDec = document.getElementById("resultAESDecrypt");
    resultDec.innerText = originalText;
}
/*
    * Read the given text and call RSA encryption.
    * Set the resultant output.
*/
function doRSAEnrypt(){
    var txAESKey = document.getElementById("textInputRSA");
    var ciphertext = rsaUtil.encrypt(txAESKey.value);
    var resultDec = document.getElementById("resultRSAEncrypt");
    resultDec.innerText = ciphertext;
}
/*
    * Read the given encypted text and call RSA decryption.
    * Set the resultant output.
*/
function doRSADecrypt(){
    var rsaEncyptedText = document.getElementById("resultRSAEncrypt");
    var originalText = rsaUtil.decrypt(rsaEncyptedText.innerText);
    var resultDec = document.getElementById("resultRSADecrypt");
    resultDec.innerText = originalText;
}