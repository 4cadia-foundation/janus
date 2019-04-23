export default class RequestResult {
  public TxHash: string;
  public Result: object[] = [];
  public Errors: string[] = [];
  public Success = false;
}
