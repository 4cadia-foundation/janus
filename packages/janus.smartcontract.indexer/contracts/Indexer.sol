pragma solidity >=0.4.21 < 0.6.0;
pragma experimental ABIEncoderV2;

contract Indexer{

    struct WebSite{
        string storageHash;
        string tag;
        string title;
        string description;
    }

    mapping(string => WebSite[]) websites;

    event addWebSiteEvent(string _tag);

    function addWebSite (
        string memory _storageHash, 
        string memory _tag, 
        string memory _title, 
        string memory _description) public {

        websites[_tag].push(WebSite({
            storageHash: _storageHash,
            tag: _tag,
            title: _title,
            description: _description
        }));

        emit addWebSiteEvent(_tag);
    }

    function getWebSite(string memory _tag) 
        public 
        view 
        returns(string[] memory, string[] memory, string[] memory, string[] memory){
        
        string[] memory storageHashs;
        string[] memory tags;
        string[] memory titles;
        string[] memory descriptions;

        WebSite[] storage webSites = websites[_tag];
        
        for(uint i = 0; i < webSites.length; i++){
            WebSite storage site = webSites[i];
            storageHashs[i] = site.storageHash;
            tags[i] = site.tag;
            titles[i] = site.title;
            descriptions[i] = site.description;
        }

        return (storageHashs, tags, titles, descriptions);
    }
}