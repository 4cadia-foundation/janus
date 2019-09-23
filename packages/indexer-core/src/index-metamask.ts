import MetaMaskConnector from 'node-metamask';
import Options from './Domain/Pojo/Options';
import { Indexer, Spider } from './';
import Website from './Domain/Entity/Website';
import rfdc from 'rfdc';

import fs from 'fs';
import path from 'path';
import IndexRequest from './Domain/Entity/IndexRequest';
import { ContentType } from './Domain/Entity/ContentType';

const clone = rfdc();

const connector = new MetaMaskConnector({
  port: 3333,
});

// let spider = new Spider();
// let indexRequest = new IndexRequest();

// indexRequest.ContentType = ContentType.Zip;
// C:\Desenv\Atlas\Janus\janus.framework.indexer\dist\test\templates

// indexRequest.Content = path.resolve(__dirname, "../test/templates/template.zip");

// let result = spider.ExtractMetadataContent(indexRequest);

console.log(
  'Sign in transaction through metamask connector: http://localhost:3333'
);
connector.start().then(async () => {
  const indexer = new Indexer(connector.getProvider());
});
