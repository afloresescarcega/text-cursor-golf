import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders textarea with quick brown fox", () => {
  render(<App />);
  const linkElement = screen.getByText(/quick brown/i);
  expect(linkElement).toBeInTheDocument();
});
