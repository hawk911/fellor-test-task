import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { HiringInsights } from "./HiringInsights";
import { getHiringInsights } from "../MockDataAPI/api";

// Mock the API call
jest.mock("../MockDataAPI/api", () => ({
  getHiringInsights: jest.fn(),
}));

// Mock console.error
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Mock Recharts components
jest.mock("recharts", () => ({
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

const mockData = {
  data: [
    { day: 1, applicationToInterview: 75, offerAcceptance: 60, rejection: 25 },
    { day: 2, applicationToInterview: 80, offerAcceptance: 65, rejection: 20 },
  ],
  lastUpdated: "2024-03-20T10:00:00Z",
};

describe("HiringInsights", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getHiringInsights as jest.Mock).mockResolvedValue(mockData);
  });

  it("renders the component with title and chart", async () => {
    await act(async () => {
      render(<HiringInsights />);
    });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Hiring Insights")).toBeInTheDocument();
      expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    // Check legend items
    expect(
      screen.getByText("AIR (Application to Interview Rate)")
    ).toBeInTheDocument();
    expect(screen.getByText("OAR (Offer Acceptance Rate)")).toBeInTheDocument();
    expect(screen.getByText("RR (Rejection Rate)")).toBeInTheDocument();
  });

  it("shows last updated time", async () => {
    await act(async () => {
      render(<HiringInsights />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });
  });

  it("handles timeframe selection", async () => {
    await act(async () => {
      render(<HiringInsights />);
    });

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Last 30 days")).toBeInTheDocument();
    });

    // Open dropdown
    const dropdownTrigger = screen.getByRole("button", {
      name: /last 30 days/i,
    });
    await act(async () => {
      fireEvent.click(dropdownTrigger);
    });

    // Select new timeframe
    const newTimeframe = screen.getByRole("button", { name: "Last 7 days" });
    await act(async () => {
      fireEvent.click(newTimeframe);
    });

    // Verify API call with new timeframe
    expect(getHiringInsights).toHaveBeenCalledWith("7d");
  });

  it("handles refresh button click", async () => {
    await act(async () => {
      render(<HiringInsights />);
    });

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    // Click refresh button
    const refreshButton = screen.getByRole("button", { name: "" }); // Empty name because it's an icon button
    await act(async () => {
      fireEvent.click(refreshButton);
    });

    // Verify API call
    expect(getHiringInsights).toHaveBeenCalledTimes(2); // Initial load + refresh
  });

  it("handles error state", async () => {
    const errorMessage = "Failed to fetch data";
    (getHiringInsights as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(<HiringInsights />);
    });

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Verify retry button is present
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("shows loading state during data fetch", async () => {
    // Delay the API response
    (getHiringInsights as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockData), 100))
    );

    await act(async () => {
      render(<HiringInsights />);
    });

    // Check loading state
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  it("displays correct timeframe options", async () => {
    await act(async () => {
      render(<HiringInsights />);
    });

    // Open dropdown
    const dropdownTrigger = screen.getByRole("button", {
      name: /last 30 days/i,
    });
    await act(async () => {
      fireEvent.click(dropdownTrigger);
    });

    // Check all timeframe options are present
    const dropdownOptions = screen
      .getAllByRole("button", {
        name: /^last \d+ (days|months)$/i,
        hidden: false,
      })
      .filter(
        (button) => button.className.includes("block w-full") // Only dropdown menu items have this class
      );
    expect(dropdownOptions).toHaveLength(4);
    expect(dropdownOptions[0]).toHaveTextContent("Last 7 days");
    expect(dropdownOptions[1]).toHaveTextContent("Last 30 days");
    expect(dropdownOptions[2]).toHaveTextContent("Last 90 days");
    expect(dropdownOptions[3]).toHaveTextContent("Last 6 months");
  });
});
