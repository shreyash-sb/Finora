import React, { useState } from "react";

function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    const endpoint = isLogin ? "/login" : "/signup";
    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost:3002${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: isLogin
            ? "Logged in successfully! Redirecting to Kite Dashboard..."
            : "Account created successfully! You can now access your dashboard.",
        });
        localStorage.setItem("zerodha_user", JSON.stringify(data.user || { username: formData.username }));
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 1500);
      } else {
        setStatusMessage({
          type: "danger",
          text: data.message || "Operation failed. Please try again.",
        });
      }
    } catch (err) {
      // In case backend is not yet started or network error
      setStatusMessage({
        type: "info",
        text: `Demo Mode: ${isLogin ? "Logged in" : "Signed up"} as ${formData.username || "User"}! You can open Kite Dashboard directly.`,
      });
      localStorage.setItem("zerodha_user", JSON.stringify({ username: formData.username || "Trader" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 my-4">
      <div className="row align-items-center justify-content-center">
        {/* Left Side: Artwork */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img
            src="media/images/signup.png"
            alt="Zerodha Signup"
            className="img-fluid"
            style={{ maxWidth: "480px" }}
          />
          <h4 className="mt-4 text-secondary">Simple, free investing</h4>
          <p className="text-muted small">
            Join over 1.5+ crore investors trading with India's largest stock broker.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="col-12 col-md-5">
          <div className="card shadow-sm border-0 p-4 rounded-3">
            <h2 className="fs-3 fw-bold mb-2">
              {isLogin ? "Login to Kite" : "Open a Zerodha account"}
            </h2>
            <p className="text-muted small mb-4">
              {isLogin
                ? "Enter your credentials to access your trading console."
                : "Modern platforms and apps, ₹0 investments, and flat ₹20 trades."}
            </p>

            {statusMessage.text && (
              <div className={`alert alert-${statusMessage.type} py-2 small`} role="alert">
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Username / User ID</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fa-solid fa-user text-muted"></i>
                  </span>
                  <input
                    type="text"
                    name="username"
                    required
                    className="form-control"
                    placeholder="e.g. USERID or rahul12"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Email address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fa-solid fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="10 digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="form-label small fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="fa-solid fa-lock text-muted"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                {loading ? "Processing..." : isLogin ? "Login" : "Continue"}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="small text-muted">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              </span>
              <button
                type="button"
                className="btn btn-link p-0 small text-decoration-none fw-semibold"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setStatusMessage({ type: "", text: "" });
                }}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </div>

            <hr className="my-3" />

            <div className="text-center">
              <a
                href="http://localhost:3001"
                className="btn btn-outline-secondary btn-sm w-100"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-chart-line me-2 text-primary"></i>
                Direct Access: Open Kite Trading Dashboard
              </a>
            </div>

            <p className="text-muted text-center mt-3 mb-0" style={{ fontSize: "11px" }}>
              By proceeding, you agree to Zerodha's terms & conditions and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
