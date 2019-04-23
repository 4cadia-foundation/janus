import { Readable as ReadableStream } from 'stream';
import ipfsFactory, * as ipfsNS from './';
import { CID } from './common';

const ipfs = ipfsFactory({});

let addResult = ipfs.add(Buffer.from('foo')); // $ExpectType Promise<ipfsNS.ipfs.AddResult>

// Add multiple files with descriptors
addResult = ipfs.add([{ path: '/tmp/foo', content: Buffer.from('foo') }]);

// Add readable stream
ipfs.addReadableStream(); // $ExpectType  ReadableStream

// Add from URL
const addFromUrlResult = ipfs.addFromURL('fooo');

// Get
ipfs.get('foo'); // $ExpectType Promise<ipfsNS.ipfs.FileDescriptor>

// List to readable stream
ipfs.lsReadableStream('./'); // $ExpectType ReadableStream

// Mutable file system
ipfs.files.cp('./foo', './bar', {}); // $ExpectType Promise<void>

// Dag
ipfs.dag.get('foo'); // $ExpectType Promise<ipfsNS.dag.GetResult>

// Object
ipfs.object.new(); // $ExpectType Promise<CID>

ipfs.object.patch.rmLink('foo', { name: 'bar' }); // $ExpectType Promise<CID>

ipfs.dag.get('foo'); // $ExpectType Promise<ipfsNS.dag.GetResult>
