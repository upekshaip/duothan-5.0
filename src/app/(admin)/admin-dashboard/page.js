"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Trophy,
  FileText,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Flag,
  Code,
  Settings,
  Activity,
  Calendar,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Target,
  Zap,
} from "lucide-react";

// Mock data for demonstration
const mockStats = {
  registeredTeams: 1247,
  activeChallenges: 12,
  totalSubmissions: 3854,
  completedChallenges: 8,
};

const mockLeaderboard = [
  {
    id: 1,
    team: "CodeCrusaders",
    score: 2850,
    challenges: 8,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    team: "ByteBuilders",
    score: 2640,
    challenges: 7,
    lastActive: "4 hours ago",
  },
  {
    id: 3,
    team: "DevDynamos",
    score: 2520,
    challenges: 6,
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    team: "AlgoAces",
    score: 2380,
    challenges: 7,
    lastActive: "6 hours ago",
  },
  {
    id: 5,
    team: "TechTitans",
    score: 2250,
    challenges: 5,
    lastActive: "3 hours ago",
  },
];

const mockChallenges = [
  {
    id: 1,
    title: "Data Structure Mastery",
    status: "Active",
    participants: 234,
    submissions: 156,
    algorithmic: {
      title: "Binary Tree Traversal",
      difficulty: "Medium",
      description: "Implement efficient tree traversal algorithms",
      flag: "TREE_MASTER_2024",
    },
    buildathon: {
      title: "Real-time Chat Application",
      duration: "48 hours",
      description: "Build a scalable chat app with WebSocket support",
      requirements: [
        "React/Vue frontend",
        "Node.js backend",
        "Database integration",
      ],
    },
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "AI Innovation Challenge",
    status: "Draft",
    participants: 0,
    submissions: 0,
    algorithmic: {
      title: "Neural Network Implementation",
      difficulty: "Hard",
      description: "Build a neural network from scratch",
      flag: "NEURAL_NET_FLAG",
    },
    buildathon: {
      title: "AI-powered Analytics Dashboard",
      duration: "72 hours",
      description: "Create an intelligent analytics platform",
      requirements: [
        "Machine Learning integration",
        "Data visualization",
        "REST API",
      ],
    },
    createdAt: "2024-01-20",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [challenges, setChallenges] = useState(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const LeaderboardCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Teams</h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="space-y-3">
        {mockLeaderboard.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0
                    ? "bg-yellow-500 text-white"
                    : index === 1
                    ? "bg-gray-400 text-white"
                    : index === 2
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-gray-900">{team.team}</p>
                <p className="text-sm text-gray-500">
                  {team.challenges} challenges completed
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{team.score}</p>
              <p className="text-sm text-gray-500">{team.lastActive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ChallengeCard = ({ challenge }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {challenge.title}
          </h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              challenge.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {challenge.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedChallenge(challenge);
              setShowModal(true);
              setModalType("view");
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedChallenge(challenge);
              setShowModal(true);
              setModalType("edit");
            }}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this challenge?")) {
                setChallenges(challenges.filter((c) => c.id !== challenge.id));
              }
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
          <p className="text-sm font-medium text-blue-600">
            {challenge.participants}
          </p>
          <p className="text-xs text-gray-500">Participants</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <FileText className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <p className="text-sm font-medium text-green-600">
            {challenge.submissions}
          </p>
          <p className="text-xs text-gray-500">Submissions</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Algorithmic
            </span>
          </div>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            {challenge.algorithmic.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">
              Buildathon
            </span>
          </div>
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
            {challenge.buildathon.duration}
          </span>
        </div>
      </div>
    </div>
  );

  const Modal = ({ challenge, type, onClose }) => {
    const [formData, setFormData] = useState(
      challenge || {
        title: "",
        status: "Draft",
        algorithmic: {
          title: "",
          difficulty: "Easy",
          description: "",
          flag: "",
        },
        buildathon: {
          title: "",
          duration: "24 hours",
          description: "",
          requirements: [],
        },
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      if (type === "edit") {
        setChallenges(
          challenges.map((c) =>
            c.id === challenge.id ? { ...formData, id: challenge.id } : c
          )
        );
      } else if (type === "create") {
        setChallenges([
          ...challenges,
          {
            ...formData,
            id: Date.now(),
            participants: 0,
            submissions: 0,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ]);
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {type === "view"
                ? "View Challenge"
                : type === "edit"
                ? "Edit Challenge"
                : "Create Challenge"}
            </h2>
          </div>

          <div className="p-6">
            {type === "view" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {challenge.title}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      challenge.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {challenge.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-purple-600 flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Algorithmic Problem
                    </h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {challenge.algorithmic.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {challenge.algorithmic.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {challenge.algorithmic.difficulty}
                        </span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded flex items-center">
                          <Flag className="w-3 h-3 mr-1" />
                          {challenge.algorithmic.flag}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-orange-600 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Buildathon Problem
                    </h4>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {challenge.buildathon.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {challenge.buildathon.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {challenge.buildathon.duration}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">
                          Requirements:
                        </p>
                        <ul className="text-sm text-gray-600 mt-1">
                          {challenge.buildathon.requirements.map(
                            (req, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                {req}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenge Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-purple-600 flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Algorithmic Problem
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.algorithmic?.title || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              algorithmic: {
                                ...formData.algorithmic,
                                title: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Difficulty
                        </label>
                        <select
                          value={formData.algorithmic?.difficulty || "Easy"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              algorithmic: {
                                ...formData.algorithmic,
                                difficulty: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={formData.algorithmic?.description || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              algorithmic: {
                                ...formData.algorithmic,
                                description: e.target.value,
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Flag
                        </label>
                        <input
                          type="text"
                          value={formData.algorithmic?.flag || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              algorithmic: {
                                ...formData.algorithmic,
                                flag: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="FLAG_NAME_2024"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-orange-600 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Buildathon Problem
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.buildathon?.title || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buildathon: {
                                ...formData.buildathon,
                                title: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <select
                          value={formData.buildathon?.duration || "24 hours"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buildathon: {
                                ...formData.buildathon,
                                duration: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="24 hours">24 hours</option>
                          <option value="48 hours">48 hours</option>
                          <option value="72 hours">72 hours</option>
                          <option value="1 week">1 week</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={formData.buildathon?.description || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buildathon: {
                                ...formData.buildathon,
                                description: e.target.value,
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Requirements (one per line)
                        </label>
                        <textarea
                          value={
                            formData.buildathon?.requirements?.join("\n") || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buildathon: {
                                ...formData.buildathon,
                                requirements: e.target.value
                                  .split("\n")
                                  .filter((r) => r.trim()),
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="React/Vue frontend&#10;Node.js backend&#10;Database integration"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {type === "edit" ? "Update Challenge" : "Create Challenge"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>New Challenge</span>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "challenges"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Challenge Management
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Registered Teams"
                value={mockStats.registeredTeams.toLocaleString()}
                icon={Users}
                trend="+12% from last month"
                color="bg-blue-500"
              />
              <StatCard
                title="Active Challenges"
                value={mockStats.activeChallenges}
                icon={Trophy}
                trend="+3 new this week"
                color="bg-green-500"
              />
              <StatCard
                title="Total Submissions"
                value={mockStats.totalSubmissions.toLocaleString()}
                icon={FileText}
                trend="+234 today"
                color="bg-purple-500"
              />
              <StatCard
                title="Completed Challenges"
                value={mockStats.completedChallenges}
                icon={Target}
                trend="2 completed this week"
                color="bg-orange-500"
              />
            </div>

            {/* Charts and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Activity Overview
                  </h3>
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                    <p className="text-sm text-gray-400">
                      Connect with backend for real-time data
                    </p>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <LeaderboardCard />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "New team registration",
                    team: "CodeMasters",
                    time: "2 minutes ago",
                    type: "success",
                  },
                  {
                    action: "Challenge submission",
                    team: "ByteBuilders",
                    time: "15 minutes ago",
                    type: "info",
                  },
                  {
                    action: "Flag captured",
                    team: "DevDynamos",
                    time: "32 minutes ago",
                    type: "warning",
                  },
                  {
                    action: "Buildathon completed",
                    team: "AlgoAces",
                    time: "1 hour ago",
                    type: "success",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "info"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {activity.team}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "challenges" && (
          <div className="space-y-6">
            {/* Challenge Management Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Challenge Management
              </h2>
              <button
                onClick={() => {
                  setSelectedChallenge(null);
                  setShowModal(true);
                  setModalType("create");
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Challenge</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>

            {/* Empty State */}
            {challenges.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No challenges yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first challenge
                </p>
                <button
                  onClick={() => {
                    setSelectedChallenge(null);
                    setShowModal(true);
                    setModalType("create");
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Challenge</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          challenge={selectedChallenge}
          type={modalType}
          onClose={() => {
            setShowModal(false);
            setSelectedChallenge(null);
            setModalType("");
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
