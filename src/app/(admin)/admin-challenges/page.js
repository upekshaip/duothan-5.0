"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Dashboard/Sidebar";

export default function ChallengeManagementPage() {
  const [activeTab, setActiveTab] = useState("algorithmic");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challenges, setChallenges] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    algorithmicProblem: "",
    buildathonProblem: "",
    flag: "",
    difficultyLevel: "medium",
  });

  useEffect(() => {
    const getChallanges = async () => {
      try {
        const response = await fetch("/api/challanges/get-challanges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ test: "data" }),
        });
        const data = await response.json();
        console.log(data);
        // if (!response.ok) throw new Error("Failed to fetch challenges");
        console.log(data);
        setChallenges(data.challanges || []);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    getChallanges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const requiredFields = [
      "title",
      "description",
      "algorithmicProblem",
      "buildathonProblem",
      "flag",
      "difficultyLevel",
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        alert(`Please fill in the "${field}" field.`);
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/challanges/create-challange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          algoQuestion: formData.algorithmicProblem,
          buildQuestion: formData.buildathonProblem,
          flag: formData.flag,
          difficulty: formData.difficultyLevel,
        }),
      });
      console.log(formData);

      alert("Challenge created successfully!");
      setFormData({
        title: "",
        description: "",
        algorithmicProblem: "",
        buildathonProblem: "",
        flag: "",
        difficultyLevel: "medium",
      });
      setShowAddForm(false);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Challenge Management
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800"
          >
            Create New Challenge
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Challenge
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Algorithmic Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Algorithmic Problem
                </label>
                <textarea
                  value={formData.algorithmicProblem}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      algorithmicProblem: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Flag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Flag
                </label>
                <input
                  type="text"
                  placeholder="flag{your_flag_here}"
                  value={formData.flag}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, flag: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Buildathon Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buildathon Problem
                </label>
                <textarea
                  value={formData.buildathonProblem}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buildathonProblem: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficultyLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficultyLevel: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white rounded-md ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Challenge"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            <button
              className={`py-2 px-4 ${
                activeTab === "algorithmic"
                  ? "border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("algorithmic")}
            >
              Algorithmic Problems
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "buildathon"
                  ? "border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("buildathon")}
            >
              Buildathon Problems
            </button>
          </div>
        </div>

        {/* Table Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {challenges.map((challenge) => (
                  <tr key={challenge._id || challenge.title}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {challenge.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {challenge.difficulty ||
                        challenge.difficultyLevel ||
                        "Medium"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {challenge.timeLimit || "2 hours"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {challenge.submissions || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
