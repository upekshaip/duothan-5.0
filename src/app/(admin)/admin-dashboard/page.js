"use client";
import React from "react";
import dynamic from "next/dynamic";

import Sidebar from "@/app/components/Admin/Dashboard/Sidebar";


// Dynamically import charts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  // Mock data for charts
  const submissionData = {
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        foreColor: "#9CA3AF",
      },
      stroke: { curve: "smooth" },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      theme: { mode: "dark" },
    },
    series: [
      {
        name: "Submissions",
        data: [30, 45, 57, 42],
      },
    ],
  };

  const challengeStatusData = {
    options: {
      chart: {
        type: "donut",
        toolbar: { show: false },
        foreColor: "#9CA3AF",
      },
      labels: ["Algorithmic", "Buildathon", "Both Completed", "Not Started"],
      theme: { mode: "dark" },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Teams",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                },
              },
            },
          },
        },
      },
      legend: {
        position: "bottom",
      },
      colors: ["#3B82F6", "#10B981", "#6366F1", "#9CA3AF"],
    },
    series: [8, 6, 12, 4],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Registered Teams
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              24
            </p>
            <div className="mt-2 text-green-600 text-sm">
              ↑ 12% from last week
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Active Challenges
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              5
            </p>
            <div className="mt-2 text-blue-600 text-sm">2 ending this week</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Submissions
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              174
            </p>
            <div className="mt-2 text-green-600 text-sm">
              ↑ 8% from last week
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Submission Trends */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Submission Trends
            </h3>
            <Chart
              options={submissionData.options}
              series={submissionData.series}
              type="area"
              height={300}
            />
          </div>

          {/* Challenge Status Distribution */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Challenge Completion Status
            </h3>
            <Chart
              options={challengeStatusData.options}
              series={challengeStatusData.series}
              type="donut"
              height={300}
            />
          </div>
        </div>

        {/* Leaderboard Snapshot */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leaderboard Snapshot
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View Full Leaderboard
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Completed Challenges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  {
                    rank: 1,
                    team: "Team Alpha",
                    completed: 8,
                    rate: "92%",
                    points: 890,
                    trend: "up",
                  },
                  {
                    rank: 2,
                    team: "Team Beta",
                    completed: 7,
                    rate: "88%",
                    points: 780,
                    trend: "up",
                  },
                  {
                    rank: 3,
                    team: "Team Gamma",
                    completed: 6,
                    rate: "85%",
                    points: 670,
                    trend: "down",
                  },
                  {
                    rank: 4,
                    team: "Team Delta",
                    completed: 6,
                    rate: "83%",
                    points: 650,
                    trend: "same",
                  },
                  {
                    rank: 5,
                    team: "Team Epsilon",
                    completed: 5,
                    rate: "80%",
                    points: 610,
                    trend: "up",
                  },
                ].map((team) => (
                  <tr
                    key={team.rank}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {team.rank === 1 ? "🏆 " : ""}
                      {team.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {team.team}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {team.completed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {team.rate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {team.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {team.trend === "up" && (
                        <span className="text-green-600">↑</span>
                      )}
                      {team.trend === "down" && (
                        <span className="text-red-600">↓</span>
                      )}
                      {team.trend === "same" && (
                        <span className="text-gray-600">→</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Team Alpha submitted Challenge #3
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  View
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
