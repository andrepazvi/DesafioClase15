const url = require('url');
const path = require('path');

const __filename = url.fileURLToPath(import.meta.url);
const myDirname = path.dirname(__filename);

module.exports = { myDirname, uploader: null };
