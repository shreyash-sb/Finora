import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

import HomePage from "./home/HomePage";
import Navbar from "./Navbar";

test("renders Navbar branding and navigation links", () => {
  render(<Navbar />);
  expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Products/i)).toBeInTheDocument();
  expect(screen.getByText(/Kite Dashboard/i)).toBeInTheDocument();
});

test("renders HomePage Hero section heading", () => {
  render(<HomePage />);
  expect(screen.getByText(/Invest in everything/i)).toBeInTheDocument();
  expect(screen.getByText(/Open a Zerodha account/i)).toBeInTheDocument();
});
