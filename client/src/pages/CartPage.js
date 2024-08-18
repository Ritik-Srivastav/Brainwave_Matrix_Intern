import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../CartContext";
import CartAmountToggle from "../components/Layout/CartAmountToggle";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [amounts, setAmounts] = useState({}); // State to manage amounts for each item
  const [showSuccessCard, setShowSuccessCard] = useState(false); // State to manage success card visibility
  const navigate = useNavigate(); // Hook to navigate to another page

  // Initialize amounts for each item in the cart from local storage
  const initializeAmounts = () => {
    const savedAmounts = JSON.parse(localStorage.getItem("amounts")) || {};
    const initialAmounts = { ...savedAmounts };

    cart.forEach((item) => {
      if (initialAmounts[item._id] === undefined) {
        initialAmounts[item._id] = 1; // Default amount to 1 if not set
      }
    });

    setAmounts(initialAmounts);
  };

  useEffect(() => {
    initializeAmounts();
  }, [cart]);

  // Calculate the total price based on the current amounts
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        const itemAmount = amounts[item._id] || 1; // Default amount to 1 if not set
        total += item.price * itemAmount;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Remove item amount from local storage if exists
    const updatedAmounts = { ...amounts };
    delete updatedAmounts[pid];
    setAmounts(updatedAmounts);
    localStorage.setItem("amounts", JSON.stringify(updatedAmounts));
  };

  // Handle amount changes
  const handleAmountChange = (pid, newAmount) => {
    const itemQuantity = cart.find(item => item._id === pid)?.quantity || 1;
    const updatedAmount = Math.max(1, Math.min(newAmount, itemQuantity));

    setAmounts(prevAmounts => {
      const updatedAmounts = { ...prevAmounts, [pid]: updatedAmount };
      localStorage.setItem("amounts", JSON.stringify(updatedAmounts));
      return updatedAmounts;
    });
  };

  // Handle checkout
  const handleCheckout = () => {
    const order = {
      cart,
      amounts,
      totalPrice: totalPrice(),
    };
    localStorage.setItem("order", JSON.stringify(order)); // Save order in local storage
    setCart([]); // Clear the cart
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart in local storage
   // setAmounts({}); // Clear amounts
    localStorage.setItem("amounts", JSON.stringify({})); // Clear amounts in local storage
    setShowSuccessCard(true); // Show success card
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center">
              {cart.length
                ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((p) => (
              <div key={p._id} className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img src={p.image} className="card-img-top" alt={p.name} />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>
                    Price:{" "}
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <CartAmountToggle
                    amount={amounts[p._id] || 1} // Default amount to 1 if not set
                    setDecrease={() =>
                      handleAmountChange(p._id, (amounts[p._id] || 1) > 1 ? (amounts[p._id] || 1) - 1 : 1)
                    }
                    setIncrease={() =>
                      handleAmountChange(p._id, (amounts[p._id] || 1) <p.quantity ? (amounts[p._id] || 1) + 1 : setAmounts(p.quantity))
                    }
                  />
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5>Total Price: {totalPrice()}</h5>
            <button
              className="btn btn-success mt-2"
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "18px",
                fontWeight: "bold",
                backgroundColor: "#28a745",
                borderColor: "#28a745",
                color: "white",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Success Card */}
      {showSuccessCard && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            zIndex: 1000,
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h3 style={{ color: "#28a745" }}>Purchase Successful!</h3>
          <p>Thank you for your order. You will be redirected to your orders page.</p>
          <button
            onClick={() => {
              setShowSuccessCard(false);
              navigate('/orders'); // Navigate to orders page
            }}
            style={{
              backgroundColor: "#28a745",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "10px 2px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            View Orders
          </button>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
