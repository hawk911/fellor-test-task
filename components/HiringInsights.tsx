"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ChevronDown, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown";
import { Alert, AlertDescription } from "./Alert";
import { getHiringInsights, type HiringInsightData } from "../MockDataAPI/api";

interface TimeframeOption {
  label: string;
  value: string;
}

const timeframeOptions: TimeframeOption[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last 6 months", value: "6m" },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  selectedTimeframe: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  selectedTimeframe,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg min-w-[120px]">
        <p className="text-sm font-medium text-gray-900 mb-2">
          {selectedTimeframe === "6m" ? label : `Day ${label}`}
        </p>
        {payload.map((entry: any, index: number) => {
          const labelMap: { [key: string]: string } = {
            applicationToInterview: "AIR",
            offerAcceptance: "OAR",
            rejection: "RR",
          };
          const shortLabel = labelMap[entry.dataKey] || entry.dataKey;

          return (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {shortLabel} : {entry.value} %
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export const HiringInsights: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("30d");
  const [data, setData] = useState<HiringInsightData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const fetchData = async (timeframe: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getHiringInsights(timeframe);
      setData(response.data);
      setLastUpdated(response.lastUpdated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching hiring insights:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedTimeframe);
  }, [selectedTimeframe]);

  const handleTimeframeChange = (timeframe: string): void => {
    setSelectedTimeframe(timeframe);
    setDropdownOpen(false);
  };

  const handleRefresh = (): void => {
    fetchData(selectedTimeframe);
  };

  const selectedTimeframeLabel: string =
    timeframeOptions.find((option) => option.value === selectedTimeframe)
      ?.label || "Last 30 days";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Hiring Insights
          </h2>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="text-gray-600 hover:text-gray-900"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger onClick={() => setDropdownOpen((v) => !v)}>
              <span className="gap-2 flex items-center">
                {selectedTimeframeLabel}
                <ChevronDown className="h-4 w-4" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              open={dropdownOpen}
              align="end"
              className="w-40"
            >
              {timeframeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleTimeframeChange(option.value)}
                  className="text-sm"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {error}
            <Button
              variant="link"
              size="sm"
              onClick={handleRefresh}
              className="ml-2 p-0 h-auto text-red-600 hover:text-red-700"
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Chart */}
      <div className="h-80 w-full mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div
                data-testid="loading-spinner"
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
              ></div>
              <p className="text-sm text-gray-600">Loading insights...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip
                content={
                  <CustomTooltip selectedTimeframe={selectedTimeframe} />
                }
              />
              <Line
                type="monotone"
                dataKey="applicationToInterview"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "#10b981",
                  strokeWidth: 2,
                  fill: "white",
                }}
                name="AIR"
              />
              <Line
                type="monotone"
                dataKey="offerAcceptance"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "#8b5cf6",
                  strokeWidth: 2,
                  fill: "white",
                }}
                name="OAR"
              />
              <Line
                type="monotone"
                dataKey="rejection"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "#f97316",
                  strokeWidth: 2,
                  fill: "white",
                }}
                name="RR"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-gray-700">
            AIR (Application to Interview Rate)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500"></div>
          <span className="text-gray-700">OAR (Offer Acceptance Rate)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-700">RR (Rejection Rate)</span>
        </div>
      </div>
    </div>
  );
};
