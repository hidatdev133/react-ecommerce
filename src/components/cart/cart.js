import React from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Cart = ({ cart, setCart }) => {
  // Fixed: Destructure cart and setCart from props
  // increase quantity of cart product
  const incqty = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    setCart(
      cart.map((curElm) =>
        curElm.id === product.id ? { ...exist, qty: exist.qty + 1 } : curElm
      )
    );
  };

  // decrease quantity of cart product
  const decqty = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty > 1) {
      // Added check to prevent qty going below 1
      setCart(
        cart.map((curElm) =>
          curElm.id === product.id ? { ...exist, qty: exist.qty - 1 } : curElm
        )
      );
    }
  };

  // removing cart product
  const removeproduct = (product) => {
    setCart(cart.filter((curElm) => curElm.id !== product.id));
  };

  // total price
  const total = cart?.reduce(
    (
      price,
      item // Added optional chaining
    ) => price + item.qty * item.price,
    0
  );

  return (
    <div className="cart">
      <h3>#cart</h3>
      {cart.length === 0 ? (
        <div className="empty_cart">
          <h2>Your Shopping cart is empty</h2>
          <Link to="/shop">
            <button>Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className="container">
          {cart.map((curElm) => (
            <div className="box" key={curElm.id}>
              {" "}
              {/* Added key prop */}
              <div className="img_box">
                <img src={curElm.image} alt={curElm.Name} />{" "}
                {/* Added alt text */}
              </div>
              <div className="detail">
                <div className="info">
                  <h4>{curElm.cat}</h4>
                  <h3>{curElm.Name}</h3>
                  <p>Price: ${curElm.price}</p>
                  <p>Total: ${curElm.price * curElm.qty}</p>
                </div>
                <div className="quantity">
                  <button onClick={() => incqty(curElm)}>+</button>
                  <input
                    type="number"
                    value={curElm.qty}
                    readOnly // Added readOnly to prevent direct input
                  />
                  <button onClick={() => decqty(curElm)}>-</button>
                </div>
                <div className="icon">
                  <button
                    onClick={() => removeproduct(curElm)}
                    aria-label="Remove item" // Added accessibility
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="bottom">
          <div className="Total">
            <h4>Sub Total: ${total}</h4>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
