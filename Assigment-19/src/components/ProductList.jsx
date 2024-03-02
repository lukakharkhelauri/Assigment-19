import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../modules/ProductList.module.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?limit=5&page=${page}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  return (
    <div className={classes['product-list']}>
      {products.map((product) => (
        <div key={product.id} className={classes['product-item']}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <span>${product.price}</span>
        </div>
      ))}
       <button className={classes['load-more']} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default ProductList;
