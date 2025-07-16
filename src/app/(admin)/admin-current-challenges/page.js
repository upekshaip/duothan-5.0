"use client";
import React from "react";
import Sidebar from "../../components/Admin/Dashboard/Sidebar";

export default function CurrentChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Current Challenges
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Challenge Card */}
          {[1, 2, 3].map((challenge) => (
            <div
              key={challenge}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Binary Search Challenge #{challenge}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Active until: July 20, 2025
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200">
                      Algorithmic
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded dark:bg-green-900 dark:text-green-200">
                      Medium
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Algorithmic Problem
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Implement a binary search algorithm to find a number in a
                      sorted array...
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Buildathon Problem
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create a visual representation of the binary search
                      algorithm...
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Submissions
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      24
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Successful Submissions
                    </p>
                    <p className="text-lg font-semibold text-green-600">18</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Success Rate
                    </p>
                    <p className="text-lg font-semibold text-blue-600">75%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Average Completion Time
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      1.5h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
