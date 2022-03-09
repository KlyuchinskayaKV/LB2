module.exports = task = (x) => new Promise((resolve, reject) => (x < 13 ? resolve('yes') : reject('no'))).catch((reason) => reason);
