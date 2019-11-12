import multibase = require('./index');

const m = multibase('foo', Buffer.from('foo'));

const code: multibase.Base | undefined = multibase.codes.foo;

const encoded: Buffer = multibase.encode('foo', Buffer.from('foo'));

let decoded: Buffer = multibase.decode('string');
decoded = multibase.decode(Buffer.from('string', 'utf8'));

const isEncoded: boolean = multibase.isEncoded(decoded);

const base: multibase.Base = multibase.getBase('x');
