artifacts.require('./StringUtils.sol');
const Indexer = artifacts.require('./Indexer.sol');
const truffleAssert = require('truffle-assertions');
const cuid = require('cuid');
const { keccak256 } = web3.utils;

function addWebSiteInSequence(indexer, data) {
  return data.reduce((acc, { hash, tags, title, description }) => {
    return acc.then(() => indexer.addWebSite(hash, tags, title, description));
  }, Promise.resolve());
}

contract('Indexer', accounts => {
  let indexer;

  const owner = accounts[0];
  const notTheOwner = accounts[1];

  beforeEach('instance for each test', async () => {
    indexer = await Indexer.new({ from: owner });
  });

  afterEach(async () => {
    await indexer.kill({ from: owner });
  });

  describe('add', () => {
    it('should not add a existing website', async () => {
      const hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2s';
      const tags = ['tag1'];
      const title = 'title1';
      const description = 'desc1';

      await indexer.addWebSite(hash, tags, title, description, {
        from: owner,
      });

      truffleAssert.fails(
        indexer.addWebSite(hash, tags, title, description, { from: owner }),
        'Website exists'
      );
    });

    it('add a website', async () => {
      const hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2x';
      const tags = ['tag2'];
      const title = 'title2';
      const description = 'desc2';

      const tx = await indexer.addWebSite(hash, tags, title, description, {
        from: owner,
      });

      truffleAssert.eventEmitted(tx, 'addWebSiteEvent');
    });
  });

  describe('get', () => {
    it('get a unexisting website by tag', async () => {
      const tags = ['unexistingTag'];

      const result = await indexer.getWebSite(tags, 1, 10);
      const websites = result[0];

      assert.equal(websites.length, 10, 'the result must be 10 positions');
      assert.equal(websites[0], '', 'result must be empty');
    });

    it('get a website by tag', async () => {
      const hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2h';
      const tags = ['tag3'];
      const title = 'title3';
      const description = 'desc3';

      await indexer.addWebSite(hash, tags, title, description, { from: owner });

      const result = await indexer.getWebSite(tags, 1, 10);
      const websites = result[0];

      assert.equal(websites.length, 10, 'the result must be 10 positions');
      assert.equal(websites[0].split(';')[0], hash, 'hash must be equal');
      assert.equal(websites[0].split(';')[1], title, 'title must be equal');
      assert.equal(
        websites[0].split(';')[2],
        description,
        'description must be equal'
      );
    });

    it('get websites by tag with pagination from a page in the middle of the range', async () => {
      const totalCount = 6;
      const pageSize = 2;
      const page = 2;
      const sliceStart = (page - 1) * pageSize;
      const sliceEnd = Math.min(sliceStart + pageSize, totalCount);

      const tags = ['tag1'];
      const data = Array(totalCount)
        .fill()
        .map(() => ({
          tags,
          hash: cuid(),
          title: 'Test',
          description: 'Test',
        }));

      await addWebSiteInSequence(indexer, data);

      const result = await indexer.getWebSite(tags, page, pageSize);
      const websites = result[0];

      const actualCount = result[1];
      const expectedCount = pageSize;
      const actualHashes = websites
        .map(payload => payload.split(';')[0])
        .filter(x => !!x);
      const expectedHashes = data
        .slice(sliceStart, sliceEnd)
        .map(({ hash }) => hash);

      assert.equal(
        websites.length,
        pageSize,
        `the result must be ${pageSize} positions`
      );
      assert.equal(actualCount, expectedCount);
      assert.deepEqual(actualHashes, expectedHashes);
    });

    it('get websites by tag with pagination from the last page', async () => {
      const totalCount = 6;
      const pageSize = 5;
      const page = 2;
      const sliceStart = (page - 1) * pageSize;
      const sliceEnd = Math.min(sliceStart + pageSize, totalCount);

      const tags = ['tag1'];
      const data = Array(6)
        .fill()
        .map(() => ({
          tags,
          hash: cuid(),
          title: 'Test',
          description: 'Test',
        }));

      await addWebSiteInSequence(indexer, data);

      const result = await indexer.getWebSite(tags, page, pageSize);

      const actualCount = result[1];
      const expectedCount = totalCount % pageSize;
      const websites = result[0];
      const actualHashes = websites
        .map(payload => payload.split(';')[0])
        .filter(x => !!x);
      const expectedHashes = data
        .slice(sliceStart, sliceEnd)
        .map(({ hash }) => hash);

      assert.equal(
        websites.length,
        pageSize,
        `the result must be ${pageSize} positions`
      );
      assert.equal(
        actualCount,
        expectedCount,
        `count should be ${expectedCount}`
      );
      assert.deepEqual(
        actualHashes,
        expectedHashes,
        'the returned hashes should be the ones from the 3rd page'
      );
    });

    it('get a website by two different tags', async () => {
      const expectedHash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u';
      const tagsWebSite1 = ['tag4', 'tag5'];
      const expectedTitle = 'title4';
      const expectedDescription = 'desc4';
      const page = 1;
      const pageSize = 10;

      await indexer.addWebSite(
        expectedHash,
        tagsWebSite1,
        expectedTitle,
        expectedDescription,
        { from: owner }
      );

      const websitesTwoTags1 = await indexer.getWebSite(
        ['tag4'],
        page,
        pageSize
      );
      const websitesTwoTags2 = await indexer.getWebSite(
        ['tag5'],
        page,
        pageSize
      );

      const [hash1, title1, description1] = websitesTwoTags1[0][0].split(';');
      const [hash2, title2, description2] = websitesTwoTags2[0][0].split(';');

      assert.equal(
        websitesTwoTags1[0].length,
        pageSize,
        `the result must be ${pageSize} positions`
      );
      assert.equal(hash1, expectedHash, 'hash must be equal');
      assert.equal(title1, expectedTitle, 'hash must be equal');
      assert.equal(description1, expectedDescription, 'hash must be equal');

      assert.equal(
        websitesTwoTags2[0].length,
        pageSize,
        `the result must be ${pageSize} positions`
      );
      assert.equal(hash2, expectedHash, 'hash must be equal');
      assert.equal(title2, expectedTitle, 'hash must be equal');
      assert.equal(description2, expectedDescription, 'hash must be equal');
    });
  });

  describe('append', () => {
    it('appends data of a previously inserted website', async () => {
      const initial = {
        storageHash: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
        tags: ['a tag', 'another tag'],
        title: 'Example title',
        description: 'Example description',
      };
      const appended = {
        title: 'Example title (changed)',
        description: 'Example description (changed)',
        tags: ['a tag', 'another tag', 'yet another one'],
      };

      await indexer.addWebSite(
        initial.storageHash,
        initial.tags,
        initial.title,
        initial.description,
        { from: owner }
      );

      const tx = await indexer.appendWebsite(
        initial.storageHash,
        appended.tags,
        appended.title,
        appended.description,
        { from: owner }
      );

      const {
        storageHash,
        tags,
        title,
        description,
      } = await indexer.getWebsiteByHash(initial.storageHash);
      const actual = { storageHash, tags, title, description };
      const expected = { storageHash: initial.storageHash, ...appended };

      assert.deepEqual(actual, expected);
      truffleAssert.eventEmitted(tx, 'WebsiteAppend', {
        storageHash: keccak256(storageHash),
      });
    });

    it('does not append the tags of a website if an empty array is passed', async () => {
      const initial = {
        storageHash: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
        tags: ['a tag', 'another tag'],
        title: 'Example title',
        description: 'Example description',
      };
      const appended = {
        title: 'Example title (changed)',
        description: 'Example description (changed)',
      };

      await indexer.addWebSite(
        initial.storageHash,
        initial.tags,
        initial.title,
        initial.description,
        { from: owner }
      );

      const tx = await indexer.appendWebsite(
        initial.storageHash,
        [],
        appended.title,
        appended.description,
        { from: owner }
      );

      const {
        storageHash,
        tags,
        title,
        description,
      } = await indexer.getWebsiteByHash(initial.storageHash);
      const actual = { storageHash, tags, title, description };
      const expected = {
        storageHash: initial.storageHash,
        tags: initial.tags,
        ...appended,
      };

      assert.deepEqual(actual, expected);
      truffleAssert.eventEmitted(tx, 'WebsiteAppend');
    });

    it('prevents a user who is not the owner of the website to append it', async () => {
      const initial = {
        storageHash: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
        tags: ['a tag', 'another tag'],
        title: 'Example title',
        description: 'Example description',
      };
      const appended = {
        title: 'Example title (changed)',
        tags: ['a tag', 'another tag', 'yet another one'],
        description: 'Example description (changed)',
      };

      await indexer.addWebSite(
        initial.storageHash,
        initial.tags,
        initial.title,
        initial.description,
        { from: owner }
      );

      truffleAssert.fails(
        indexer.appendWebsite(
          initial.storageHash,
          appended.tags,
          appended.title,
          appended.description,
          { from: notTheOwner }
        )
      );
    });
  });

  describe('burn', () => {
    it('does not return a burnt website in getWebSite results', async () => {
      const input = {
        storageHash: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
        tags: ['tag4', 'tag5'],
        title: 'title4',
        description: 'desc4',
      };
      const page = 1;
      const pageSize = 10;

      await indexer.addWebSite(
        input.storageHash,
        input.tags,
        input.title,
        input.description,
        { from: owner }
      );

      const tx = await indexer.burnWebsite(input.storageHash, { from: owner });

      const result = await indexer.getWebSite(['tag4'], page, pageSize);

      const actualCount = result[1].toNumber();
      const expectedCount = 0;

      assert.equal(actualCount, expectedCount);
      truffleAssert.eventEmitted(tx, 'WebsiteBurn', {
        storageHash: keccak256(input.storageHash),
      });
    });

    it('prevents a user who is not the owner of the website to delete it', async () => {
      const input = {
        storageHash: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
        tags: ['tag4', 'tag5'],
        title: 'title4',
        description: 'desc4',
      };

      await indexer.addWebSite(
        input.storageHash,
        input.tags,
        input.title,
        input.description,
        { from: owner }
      );

      truffleAssert.fails(
        indexer.burnWebsite(input.storageHash, { from: notTheOwner })
      );
    });
  });
});
