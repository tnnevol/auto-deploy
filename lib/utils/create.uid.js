const { v4: uuidv4 } = require('uuid');
function createUid() {
  return uuidv4().replace(/-/g, '').slice(0, 16).toLocaleUpperCase();
}
module.exports = createUid
