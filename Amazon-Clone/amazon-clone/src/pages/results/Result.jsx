import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import Class from './results.module.css'
import ProductCard from '../../Components/product/ProductCard';

export default function Result() {

  const {categoryName}=useParams();
  const [results,setResult]=useState(null)

  useEffect(()=>{
     axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
     .then(res=>setResult(res.data))
     .catch(err=>console.log(err) )     
  },[categoryName])
  console.log(results)
  if(!results) return <p>Loading....</p>

  return (
    <div>
      <div className={Class.head}>
        <h3>Result</h3>
        <p>Category/{categoryName}</p>
      </div>
      <hr />
    <div className={Class.card_list}>     
      {results.map((p)=>(
          
        <ProductCard
          key={p.id}
          item={p}
        renderAdd={true}/>
          
      ))}   

      
    </div>
    </div>
  )
}
