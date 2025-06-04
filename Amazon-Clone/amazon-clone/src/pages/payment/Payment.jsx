import React, { useContext, useState } from "react";
import Layout from "../../Components/layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/currencyFormat/CurrencyFormat";

import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utiltiy/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utiltiy/ActionType";

export default function Payment() {
  const { basket, user, dispatch } = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Card Input Event:", e);
    setError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/auth", {
        state: {
          msg: "Please sign in to proceed with checkout.",
          redirect: "/payments",
        },
      });
      return;
    }

    try {
      setProcessing(true);

      //  Log backend response properly
      console.log("Sending payment request...");
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );

      // console.log("Backend Response:", response.data);

      //  Ensure clientSecret exists
      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Error: Missing clientSecret from backend response.");
      }

      console.log("Confirming payment with Stripe...");

      // Stripe payment confirmation
      const { paymentIntent, error: paymentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement) },
        });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      console.log("Payment Successful:", paymentIntent);

      //  Save order in Firestore safely
      const userRef = doc(db, "users", user.uid);
      const ordersRef = collection(userRef, "orders");

      await setDoc(doc(ordersRef, paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      console.log("Order saved successfully.");

      //  Empty the basket after successful payment
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order!" } });
    } catch (error) {
      console.error("Payment Error:", error);
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header  */}
      <div className={classes.payment_header}>Checkout {totalItem} items</div>

      {/* Payment method  */}

      <section className={classes.payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>160 React Lane</div>
            <div>Addis Ababa, Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard item={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form  */}
        <div className={classes.flex}>
          <h3> Payment Method</h3>
          <div className={classes.payment_card}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <CardElement onChange={handleChange} />

                {/* price  */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button typeof="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
