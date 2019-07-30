var Indexer = artifacts.require('./Indexer.sol');
const truffleAssert = require('truffle-assertions');

contract('Indexer', function (accounts) {

    var indexer;

    var owner = accounts[0];

    beforeEach('instance for each test', async () => {
        indexer = await Indexer.new({ from: owner });
    });

    afterEach(async () => {
        await indexer.kill({ from: owner });
    });

    describe('add', function () {

        it('should not add a existing website', async () => {
            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2s';
            var tags = ['tag1'];
            var title = 'title1';
            var description = 'desc1';

            var tx = await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });

            truffleAssert.reverts(
                indexer.addWebSite(
                    hash,
                    tags,
                    title,
                    description,
                    { from: owner }),
                'website exists');
        });

        it('add a website', async () => {
            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2x';
            var tags = ['tag2'];
            var title = 'title2';
            var description = 'desc2';

            let tx = await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });

            truffleAssert.eventEmitted(tx, 'addWebSiteEvent');
        });
    });

    describe('get', function () {

        it('get a unexisting website by tag', async () => {

            var tags = ['unexistingTag'];

            var websites = await indexer.getWebSite(tags);

            assert.equal(websites.length, 15, 'the result must be 15 positions')
            assert.equal(websites[0], '', 'result must be empty');
        });

        it('get a website by tag', async () => {

            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2h';
            var tags = ['tag3'];
            var title = 'title3';
            var description = 'desc3';

            await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });

            var websites = await indexer.getWebSite(tags);

            assert.equal(websites.length, 15, 'the result must be 15 positions')
            assert.equal(websites[0].split(';')[0], hash, 'hash must be equal');
            assert.equal(websites[0].split(';')[1], title, 'hash must be equal');
            assert.equal(websites[0].split(';')[2], description, 'hash must be equal');
        });

        it('get a website by two different tags', async () => {

            var hashWebSite1 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u';
            var tagsWebSite1 = ['tag4', 'tag5'];
            var titleWebSite1 = 'title4';
            var descriptionWebSite1 = 'desc4';

            await indexer.addWebSite(
                hashWebSite1,
                tagsWebSite1,
                titleWebSite1,
                descriptionWebSite1,
                { from: owner });

            var websitesTwoTags1 = await indexer.getWebSite(['tag4']);
            var websitesTwoTags2 = await indexer.getWebSite(['tag5']);

            assert.equal(websitesTwoTags1.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTwoTags1[0].split(';')[0], hashWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags1[0].split(';')[1], titleWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags1[0].split(';')[2], descriptionWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags2.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTwoTags2[0].split(';')[0], hashWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags2[0].split(';')[1], titleWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags2[0].split(';')[2], descriptionWebSite1, 'hash must be equal');
        });
    });
});