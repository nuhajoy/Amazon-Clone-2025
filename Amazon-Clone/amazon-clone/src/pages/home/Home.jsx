import React from 'react';
import Layout from '../../Components/layout/Layout';
import Carousele from '../../Components/carousel/carousel';
import Category from '../../Components/category/Category';
import Product from '../../Components/product/Product';





export default function Home() {
  return (
    <Layout>
     
      <Carousele/>
        <Category/>
        <Product/>
    </Layout>
  )
}

