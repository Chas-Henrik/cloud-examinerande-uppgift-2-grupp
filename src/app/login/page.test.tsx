import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { name: /Journal/i });
    expect(heading).toBeInTheDocument();
  });
});
