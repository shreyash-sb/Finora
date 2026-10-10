import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>

      {loading ? (
        <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
          Loading orders...
        </p>
      ) : allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price (₹)</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Date / Time</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const isBuy = order.mode === "BUY";
                const modeClass = isBuy ? "profit" : "loss";
                const formattedDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "Today";

                return (
                  <tr key={order._id || index}>
                    <td>
                      <strong>{order.name}</strong>
                    </td>
                    <td>{order.qty}</td>
                    <td>{Number(order.price).toFixed(2)}</td>
                    <td className={modeClass}>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          backgroundColor: isBuy ? "#e8f4fd" : "#fde8e8",
                          color: isBuy ? "#4184f3" : "#df514c",
                        }}
                      >
                        {order.mode || "BUY"}
                      </span>
                    </td>
                    <td style={{ color: "#28a745", fontWeight: "500" }}>
                      COMPLETE
                    </td>
                    <td style={{ color: "#888", fontSize: "13px" }}>
                      {formattedDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
