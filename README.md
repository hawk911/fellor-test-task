# Hiring Insights Dashboard

A modern, interactive dashboard built with Next.js, TypeScript, and Recharts for visualizing hiring metrics and insights.

## Features

- 📊 Interactive charts using Recharts
- 🎨 Modern UI with Tailwind CSS
- 🔍 TypeScript for type safety
- ✅ Comprehensive test coverage with Jest and React Testing Library
- 📱 Responsive design
- 🔄 Real-time data updates
- 🎯 Interactive tooltips
- 📈 Multiple timeframe options

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **State Management**: React Hooks
- **Icons**: Lucide Icons

## Getting Started


1. Install dependencies:
```bash
yarn install
```

2. Run the development server:
```bash
yarn dev
```

3. Run tests:
```bash
yarn test
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main dashboard page
│   └── page.test.tsx         # Dashboard tests
├── components/
│   ├── HiringInsights.tsx    # Main insights chart component
│   ├── Button.tsx            # Reusable button component
│   ├── Input.tsx             # Input component
│   ├── Alert.tsx             # Alert component
│   ├── Dropdown.tsx          # Dropdown menu component
│   └── ...                   # Other UI components
├── MockDataAPI/
│   └── api.ts               # Mock API functions
├── utils/
│   └── index.ts             # Utility functions
└── tests/
    └── setup.ts             # Test configuration
```

## Key Features Implementation

### Interactive Charts with Recharts

The dashboard uses Recharts for data visualization:
- Line charts for trend analysis
- Custom tooltips on hover
- Responsive design
- Multiple data series (AIR, OAR, RR)

```typescript
<LineChart data={data}>
  <Line type="monotone" dataKey="applicationToInterview" />
  <Line type="monotone" dataKey="offerAcceptance" />
  <Line type="monotone" dataKey="rejection" />
  <Tooltip content={<CustomTooltip />} />
</LineChart>
```

### TypeScript Implementation

Strong typing throughout the application:
- Component props interfaces
- API response types
- State management types
- Event handler types

Example:
```typescript
interface HiringInsightData {
  day: number;
  applicationToInterview: number;
  offerAcceptance: number;
  rejection: number;
}
```

### Testing with Jest and RTL

Comprehensive test coverage:
- Component rendering tests
- User interaction tests
- API integration tests
- Error handling tests

Example test:
```typescript
it("renders the component with title and chart", async () => {
  render(<HiringInsights />);
  expect(screen.getByText("Hiring Insights")).toBeInTheDocument();
  expect(screen.getByTestId("line-chart")).toBeInTheDocument();
});
```

### Data Fetching

Simulated API calls using a mock function:
```typescript
export async function getHiringInsights(timeframe: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    data: mockData,
    lastUpdated: new Date().toISOString()
  };
}
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn lint` - Run linter

