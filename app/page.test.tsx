import { render, screen, fireEvent } from "@testing-library/react"
import Dashboard from "./page"
import '@testing-library/jest-dom'

// Mock the child components to simplify testing
jest.mock("../components/Sidebar", () => ({
  Sidebar: ({ mobile }: { mobile?: boolean }) => (
    <div data-testid="sidebar" data-mobile={mobile}>
      Sidebar
    </div>
  ),
}))

jest.mock("../components/Header", () => ({
  DashboardHeader: ({ onMenuClick }: { onMenuClick: () => void }) => (
    <div data-testid="header">
      <button onClick={onMenuClick}>Menu</button>
    </div>
  ),
}))

jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}))

jest.mock("../components/StatsCards", () => ({
  StatsCards: () => <div data-testid="stats-cards">Stats Cards</div>,
}))

jest.mock("../components/HiringInsights", () => ({
  HiringInsights: () => <div data-testid="hiring-insights">Hiring Insights</div>,
}))

jest.mock("../components/UpcomingInterviews", () => ({
  UpcomingInterviews: () => <div data-testid="upcoming-interviews">Upcoming Interviews</div>,
}))

jest.mock("../components/TopActiveJobs", () => ({
  TopActiveJobs: () => <div data-testid="top-active-jobs">Top Active Jobs</div>,
}))

jest.mock("../components/TodoList", () => ({
  TodoList: () => <div data-testid="todo-list">Todo List</div>,
}))

describe("Dashboard", () => {
  it("renders all main components", () => {
    render(<Dashboard />)

    // Check for desktop sidebar
    const desktopSidebar = screen.getAllByTestId("sidebar")[0]
    expect(desktopSidebar).toBeInTheDocument()
    expect(desktopSidebar).not.toHaveAttribute("data-mobile", "true")

    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("stats-cards")).toBeInTheDocument()
    expect(screen.getByTestId("hiring-insights")).toBeInTheDocument()
    expect(screen.getByTestId("upcoming-interviews")).toBeInTheDocument()
    expect(screen.getByTestId("top-active-jobs")).toBeInTheDocument()
    expect(screen.getByTestId("todo-list")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  it("toggles mobile sidebar when menu button is clicked", () => {
    render(<Dashboard />)

    // Initially, mobile sidebar should not be visible
    const mobileSidebars = screen.getAllByTestId("sidebar")
    expect(mobileSidebars).toHaveLength(1) // Only desktop sidebar should be visible

    // Click the menu button
    const menuButton = screen.getByText("Menu")
    fireEvent.click(menuButton)

    // Mobile sidebar should now be visible
    const updatedSidebars = screen.getAllByTestId("sidebar")
    expect(updatedSidebars).toHaveLength(2) // Both desktop and mobile sidebars should be visible
    expect(updatedSidebars[1]).toHaveAttribute("data-mobile", "true")
  })

  it("closes mobile sidebar when overlay is clicked", () => {
    render(<Dashboard />)

    // Open the sidebar
    const menuButton = screen.getByText("Menu")
    fireEvent.click(menuButton)

    // Click the overlay
    const overlay = screen.getByRole("button", { name: "X" })
    fireEvent.click(overlay)

    // Mobile sidebar should be closed
    const sidebars = screen.getAllByTestId("sidebar")
    expect(sidebars).toHaveLength(1) // Only desktop sidebar should be visible
    expect(sidebars[0]).not.toHaveAttribute("data-mobile", "true")
  })
}) 