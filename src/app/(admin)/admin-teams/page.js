"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Admin/Dashboard/Sidebar";

export default function TeamManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSubmissionHistory, setShowSubmissionHistory] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Mock data - replace with real data later
  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      members: ["John Doe", "Jane Smith"],
      totalSubmissions: 12,
      successfulSubmissions: 8,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Team Beta",
      members: ["Alice Johnson", "Bob Wilson"],
      totalSubmissions: 15,
      successfulSubmissions: 10,
      lastActive: "1 day ago",
    },
  ];

  const submissionHistory = [
    {
      id: 1,
      challengeTitle: "Binary Search Challenge",
      submittedAt: "2025-07-15 14:30",
      status: "success",
      flag: "flag{correct_123}",
      githubLink: "https://github.com/team/repo",
    },
    {
      id: 2,
      challengeTitle: "Graph Theory Challenge",
      submittedAt: "2025-07-14 16:45",
      status: "failed",
      flag: "flag{wrong_456}",
      githubLink: "https://github.com/team/repo2",
    },
  ];

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Team Management
          </h1>
          <div className="flex-1 max-w-sm ml-4">
            <input
              type="text"
              placeholder="Search teams..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Teams List */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {team.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Members: {team.members.join(", ")}
                  </p>
                  <div className="flex gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Submissions: {team.totalSubmissions}
                    </span>
                    <span className="text-sm text-green-600">
                      Success Rate:{" "}
                      {Math.round(
                        (team.successfulSubmissions / team.totalSubmissions) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last active: {team.lastActive}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTeam(team);
                      setShowSubmissionHistory(true);
                    }}
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800"
                  >
                    View Submissions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submission History Modal */}
        {showSubmissionHistory && selectedTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedTeam.name} - Submission History
                </h2>
                <button
                  onClick={() => setShowSubmissionHistory(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Challenge
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Submitted At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Flag
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        GitHub Link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {submissionHistory.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.challengeTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.submittedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              submission.status === "success"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.flag}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                          <a
                            href={submission.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Repository
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
