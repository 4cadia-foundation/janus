export default class Website {
  id?: number;
  storageHash: string;
  title: string;
  description: string;
  tags: string[];
  owner?: string;

  constructor(
    storageHash: string,
    title: string,
    description: string,
    tags: string[],
    id?: number,
    owner?: string
  ) {
    this.id = id;
    this.storageHash = storageHash;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.owner = owner;
  }
}
