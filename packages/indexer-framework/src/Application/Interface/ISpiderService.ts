import IndexRequest from '../../Domain/Entity/IndexRequest';
import ResumeIndexRequest from '../../Domain/Entity/ResumeIndexRequest';

export default interface ISpiderService {
  AddContent(indexRequest: IndexRequest, callback: any): void;
  ExtractResumeIndexRequest(
    indexRequest: IndexRequest
  ): Promise<ResumeIndexRequest>;
}
