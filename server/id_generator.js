function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const generate_id = () => (S4() + S4() + "-" + S4()).toLowerCase();


module.exports = generate_id;
