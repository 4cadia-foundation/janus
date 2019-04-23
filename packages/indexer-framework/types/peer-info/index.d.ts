// Type definitions for peer-info 0.16
// Project: https://github.com/libp2p/js-peer-info
// Definitions by: Henrique Barcelos <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import PeerId = require("peer-id");
import Multiaddr = require("multiaddr");

export = PeerInfo;

declare class PeerInfo {
  id: PeerId;
  multiaddrs: PeerInfo.MultiaddrSet;
  protocols: Set<string>;

  static create(peerId?: PeerId | PeerId.SerializedPeerId): Promise<PeerInfo>;
  static isPeerInfo(peerInfo: any): boolean;

  constructor(peerId?: PeerId);
  connect(multiaddr: PeerInfo.MultiaddrConvertible): void;
  disconnect(): void;
  isConnected(): boolean;
}

declare namespace PeerInfo {
  type MultisetAddrIteratorCallback<T> = (m: Multiaddr) => T;

  type MultiaddrConvertible = Multiaddr | Buffer | string;

  class MultiaddrSet {
    size: number;

    constructor(addrs: MultiaddrConvertible[]);

    add(addr: MultiaddrConvertible): void;
    addSafe(addr: MultiaddrConvertible): void;
    addSafe(addr: MultiaddrConvertible): void;
    toArray(): MultiaddrConvertible[];
    forEach(fn: MultisetAddrIteratorCallback<void>): void;
    filterBy(multiaddrFormat: string): MultiaddrConvertible[];
    has(multiaddr: MultiaddrConvertible): boolean;
    delete(multiaddr: MultiaddrConvertible): void;
    replace(existing: MultiaddrConvertible, fresh: MultiaddrConvertible): void;
    clear(): void;
    distinct(): Multiaddr[];
  }
}
