import React, { useEffect, useState } from 'react';
import ProductCard from "../../Components/product/ProductCard";

import axios from 'axios'; 
import Class from './product.module.css'
import Loader from '../loader/Loader';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);   
  useEffect(() => {
    
    setLoading(true); 
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data); 
             })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 
  console.log(products)

   
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={Class.product__list}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} item={product}
              renderAdd={true}/>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      )}
    </>
  );
}
