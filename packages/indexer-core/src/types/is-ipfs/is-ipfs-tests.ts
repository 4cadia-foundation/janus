import CID = require('cids');
import Multiaddr = require('multiaddr');
import isIPFS = require('./index');

isIPFS.multihash('bar'); // $ExpectType boolean

isIPFS.cid('fooo'); // $ExpectType boolean
isIPFS.cid(new CID('foo')); // $ExpectType boolean

isIPFS.base32Cid('foo'); // $ExpectType boolean

isIPFS.multiaddr('foo'); // $ExpectType boolean
isIPFS.multiaddr(Buffer.from('foo')); // $ExpectType boolean
isIPFS.multiaddr(new Multiaddr(Buffer.from('foo'))); // $ExpectType boolean

isIPFS.peerMultiaddr('foo'); // $ExpectType boolean
isIPFS.peerMultiaddr(Buffer.from('foo')); // $ExpectType boolean
isIPFS.peerMultiaddr(new Multiaddr(Buffer.from('foo'))); // $ExpectType boolean
