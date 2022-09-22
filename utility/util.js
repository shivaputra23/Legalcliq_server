function renamekey(obj, oldkey, newkey) {
  obj[newkey] = obj[oldkey];
  delete obj[oldkey];
}

module.exports = { renamekey };
