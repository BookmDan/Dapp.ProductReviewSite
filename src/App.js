// This code is part of the dApp Development tutorial 
//CS458-Summer 24, Dr. Lazrig

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ProductReviewCont_ABI, ProductReviewCont_ADDRESS } from './config'
//import ProductReviewContract from './contracts/ProductReview.json';

const App = () => {
  const [account, setAccount] = useState('');
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, []);

useEffect(() => {
    if (contract) {
      loadReviews();
    }
  }, [contract]);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[2])
    setAccount(accounts[2]);

    const networkId = await web3.eth.net.getId();
    const instance = new web3.eth.Contract(ProductReviewCont_ABI, ProductReviewCont_ADDRESS)
    
  

    //const deployedNetwork = ProductReviewContract.networks[networkId];
    //const instance = new web3.eth.Contract(
     // ProductReviewContract.abi,
     // deployedNetwork && deployedNetwork.address
    //);
    
    setContract(instance);

    const reviewsCount = await instance.methods.getReviewsCount().call();
    const reviewsArray = [];
    for (let i = 0; i < reviewsCount; i++) {
      const review = await instance.methods.getReview(i).call();
      reviewsArray.push(review);
    }
    setReviews(reviewsArray);
  };

  const addReview = async (event) => {
    event.preventDefault();
    if (contract && content) {
      await contract.methods.addReview(content).send({ from: account });
      setReviews([...reviews, { reviewer: account, content }]);
      setContent('');
    }
  };

 const loadReviews = async () => {
    if (contract) {
      const reviewsCount = await contract.methods.getReviewsCount().call();
      const reviewsArray = [];
      for (let i = 0; i < reviewsCount; i++) {
        const review = await contract.methods.getReview(i).call();
	console.log(review)
        //reviewsArray.push(review);
	 reviewsArray.push({ reviewer: review[0], content: review[1] });
      }
      setReviews(reviewsArray);
    }
  };


  return (
    <div>
      <h1>Product Reviews</h1>
      <p>Your Account: {account}</p>
      <form onSubmit={addReview}>
        <div>
          <label>Review Content</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <h2>All Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Reviewer: {review.reviewer}</p>
            <p>Content: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
