"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));

    if (productDetails) {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json()) 
            .then(jsonData => {
                const product = jsonData.find(item => item.title === productDetails.name); 
                if (product) {
                    document.querySelector('.detail-img').src = product.image; 
                }
            })
            .catch(error => console.error('Error fetching data:', error));

        document.querySelector('.detail-name').innerText = productDetails.name;
        document.querySelector('.detail-price').innerText = `$${productDetails.price}`;
    }

    document.querySelector('.back-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
