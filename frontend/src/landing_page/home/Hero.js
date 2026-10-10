import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero"
          className="mb-5 img-fluid"
          style={{ maxHeight: "360px", objectFit: "contain" }}
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p className="text-muted fs-5">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
        </p>
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-2"
          style={{ width: "220px", margin: "0 auto" }}
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}

export default Hero;
