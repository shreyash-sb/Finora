import React, { useState } from "react";
import axios from "axios";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY", closeWindow }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100.0);
  const [submitting, setSubmitting] = useState(false);

  const isBuy = mode === "BUY";

  const handleOrderSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: mode,
      });
    } catch (err) {
      console.error("Order submission error:", err);
    } finally {
      setSubmitting(false);
      if (closeWindow) closeWindow();
    }
  };

  const handleCancel = (e) => {
    if (e) e.preventDefault();
    if (closeWindow) closeWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
          <h4 style={{ margin: 0, color: isBuy ? "#4184f3" : "#df514c", fontSize: "16px" }}>
            {isBuy ? "Buy" : "Sell"} {uid}
          </h4>
        </div>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>
        <div>
          <button
            type="button"
            disabled={submitting}
            className={`btn ${isBuy ? "btn-blue" : "btn-red"}`}
            style={!isBuy ? { backgroundColor: "#df514c", color: "#fff", borderColor: "#df514c" } : {}}
            onClick={handleOrderSubmit}
          >
            {submitting ? "Placing..." : isBuy ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
