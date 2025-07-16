"use client";
import React from "react";

const StatsOverview = () => {
  // Mock data - replace with real data later
  const stats = {
    teamCount: 24,
    activesChallenges: 5,
    totalSubmissions: 126,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Registered Teams
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.teamCount}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Active Challenges
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.activesChallenges}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Total Submissions
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.totalSubmissions}
        </p>
      </div>
    </div>
  );
};

export default StatsOverview;
