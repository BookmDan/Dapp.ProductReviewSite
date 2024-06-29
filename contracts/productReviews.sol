// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductReviews {
    struct Review {
        address reviewer;
        string content;
    }

    struct Product {
        string name;
        Review[] reviews;
    }

    Review[] public reviews;

    mapping(uint => Product) public products;
    uint public productCount;

    function addProduct(string memory _name) public {
        productCount++;
        products[productCount] = Product(_name, new Review[](0));
    }


    function addReview(string memory _content) public {
        reviews.push(Review(msg.sender, _content));
    }

    function getReview(uint _index) public view returns (address, string memory) {
        require(_index < reviews.length, "Review index out of bounds.");
        Review storage review = reviews[_index];
        return (review.reviewer, review.content);
    }

    function getReviewsCount() public view returns (uint) {
        return reviews.length;
    }
}

