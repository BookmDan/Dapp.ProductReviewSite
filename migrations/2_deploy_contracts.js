var ProductReviews = artifacts.require("./productReviews.sol");

module.exports = function(deployer) {
    deployer.deploy(ProductReviews);
}