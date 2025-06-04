import React from "react";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Cart from "./pages/cart/cart";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";
import Result from "./pages/results/Result";
import ProductDetail from "./pages/productDetail/ProductDetail";

import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51RV0IMRtJeXipWnDkIgSSxhoX9jgFBMZ8CA5DkyHdYNcKglRDdMDQYxo35ooXjUMiG4hcezwnZbPqe72Q85bqZZe00EXj5GAxO"
);

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg={"You must login to pay"} redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute msg={"You must to see your orders"} redirect={"/orders"}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
