import multihashes = require('./index');

const encoded = multihashes.encode(Buffer.from('foo'), 'sha1');
const decoded = multihashes.decode(encoded);
const { code, name, digest, length } = decoded;
