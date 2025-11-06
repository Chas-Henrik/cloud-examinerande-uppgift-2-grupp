import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NewEntryPage from "@/app/new-entry/page";

// Mock useRouter
const pushMock = jest.fn();
const backMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    back: backMock,
  }),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  ) as jest.Mock;
});

describe("NewEntryPage", () => {
  it("renders the page with title, content, and buttons", () => {
    render(<NewEntryPage />);

    // Check header
    expect(screen.getByText("New Entry")).toBeInTheDocument();

    // Check input fields
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Save Entry")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
