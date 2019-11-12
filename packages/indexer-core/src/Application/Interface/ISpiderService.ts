import IndexRequest from '../../Domain/Entity/IndexRequest';
import ResumeIndexRequest from '../../Domain/Entity/ResumeIndexRequest';

export default interface ISpiderService {
  addContent(indexRequest: IndexRequest, callback: any): void;
  extractResumeIndexRequest(
    indexRequest: IndexRequest
  ): Promise<ResumeIndexRequest>;
}
