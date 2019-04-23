var Indexer = artifacts.require('./Indexer.sol');

contract('Indexer', function(accounts){
    var owner = accounts[0];
    var indexerInstance;
    
    var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t';
    var tag = 'test';
    var title = 'test app';
    var description = 'description test';

    it('Add a website', function(){
        return Indexer.deployed().then(function(instance){
            indexerInstance = instance;
            return indexerInstance.addWebSite(
                hash,
                tag,
                title,
                description, 
                { from: owner });
        }).then(function(event){
            assert.equal(event.logs.length, 1, 'an event was triggered');
            assert.equal(event.logs[0].event, 'addWebSiteEvent', 'the event type is correct');
            assert.equal(event.logs[0].args._tag, tag, 'the tag is correct');
        });
    });

    it('Get a website', function(){
        return Indexer.deployed().then(function(instance){
            indexerInstance = instance;
            return indexerInstance.getWebSite(tag)
        }).then(function(result){
            assert.equal(result[0], hash);
            assert.equal(result[1], tag);
            assert.equal(result[2], title);
            assert.equal(result[3], description);
        });
    });
});