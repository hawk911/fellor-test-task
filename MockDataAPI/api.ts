export interface HiringInsightData {
  day: string
  applicationToInterview: number
  offerAcceptance: number
  rejection: number
  date: string
}

export interface HiringInsightsResponse {
  data: HiringInsightData[]
  timeframe: string
  lastUpdated: string
}

// Mock data for different timeframes
const mockDataSets = {
  "7d": [
    { day: "24", applicationToInterview: 65, offerAcceptance: 72, rejection: 45, date: "2024-01-24" },
    { day: "25", applicationToInterview: 68, offerAcceptance: 75, rejection: 48, date: "2024-01-25" },
    { day: "26", applicationToInterview: 62, offerAcceptance: 78, rejection: 52, date: "2024-01-26" },
    { day: "27", applicationToInterview: 58, offerAcceptance: 72, rejection: 55, date: "2024-01-27" },
    { day: "28", applicationToInterview: 55, offerAcceptance: 68, rejection: 58, date: "2024-01-28" },
    { day: "29", applicationToInterview: 52, offerAcceptance: 65, rejection: 62, date: "2024-01-29" },
    { day: "30", applicationToInterview: 48, offerAcceptance: 62, rejection: 65, date: "2024-01-30" },
  ],
  "30d": [
    { day: "01", applicationToInterview: 45, offerAcceptance: 35, rejection: 25, date: "2024-01-01" },
    { day: "02", applicationToInterview: 42, offerAcceptance: 38, rejection: 28, date: "2024-01-02" },
    { day: "03", applicationToInterview: 48, offerAcceptance: 42, rejection: 32, date: "2024-01-03" },
    { day: "04", applicationToInterview: 52, offerAcceptance: 45, rejection: 35, date: "2024-01-04" },
    { day: "05", applicationToInterview: 49, offerAcceptance: 48, rejection: 38, date: "2024-01-05" },
    { day: "06", applicationToInterview: 55, offerAcceptance: 52, rejection: 42, date: "2024-01-06" },
    { day: "07", applicationToInterview: 58, offerAcceptance: 55, rejection: 45, date: "2024-01-07" },
    { day: "08", applicationToInterview: 54, offerAcceptance: 58, rejection: 48, date: "2024-01-08" },
    { day: "09", applicationToInterview: 51, offerAcceptance: 62, rejection: 52, date: "2024-01-09" },
    { day: "10", applicationToInterview: 48, offerAcceptance: 65, rejection: 55, date: "2024-01-10" },
    { day: "11", applicationToInterview: 52, offerAcceptance: 68, rejection: 58, date: "2024-01-11" },
    { day: "12", applicationToInterview: 56, offerAcceptance: 72, rejection: 62, date: "2024-01-12" },
    { day: "13", applicationToInterview: 59, offerAcceptance: 75, rejection: 65, date: "2024-01-13" },
    { day: "14", applicationToInterview: 62, offerAcceptance: 78, rejection: 68, date: "2024-01-14" },
    { day: "15", applicationToInterview: 65, offerAcceptance: 75, rejection: 72, date: "2024-01-15" },
    { day: "16", applicationToInterview: 68, offerAcceptance: 72, rejection: 75, date: "2024-01-16" },
    { day: "17", applicationToInterview: 65, offerAcceptance: 68, rejection: 78, date: "2024-01-17" },
    { day: "18", applicationToInterview: 62, offerAcceptance: 65, rejection: 75, date: "2024-01-18" },
    { day: "19", applicationToInterview: 58, offerAcceptance: 62, rejection: 72, date: "2024-01-19" },
    { day: "20", applicationToInterview: 55, offerAcceptance: 58, rejection: 68, date: "2024-01-20" },
    { day: "21", applicationToInterview: 52, offerAcceptance: 55, rejection: 65, date: "2024-01-21" },
    { day: "22", applicationToInterview: 48, offerAcceptance: 52, rejection: 62, date: "2024-01-22" },
    { day: "23", applicationToInterview: 45, offerAcceptance: 48, rejection: 58, date: "2024-01-23" },
    { day: "24", applicationToInterview: 42, offerAcceptance: 45, rejection: 55, date: "2024-01-24" },
    { day: "25", applicationToInterview: 38, offerAcceptance: 42, rejection: 52, date: "2024-01-25" },
    { day: "26", applicationToInterview: 35, offerAcceptance: 38, rejection: 48, date: "2024-01-26" },
    { day: "27", applicationToInterview: 32, offerAcceptance: 35, rejection: 45, date: "2024-01-27" },
    { day: "28", applicationToInterview: 35, offerAcceptance: 32, rejection: 42, date: "2024-01-28" },
    { day: "29", applicationToInterview: 38, offerAcceptance: 28, rejection: 38, date: "2024-01-29" },
    { day: "30", applicationToInterview: 42, offerAcceptance: 25, rejection: 35, date: "2024-01-30" },
  ],
  "90d": [
    { day: "01", applicationToInterview: 35, offerAcceptance: 25, rejection: 20, date: "2023-11-01" },
    { day: "15", applicationToInterview: 42, offerAcceptance: 32, rejection: 28, date: "2023-11-15" },
    { day: "30", applicationToInterview: 48, offerAcceptance: 38, rejection: 35, date: "2023-11-30" },
    { day: "45", applicationToInterview: 55, offerAcceptance: 45, rejection: 42, date: "2023-12-15" },
    { day: "60", applicationToInterview: 62, offerAcceptance: 52, rejection: 48, date: "2023-12-30" },
    { day: "75", applicationToInterview: 58, offerAcceptance: 58, rejection: 55, date: "2024-01-15" },
    { day: "90", applicationToInterview: 52, offerAcceptance: 62, rejection: 62, date: "2024-01-30" },
  ],
  "6m": [
    { day: "Month 1", applicationToInterview: 40, offerAcceptance: 30, rejection: 25, date: "2023-08-01" },
    { day: "Month 2", applicationToInterview: 45, offerAcceptance: 35, rejection: 30, date: "2023-09-01" },
    { day: "Month 3", applicationToInterview: 52, offerAcceptance: 42, rejection: 38, date: "2023-10-01" },
    { day: "Month 4", applicationToInterview: 58, offerAcceptance: 48, rejection: 45, date: "2023-11-01" },
    { day: "Month 5", applicationToInterview: 62, offerAcceptance: 55, rejection: 52, date: "2023-12-01" },
    { day: "Month 6", applicationToInterview: 55, offerAcceptance: 62, rejection: 58, date: "2024-01-01" },
  ],
}

export async function getHiringInsights(timeframe = "30d"): Promise<HiringInsightsResponse> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

  if (Math.random() < 0.05) {
    throw new Error("Failed to fetch hiring insights data")
  }

  const data = mockDataSets[timeframe as keyof typeof mockDataSets] || mockDataSets["30d"]

  return {
    data,
    timeframe,
    lastUpdated: new Date().toISOString(),
  }
}

export async function getHiringInsightsFromFile(timeframe = "30d"): Promise<HiringInsightsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const jsonData = {
    metadata: {
      version: "1.0",
      generated: new Date().toISOString(),
      source: "hiring_insights.json",
    },
    insights: mockDataSets[timeframe as keyof typeof mockDataSets] || mockDataSets["30d"],
  }

  return {
    data: jsonData.insights,
    timeframe,
    lastUpdated: jsonData.metadata.generated,
  }
}
