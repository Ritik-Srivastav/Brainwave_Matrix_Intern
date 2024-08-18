import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the order from local storage
    const storedOrder = JSON.parse(localStorage.getItem("order"));
    if (storedOrder) {
      setOrder(storedOrder);
    } else {
      navigate('/orders');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container">
        {order ? (
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center">Order Summary</h2>
              <div
                style={{
                  display: 'grid',
                  gap: '20px',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
              >
                {order.cart.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '20px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    />
                    <h4>{item.name}</h4>
                    <p>
                      Price:{" "}
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p>Quantity: {order.amounts[item._id]}</p>
                    <p>
                      Total:{" "}
                      {(item.price * order.amounts[item._id]).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2>No order found</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderPage;

