// Utilidad para ofuscar credenciales con XOR y base64
function xorEncryptToBase64(str, key) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

// Tus credenciales y clave
const apiKey = 'AIzaSyA8CdD8RP4HjD1zN00-qp3dxAD4OKzvWb4';
const clientId = '838075476269-oi80gmn3ej0f2trhpcqm4e9f4rqf8em8.apps.googleusercontent.com';
const xorKey = 'learnq2026';

console.log('API KEY XOR+BASE64:', xorEncryptToBase64(apiKey, xorKey));
console.log('CLIENT ID XOR+BASE64:', xorEncryptToBase64(clientId, xorKey));
