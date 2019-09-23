import { IpfsPath, NodeCallback, CID } from '../common';

export interface GetResult {
  value: unknown;
  remainderPath: string;
}

export interface GetOptions {
  localResolve: boolean;
}

export type PutOptions =
  | CID
  | {
      format: string;
      hashAlg: string;
    };

export interface TreeOptions {
  recursive: true;
}

export interface Dag {
  get(
    cid: IpfsPath,
    pathOrOptions?: string | Partial<GetOptions>
  ): Promise<GetResult>;
  get(cid: IpfsPath, callback: Promise<GetResult>): void;
  get(
    cid: IpfsPath,
    pathOrOptions: string | Partial<GetOptions>,
    callback: Promise<GetResult>
  ): void;
  get(
    cid: IpfsPath,
    path: string,
    options: Partial<GetOptions>,
    callback: Promise<GetResult>
  ): void;

  put(dagNode: any, options?: Partial<PutOptions>): Promise<CID>;
  put(dagNode: any, callback: NodeCallback<CID>): void;
  put(
    dagNode: any,
    options: Partial<PutOptions>,
    callback: NodeCallback<CID>
  ): void;

  tree(
    cid: IpfsPath,
    pathOrOptions?: string | Partial<TreeOptions>
  ): Promise<string[]>;
  tree(
    cid: IpfsPath,
    path: string,
    options?: Partial<TreeOptions>
  ): Promise<string[]>;
  tree(cid: IpfsPath, callback: NodeCallback<string[]>): void;
  tree(
    cid: IpfsPath,
    pathOrOptions: string | Partial<TreeOptions>,
    callback: NodeCallback<string[]>
  ): void;
  tree(
    cid: IpfsPath,
    path: string,
    options: Partial<TreeOptions>,
    callback: NodeCallback<string[]>
  ): void;
}
