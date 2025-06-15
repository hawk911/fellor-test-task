import { TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Candidates",
    value: "1,234",
    change: "10 more than last month",
    trend: "up",
  },
  {
    title: "Active Jobs",
    value: "42",
    change: "3 more than last month",
    trend: "up",
  },
  {
    title: "Interviews This Week",
    value: "28",
    change: "5 fewer than last month",
    trend: "down",
  },
  {
    title: "Time to Hire",
    value: "18 days",
    change: "Same as last month",
    trend: "neutral",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
            {stat.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
            <span
              className={`${
                stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
