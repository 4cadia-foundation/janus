// Type definitions for cids 0.7
// Project: https://github.com/multiformats/js-cid#readme
// Definitions by: Henrique Barcelos <https://github.com/hbarcelos> and Victor Santana <https://github.com/victorSantana09>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
export = CID;

declare class CID {
    constructor(version: string, codec: CID.Codec, multihash: Buffer, multibaseName?: string);
    constructor(cidStr: string);
    constructor(b58EncodedStr: string);
    constructor(cidBuf: Buffer);
    constructor(multihash: Buffer);
    constructor(cid: CID);

    version: number;
    codec: CID.Codec;
    multihash: Buffer;
    multibaseName: string;
    buffer: Buffer;
    prefix: Buffer;

    toV0(): CID;

    toV1(): CID;

    toBaseEncodedString(base?: string): string;

    toString(base: string): string;

    toJSON(): CID.SerlializedCID;

    equals(other: any): boolean;

    static isCID(obj: any): boolean;

    static validateCID(other: any): void | never;
}

declare namespace CID {
    interface SerlializedCID {
        codec: string;
        version: number;
        multihash: Buffer;
    }

    type Codec = keyof typeof CID.codecs;

    const codecs: {
        bencode: Buffer;
        'bitcoin-block': Buffer;
        'bitcoin-tx': Buffer;
        'blake2b-104': Buffer;
        'blake2b-112': Buffer;
        'blake2b-120': Buffer;
        'blake2b-128': Buffer;
        'blake2b-136': Buffer;
        'blake2b-144': Buffer;
        'blake2b-152': Buffer;
        'blake2b-16': Buffer;
        'blake2b-160': Buffer;
        'blake2b-168': Buffer;
        'blake2b-176': Buffer;
        'blake2b-184': Buffer;
        'blake2b-192': Buffer;
        'blake2b-200': Buffer;
        'blake2b-208': Buffer;
        'blake2b-216': Buffer;
        'blake2b-224': Buffer;
        'blake2b-232': Buffer;
        'blake2b-24': Buffer;
        'blake2b-240': Buffer;
        'blake2b-248': Buffer;
        'blake2b-256': Buffer;
        'blake2b-264': Buffer;
        'blake2b-272': Buffer;
        'blake2b-280': Buffer;
        'blake2b-288': Buffer;
        'blake2b-296': Buffer;
        'blake2b-304': Buffer;
        'blake2b-312': Buffer;
        'blake2b-32': Buffer;
        'blake2b-320': Buffer;
        'blake2b-328': Buffer;
        'blake2b-336': Buffer;
        'blake2b-344': Buffer;
        'blake2b-352': Buffer;
        'blake2b-360': Buffer;
        'blake2b-368': Buffer;
        'blake2b-376': Buffer;
        'blake2b-384': Buffer;
        'blake2b-392': Buffer;
        'blake2b-40': Buffer;
        'blake2b-400': Buffer;
        'blake2b-408': Buffer;
        'blake2b-416': Buffer;
        'blake2b-424': Buffer;
        'blake2b-432': Buffer;
        'blake2b-440': Buffer;
        'blake2b-448': Buffer;
        'blake2b-456': Buffer;
        'blake2b-464': Buffer;
        'blake2b-472': Buffer;
        'blake2b-48': Buffer;
        'blake2b-480': Buffer;
        'blake2b-488': Buffer;
        'blake2b-496': Buffer;
        'blake2b-504': Buffer;
        'blake2b-512': Buffer;
        'blake2b-56': Buffer;
        'blake2b-64': Buffer;
        'blake2b-72': Buffer;
        'blake2b-8': Buffer;
        'blake2b-80': Buffer;
        'blake2b-88': Buffer;
        'blake2b-96': Buffer;
        'blake2s-104': Buffer;
        'blake2s-112': Buffer;
        'blake2s-120': Buffer;
        'blake2s-128': Buffer;
        'blake2s-136': Buffer;
        'blake2s-144': Buffer;
        'blake2s-152': Buffer;
        'blake2s-16': Buffer;
        'blake2s-160': Buffer;
        'blake2s-168': Buffer;
        'blake2s-176': Buffer;
        'blake2s-184': Buffer;
        'blake2s-192': Buffer;
        'blake2s-200': Buffer;
        'blake2s-208': Buffer;
        'blake2s-216': Buffer;
        'blake2s-224': Buffer;
        'blake2s-232': Buffer;
        'blake2s-24': Buffer;
        'blake2s-240': Buffer;
        'blake2s-248': Buffer;
        'blake2s-256': Buffer;
        'blake2s-32': Buffer;
        'blake2s-40': Buffer;
        'blake2s-48': Buffer;
        'blake2s-56': Buffer;
        'blake2s-64': Buffer;
        'blake2s-72': Buffer;
        'blake2s-8': Buffer;
        'blake2s-80': Buffer;
        'blake2s-88': Buffer;
        'blake2s-96': Buffer;
        bmt: Buffer;
        cbor: Buffer;
        'dag-cbor': Buffer;
        'dag-json': Buffer;
        'dag-pb': Buffer;
        'dash-block': Buffer;
        'dash-tx': Buffer;
        'dbl-sha2-256': Buffer;
        dccp: Buffer;
        'decred-block': Buffer;
        'decred-tx': Buffer;
        dns: Buffer;
        dns4: Buffer;
        dns6: Buffer;
        dnsaddr: Buffer;
        'ed25519-pub': Buffer;
        'eth-account-snapshot': Buffer;
        'eth-block': Buffer;
        'eth-block-list': Buffer;
        'eth-state-trie': Buffer;
        'eth-storage-trie': Buffer;
        'eth-tx': Buffer;
        'eth-tx-receipt': Buffer;
        'eth-tx-receipt-trie': Buffer;
        'eth-tx-trie': Buffer;
        garlic64: Buffer;
        'git-raw': Buffer;
        'holochain-adr-v0': Buffer;
        'holochain-adr-v1': Buffer;
        'holochain-key-v0': Buffer;
        'holochain-key-v1': Buffer;
        'holochain-sig-v0': Buffer;
        'holochain-sig-v1': Buffer;
        http: Buffer;
        https: Buffer;
        identity: Buffer;
        ip4: Buffer;
        ip6: Buffer;
        ip6zone: Buffer;
        ipfs: Buffer;
        'ipfs-ns': Buffer;
        'ipld-ns': Buffer;
        'keccak-224': Buffer;
        'keccak-256': Buffer;
        'keccak-384': Buffer;
        'keccak-512': Buffer;
        'leofcoin-block': Buffer;
        'leofcoin-pr': Buffer;
        'leofcoin-tx': Buffer;
        md4: Buffer;
        md5: Buffer;
        multiaddr: Buffer;
        multibase: Buffer;
        multicodec: Buffer;
        multihash: Buffer;
        'murmur3-128': Buffer;
        'murmur3-32': Buffer;
        onion: Buffer;
        onion3: Buffer;
        p2p: Buffer;
        'p2p-circuit': Buffer;
        'p2p-stardust': Buffer;
        'p2p-webrtc-direct': Buffer;
        'p2p-webrtc-star': Buffer;
        'p2p-websocket-star': Buffer;
        path: Buffer;
        protobuf: Buffer;
        quic: Buffer;
        raw: Buffer;
        rlp: Buffer;
        sctp: Buffer;
        sha1: Buffer;
        'sha2-256': Buffer;
        'sha2-512': Buffer;
        'sha3-224': Buffer;
        'sha3-256': Buffer;
        'sha3-384': Buffer;
        'sha3-512': Buffer;
        'shake-128': Buffer;
        'shake-256': Buffer;
        'skein1024-1000': Buffer;
        'skein1024-1008': Buffer;
        'skein1024-1016': Buffer;
        'skein1024-1024': Buffer;
        'skein1024-104': Buffer;
        'skein1024-112': Buffer;
        'skein1024-120': Buffer;
        'skein1024-128': Buffer;
        'skein1024-136': Buffer;
        'skein1024-144': Buffer;
        'skein1024-152': Buffer;
        'skein1024-16': Buffer;
        'skein1024-160': Buffer;
        'skein1024-168': Buffer;
        'skein1024-176': Buffer;
        'skein1024-184': Buffer;
        'skein1024-192': Buffer;
        'skein1024-200': Buffer;
        'skein1024-208': Buffer;
        'skein1024-216': Buffer;
        'skein1024-224': Buffer;
        'skein1024-232': Buffer;
        'skein1024-24': Buffer;
        'skein1024-240': Buffer;
        'skein1024-248': Buffer;
        'skein1024-256': Buffer;
        'skein1024-264': Buffer;
        'skein1024-272': Buffer;
        'skein1024-280': Buffer;
        'skein1024-288': Buffer;
        'skein1024-296': Buffer;
        'skein1024-304': Buffer;
        'skein1024-312': Buffer;
        'skein1024-32': Buffer;
        'skein1024-320': Buffer;
        'skein1024-328': Buffer;
        'skein1024-336': Buffer;
        'skein1024-344': Buffer;
        'skein1024-352': Buffer;
        'skein1024-360': Buffer;
        'skein1024-368': Buffer;
        'skein1024-376': Buffer;
        'skein1024-384': Buffer;
        'skein1024-392': Buffer;
        'skein1024-40': Buffer;
        'skein1024-400': Buffer;
        'skein1024-408': Buffer;
        'skein1024-416': Buffer;
        'skein1024-424': Buffer;
        'skein1024-432': Buffer;
        'skein1024-440': Buffer;
        'skein1024-448': Buffer;
        'skein1024-456': Buffer;
        'skein1024-464': Buffer;
        'skein1024-472': Buffer;
        'skein1024-48': Buffer;
        'skein1024-480': Buffer;
        'skein1024-488': Buffer;
        'skein1024-496': Buffer;
        'skein1024-504': Buffer;
        'skein1024-512': Buffer;
        'skein1024-520': Buffer;
        'skein1024-528': Buffer;
        'skein1024-536': Buffer;
        'skein1024-544': Buffer;
        'skein1024-552': Buffer;
        'skein1024-56': Buffer;
        'skein1024-560': Buffer;
        'skein1024-568': Buffer;
        'skein1024-576': Buffer;
        'skein1024-584': Buffer;
        'skein1024-592': Buffer;
        'skein1024-600': Buffer;
        'skein1024-608': Buffer;
        'skein1024-616': Buffer;
        'skein1024-624': Buffer;
        'skein1024-632': Buffer;
        'skein1024-64': Buffer;
        'skein1024-640': Buffer;
        'skein1024-648': Buffer;
        'skein1024-656': Buffer;
        'skein1024-664': Buffer;
        'skein1024-672': Buffer;
        'skein1024-680': Buffer;
        'skein1024-688': Buffer;
        'skein1024-696': Buffer;
        'skein1024-704': Buffer;
        'skein1024-712': Buffer;
        'skein1024-72': Buffer;
        'skein1024-720': Buffer;
        'skein1024-728': Buffer;
        'skein1024-736': Buffer;
        'skein1024-744': Buffer;
        'skein1024-752': Buffer;
        'skein1024-760': Buffer;
        'skein1024-768': Buffer;
        'skein1024-776': Buffer;
        'skein1024-784': Buffer;
        'skein1024-792': Buffer;
        'skein1024-8': Buffer;
        'skein1024-80': Buffer;
        'skein1024-800': Buffer;
        'skein1024-808': Buffer;
        'skein1024-816': Buffer;
        'skein1024-824': Buffer;
        'skein1024-832': Buffer;
        'skein1024-840': Buffer;
        'skein1024-848': Buffer;
        'skein1024-856': Buffer;
        'skein1024-864': Buffer;
        'skein1024-872': Buffer;
        'skein1024-88': Buffer;
        'skein1024-880': Buffer;
        'skein1024-888': Buffer;
        'skein1024-896': Buffer;
        'skein1024-904': Buffer;
        'skein1024-912': Buffer;
        'skein1024-920': Buffer;
        'skein1024-928': Buffer;
        'skein1024-936': Buffer;
        'skein1024-944': Buffer;
        'skein1024-952': Buffer;
        'skein1024-96': Buffer;
        'skein1024-960': Buffer;
        'skein1024-968': Buffer;
        'skein1024-976': Buffer;
        'skein1024-984': Buffer;
        'skein1024-992': Buffer;
        'skein256-104': Buffer;
        'skein256-112': Buffer;
        'skein256-120': Buffer;
        'skein256-128': Buffer;
        'skein256-136': Buffer;
        'skein256-144': Buffer;
        'skein256-152': Buffer;
        'skein256-16': Buffer;
        'skein256-160': Buffer;
        'skein256-168': Buffer;
        'skein256-176': Buffer;
        'skein256-184': Buffer;
        'skein256-192': Buffer;
        'skein256-200': Buffer;
        'skein256-208': Buffer;
        'skein256-216': Buffer;
        'skein256-224': Buffer;
        'skein256-232': Buffer;
        'skein256-24': Buffer;
        'skein256-240': Buffer;
        'skein256-248': Buffer;
        'skein256-256': Buffer;
        'skein256-32': Buffer;
        'skein256-40': Buffer;
        'skein256-48': Buffer;
        'skein256-56': Buffer;
        'skein256-64': Buffer;
        'skein256-72': Buffer;
        'skein256-8': Buffer;
        'skein256-80': Buffer;
        'skein256-88': Buffer;
        'skein256-96': Buffer;
        'skein512-104': Buffer;
        'skein512-112': Buffer;
        'skein512-120': Buffer;
        'skein512-128': Buffer;
        'skein512-136': Buffer;
        'skein512-144': Buffer;
        'skein512-152': Buffer;
        'skein512-16': Buffer;
        'skein512-160': Buffer;
        'skein512-168': Buffer;
        'skein512-176': Buffer;
        'skein512-184': Buffer;
        'skein512-192': Buffer;
        'skein512-200': Buffer;
        'skein512-208': Buffer;
        'skein512-216': Buffer;
        'skein512-224': Buffer;
        'skein512-232': Buffer;
        'skein512-24': Buffer;
        'skein512-240': Buffer;
        'skein512-248': Buffer;
        'skein512-256': Buffer;
        'skein512-264': Buffer;
        'skein512-272': Buffer;
        'skein512-280': Buffer;
        'skein512-288': Buffer;
        'skein512-296': Buffer;
        'skein512-304': Buffer;
        'skein512-312': Buffer;
        'skein512-32': Buffer;
        'skein512-320': Buffer;
        'skein512-328': Buffer;
        'skein512-336': Buffer;
        'skein512-344': Buffer;
        'skein512-352': Buffer;
        'skein512-360': Buffer;
        'skein512-368': Buffer;
        'skein512-376': Buffer;
        'skein512-384': Buffer;
        'skein512-392': Buffer;
        'skein512-40': Buffer;
        'skein512-400': Buffer;
        'skein512-408': Buffer;
        'skein512-416': Buffer;
        'skein512-424': Buffer;
        'skein512-432': Buffer;
        'skein512-440': Buffer;
        'skein512-448': Buffer;
        'skein512-456': Buffer;
        'skein512-464': Buffer;
        'skein512-472': Buffer;
        'skein512-48': Buffer;
        'skein512-480': Buffer;
        'skein512-488': Buffer;
        'skein512-496': Buffer;
        'skein512-504': Buffer;
        'skein512-512': Buffer;
        'skein512-56': Buffer;
        'skein512-64': Buffer;
        'skein512-72': Buffer;
        'skein512-8': Buffer;
        'skein512-80': Buffer;
        'skein512-88': Buffer;
        'skein512-96': Buffer;
        'stellar-block': Buffer;
        'stellar-tx': Buffer;
        'swarm-feed': Buffer;
        'swarm-manifest': Buffer;
        'swarm-ns': Buffer;
        tcp: Buffer;
        'torrent-file': Buffer;
        'torrent-info': Buffer;
        udp: Buffer;
        udt: Buffer;
        unix: Buffer;
        utp: Buffer;
        ws: Buffer;
        wss: Buffer;
        x11: Buffer;
        'zcash-block': Buffer;
        'zcash-tx': Buffer;
    };
}
