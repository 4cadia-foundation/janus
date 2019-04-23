import HtmlData from '../../Domain/Entity/HtmlData';
import { AbstractValidator } from 'fluent-ts-validator';

export default class SpiderValidator extends AbstractValidator<HtmlData> {
  constructor() {
    super();

    this.validateIf((html) => html.Description)
      .isNotEmpty()
      .isNotNull()
      .withFailureMessage("Description can't be empty");

    this.validateIf((html) => html.Tags)
      .isNotNull()
      .withFailureMessage("Tags can't be empty");

    this.validateIf((html) => html.Title)
      .isNotEmpty()
      .isNotNull()
      .withFailureMessage("Title can't be empty");
  }

  public ValidateHtmlData(ipfsHtml: HtmlData) {
    return this.validate(ipfsHtml);
  }
}
