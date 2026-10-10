import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./components/TopBar";
import Summary from "./components/Summary";

test("renders TopBar indices NIFTY and SENSEX", () => {
  render(
    <BrowserRouter>
      <TopBar />
    </BrowserRouter>
  );
  expect(screen.getByText(/NIFTY 50/i)).toBeInTheDocument();
  expect(screen.getByText(/SENSEX/i)).toBeInTheDocument();
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  expect(screen.getByText(/Holdings/i)).toBeInTheDocument();
});

test("renders Summary equity and margins overview", () => {
  render(<Summary />);
  expect(screen.getByText(/Equity/i)).toBeInTheDocument();
  expect(screen.getByText(/Margin available/i)).toBeInTheDocument();
});
