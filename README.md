# crypto-js-lib
Java script lib to perform AES and RSA encryption / decryption.

## Symmetric and Asymmetric Key
Symmetric encryption uses a single key that needs to be shared among the people who need to receive the message.
while asymmetrical encryption uses a pair of public key and a private key to encrypt and decrypt messages when communicating. 
Asymmetric encryption takes relatively more time than the symmetric encryption.

    1) Symmetric Algorithms that use the same key for both encryption and decryption. 
    2) Asymmetric Algorithms that use different keys for encryption and decryption. 

If a symmetric algorithm is chosen, both the sender and the receiver must have the same key.
Many commercial and government entities rely on the National Institute of Standards and Technology (NIST) – a non-regulatory US agency – for recommendations on strong cryptography.
NIST specifies three asymmetric algorithms: RSA, DSA and ECDSA. ECDSA is a relative new comer, so the two common asymmetric algorithms are RSA and DSA. 
RSA is often a preferred commercial algorithm because the standard easily allows for larger key size.
In 2001, NIST selected the Rijndael algorithm as its preferred symmetric algorithm to replace its aging DES (Data Encryption Standard).

Here’s a summary our problem:

    1. Asymmetric Keys are easy to exchange securely, but have a limited message size.
    2. Symmetric Keys have an unlimited message size, but are difficult to exchange securely.

Solution:

    The solution to the problem is to encrypt the message with a symmetric key, then asymmetrically encrypt the key and attach it to the message.
    The receiver extracts the encrypted symmetric key, asymmetrically decrypts it, and then uses it to decrypt the rest of the message.

    Encryption -
        
        1) The receiver generates a key pair and transmits their public key to the sender.
        2) The sender generates a random symmetric key and uses it to encrypt the large message.
        3) The sender encrypts the message with the symmetric key.
        4) The sender encrypts the symmetric key with the receiver’s public key.
        5) The sender concatenates the encrypted symmetric key and the encrypted message.
        6) The sender transmits the encrypted message to the receiver.
    
    Decryption -
    After the receiver gets the message, they will reverse the process:
        1. The receiver extracts the encrypted symmetric key from the message.
        2. The receiver decrypts the symmetric key using their private key.
        3. The receiver decrypts the message with the symmetric key.

Salt and IV -

    Salt - is used when hashing, IV when encrypting. In both cases, the purpose is to prevent the same input from always resulting in the same output by adding a random input. 
    If you see 'salt' in context of encryption, it probably means IV. If you see IV in context of hashing, it probably is the salt.

## Testing Guide
Please refer index.html to understand how to call lib methods.
*   JQuery - is used to manipulate html DOM objects.  
*   Asymmetric RSA256 keys generation, openssl is used:
*       //Generate a 2048 bit RSA Key 
        openssl genrsa -des3 -out private.pem 2048
        // Export the RSA Public Key to a File, Don't add passphrase
        openssl rsa -in private.pem -outform PEM -pubout -out public.pem
        //can be view using  cat command
        cat jwtRS256.key
        cat jwtRS256.key.pub


## Reference library
### Crypto-js:
https://code.google.com/archive/p/crypto-js/
### Js-encrypt:
https://github.com/travist/jsencrypt
