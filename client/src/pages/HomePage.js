import React, { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {useCart} from '../CartContext'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart , setCart] = useCart()
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:10000/products");
      // Assuming the API response is an array of products
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap" style={{ justifyContent: 'space-between' }}>
            {products?.map((p) => (
              <Link
                key={p._id}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem"}}>
                  <img
                    src={p.image}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Price:${p.price}</p>
                    <button className="btn btn-primary"
                     onClick={()=>{
                      const existingProduct = cart.find(item => item._id === p._id);
                      if (existingProduct) {
                        toast.success("Item already in cart");
                      }else{
                      setCart([...cart,p]);
                      localStorage.setItem('cart', JSON.stringify([...cart,p]))
                      toast.success("Item Added to Cart")
                     }}}>
                      ADD TO CART
                      </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

