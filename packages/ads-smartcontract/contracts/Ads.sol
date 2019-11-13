pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

//1. create campaign
//2. user follow campaign
//3. get campaign by tag
contract Ads {

    struct Campaign {
        uint id;
        address author;
        string name;
        string content;
        uint price;
        uint balance;
        string[] tags;
        bool active;
    }

    event CampaignCreated(
        uint _id,
        address indexed _author
    );

    event CampaignFollowed(
        uint _campaignId,
        address indexed follower
    );

    mapping (uint => Campaign) private campaigns;
    mapping (string => uint[]) private tags;
    mapping (address => uint[]) private following;


    uint nextCampaignId = 1;

    function createCampaign(
        string calldata _name,
        string calldata _content,
        uint _price,
        uint _balance,
        string[] calldata _tags
    ) external
    {
        string[] memory _tagsMemory = new string[](_tags.length);

        Campaign memory _campaign = Campaign(
            nextCampaignId,
            msg.sender,
            _name,
            _content,
            _price,
            _balance,
            _tagsMemory,
            true
        );

        campaigns[_campaign.id] = _campaign;

        for(uint i = 0; i < _tags.length; i++){
            tags[_tags[i]].push(_campaign.id);
        }

        emit CampaignCreated(
            _campaign.id,
            _campaign.author
        );

        nextCampaignId++;
    }

    function getRandomCampaignByTags(
        string[] calldata _tags
    ) external
      view
      returns(string memory _campaignName, string memory _campaignContent)
    {
        Campaign[] memory _campaignResult = new Campaign[](10);
        uint _campaignCount = 0;

        for(uint i = 0; i < _tags.length; i++){
            
            uint[] memory campaignIds = tags[_tags[i]];
            
            for(uint j = 0; j < campaignIds.length; j++){
                _campaignResult[_campaignCount] = campaigns[campaignIds[j]];
                _campaignCount++;
            }
        }

        //TO-DO get random campaign
    }

    function follow(
        uint _campaignId
    ) external
    {
        following[msg.sender].push(_campaignId);

        emit CampaignFollowed(
            _campaignId,
            msg.sender
        );
    }
}