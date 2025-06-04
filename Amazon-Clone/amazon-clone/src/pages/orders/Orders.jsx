import React, { useContext ,useState, useEffect} from 'react';
import Layout from '../../Components/layout/Layout';
import { db } from '../../utiltiy/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import classes from './Order.module.css'
import { collection, doc, orderBy, query, onSnapshot, disableNetwork } from "firebase/firestore";
import { data } from 'react-router-dom';
import ProductCard from '../../Components/product/ProductCard';

function Orders() {
  const { user, dispatch } = useContext(DataContext)
  const [orders, setOrders] =  useState([])
  
  useEffect(() => {
    if (user) {
    
      const ordersRef = collection(doc(db, "users", user.uid), "orders");

     
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));

     
      onSnapshot(ordersQuery, (snaps) => {
        console.log( snaps);
        
        setOrders(snaps.docs.map((doc) => ({
          id: doc.id,
          data:doc.data()
        })))
      });
    } else {
      setOrders([])
    }


  }, [])
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2> Your Orders</h2>
          {
            orders?.length==0 && <div style={{padding: "20px"}}> You don't have orders yet.</div>
          }
          <div>
            {
              orders?.map((eachorders, i) => {
                return (
                  <div key={i}>
                    <hr />
                    <p>Order ID : {eachorders?.id}</p>
                    {
                      eachorders?.data.basket?.map(order => {
                        return (
                          <ProductCard
                            flex={true}
                            item={order}
                            key={order.id}
                          />
                        );
                      
                      })
                    }
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Orders
