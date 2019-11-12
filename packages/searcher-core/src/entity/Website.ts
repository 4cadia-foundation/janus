export default class Website {
  public storageHash: string;
  public title: string;
  public description: string;
  public tld: string;
  public domain: string;

  constructor(
    storageHash: string,
    title: string,
    description: string,
    tld: string,
    domain: string
  ) {
    this.storageHash = storageHash;
    this.title = title;
    this.description = description;
    this.tld = tld;
    this.domain = domain;
  }
}
