export default class RequestResult {
  public TxHash?: string;
  public Result: object[] = [];
  public Errors: string[] = [];
  public Success = false;

  constructor(txHash?: string) {
    this.TxHash = txHash;
  }
}
