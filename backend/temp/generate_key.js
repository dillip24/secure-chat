import crypto from 'crypto';

// Generate a new Elliptic Curve key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'prime256v1', // A standard, secure curve
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

console.log("--- 🔑 Private Key (Keep this secret!) ---");
console.log(privateKey);
console.log("\n--- 🔑 Public Key (Send this to the server) ---");
console.log(publicKey);