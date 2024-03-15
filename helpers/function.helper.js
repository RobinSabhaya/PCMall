const crypto = require("crypto");
/**
 * Encrypt the text
 * @param {String} text
 * @param {String} key
 * @returns {String}
 */
const encryptText = (text, key) => {
  const cipher = crypto.Cipher("aes-256-cbc", key);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

/**
 * Decrypt the text
 * @param {String} text
 * @param {String} key
 * @returns {String}
 */
const decryptText = (encryptText, key) => {
  decipher = crypto.Decipher("aes-256-cbc", key);
  let decryptedData = decipher.update(encryptText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};

module.exports = {
  encryptText,
  decryptText,
};
