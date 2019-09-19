pragma solidity >= 0.5.7 < 0.6.0;
pragma experimental ABIEncoderV2;

import './StringUtils.sol';

contract Indexer {
    struct Website{
        string storageHash;
        string title;
        string description;
        string[] tags;
        address owner;
        bool visible;
    }

    address payable private contractOwner;
    Website[] private websites;
    mapping(string => uint) hashToIndex;
    mapping(string => uint[]) tagToIndexes;
    mapping(address => uint[]) addrToIndexes;

    event addWebSiteEvent(string[] tags);
    event WebsiteAppend(string indexed storageHash, string[] tags, string tile, string description);
    event WebsiteBurn(string indexed storageHash);

    modifier onlyExistingWebsite(string memory storageHash) {
        require(websiteExists(storageHash), 'Website does not exist');
        _;
    }

    modifier onlyWebsiteOwner(string memory storageHash) {
        uint index = hashToIndex[storageHash];
        require(msg.sender == websites[index].owner, 'Not authorized');
        _;
    }

    constructor() public {
        contractOwner = msg.sender;
    }

    function kill() external {
        require(msg.sender == contractOwner, 'Only the contract owner can kill this contract');
        selfdestruct(contractOwner);
    }

    function websiteExists(string memory storageHash) public view returns (bool) {
        if(websites.length == 0){
            return false;
        }

        return StringUtils.equal(websites[hashToIndex[storageHash]].storageHash, storageHash);
    }

    function addWebSite(
        string memory storageHash,
        string[] memory tags,
        string memory title,
        string memory description
    )
        public
    {
        require(!websiteExists(storageHash), 'Website exists');

        Website memory newWebsite = Website({
            storageHash: storageHash,
            title: title,
            description: description,
            tags: tags,
            owner: msg.sender,
            visible: true
        });

        uint index = websites.push(newWebsite) - 1;

        hashToIndex[storageHash] = index;

        for(uint i = 0; i < tags.length; i++){
            tagToIndexes[tags[i]].push(index);
        }

        addrToIndexes[msg.sender].push(index);

        emit addWebSiteEvent(tags);
    }

    function appendWebsite(
        string memory storageHash,
        string[] memory tags,
        string memory title,
        string memory description
    )
        public
        onlyExistingWebsite(storageHash)
        onlyWebsiteOwner(storageHash)
    {
        uint index = hashToIndex[storageHash];

        if(!StringUtils.equal(title, websites[index].title))
            websites[index].title = title;

        if(!StringUtils.equal(description, websites[index].description))
            websites[index].description = description;

        if(tags.length > 0)
            websites[index].tags = tags;

        emit WebsiteAppend(storageHash, tags, title, description);
    }

    function burnWebsite(string memory storageHash)
        public
        onlyExistingWebsite(storageHash)
        onlyWebsiteOwner(storageHash)
    {
        uint index = hashToIndex[storageHash];

        Website storage website = websites[index];
        website.visible = false;

        emit WebsiteBurn(website.storageHash);
    }

    function getWebSite(
        string[] memory tags,
        uint pageNumber,
        uint pageSize
    )
        public view
        returns (string[] memory, uint)
    {
        uint foundItemsCount = 0;
        uint returnedItemsCount = 0;
        string[] memory returnedItems = new string[](pageSize);

        for (uint tagsCount = 0; tagsCount < tags.length; tagsCount++) {
            uint[] storage websitesOfTag = tagToIndexes[tags[tagsCount]];
            for (uint siteIndexCount = 0; siteIndexCount < websitesOfTag.length; siteIndexCount++) {
                uint currentPage = (foundItemsCount / pageSize) + 1;
                if (currentPage > pageNumber) {
                    break;
                }

                Website memory website = websites[websitesOfTag[siteIndexCount]];

                if (website.visible) {
                    foundItemsCount++;

                    if (currentPage == pageNumber) {
                        returnedItems[returnedItemsCount] = StringUtils.concat3(
                            website.storageHash,
                            website.title,
                            website.description,
                            ';'
                        );
                        returnedItemsCount++;
                    }
                }

                if (returnedItemsCount == pageSize) {
                    break;
                }
            }

            if (returnedItemsCount == pageSize) {
                break;
            }
        }

        return (returnedItems, returnedItemsCount);
    }

    function getWebsiteByHash(string memory storageHash)
        public view
        onlyExistingWebsite(storageHash)
        returns (Website memory)
    {
        uint index = hashToIndex[storageHash];
        return websites[index];
    }

    function getAllWebsitesByOwner()
        public view
        returns (Website[] memory)
    {
        uint[] memory indexes = addrToIndexes[msg.sender];

        Website[] memory results = new Website[](indexes.length);

        for(uint i = 0; i < indexes.length; i++){
            results[i] = websites[indexes[i]];
        }

        return results;
    }
}