"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Hammer, Trophy, Users, Clock, CheckCircle, Menu, LogOut, User, Settings } from "lucide-react"

// Mock Sidebar component since we don't have the actual one
const Sidebar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <Sidebar></Sidebar>
    </>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalPoints: 0,
    algorithmicPoints: 0,
    buildathonPoints: 0,
    totalSubmissions: 0,
    algorithmicSubmissions: 0,
    buildathonSubmissions: 0,
  })
  const [recentSubmissions, setRecentSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set dummy data
    const loadDummyData = () => {
      // Dummy user data
      const dummyUser = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        team: {
          id: 1,
          name: "Code Warriors",
          description: "A team of passionate developers ready to tackle any challenge",
          users: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Mike Johnson" }
          ]
        }
      }

      // Dummy stats
      const dummyStats = {
        totalPoints: 1250,
        algorithmicPoints: 750,
        buildathonPoints: 500,
        totalSubmissions: 15,
        algorithmicSubmissions: 12,
        buildathonSubmissions: 3,
      }

      // Dummy recent submissions
      const dummySubmissions = [
        {
          id: 1,
          type: "algorithmic",
          createdAt: "2025-07-15T10:30:00Z",
          problem: {
            title: "Binary Search Implementation",
            points: 100
          }
        },
        {
          id: 2,
          type: "buildathon",
          createdAt: "2025-07-14T15:45:00Z",
          problem: {
            title: "E-commerce Platform",
            points: 200
          }
        },
        {
          id: 3,
          type: "algorithmic",
          createdAt: "2025-07-13T09:20:00Z",
          problem: {
            title: "Dynamic Programming Challenge",
            points: 150
          }
        },
        {
          id: 4,
          type: "algorithmic",
          createdAt: "2025-07-12T14:10:00Z",
          problem: {
            title: "Graph Traversal",
            points: 120
          }
        },
        {
          id: 5,
          type: "buildathon",
          createdAt: "2025-07-11T11:00:00Z",
          problem: {
            title: "Mobile App Prototype",
            points: 180
          }
        }
      ]

      setUser(dummyUser)
      setStats(dummyStats)
      setRecentSubmissions(dummySubmissions)
      setLoading(false)
    }

    // Simulate API call delay
    setTimeout(loadDummyData, 1000)
  }, [])

  const handleLogout = () => {
    console.log("Logout clicked")
    // In real app: localStorage.removeItem("token") etc.
  }

  const handleNavigation = (path) => {
    console.log("Navigate to:", path)
    // In real app: router.push(path)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="lg:ml-64">
        <main className="p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">Ready to continue your journey through the OASIS challenges?</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalPoints}</p>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Code className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.algorithmicSubmissions}</p>
                      <p className="text-sm text-muted-foreground">Algorithmic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Hammer className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.buildathonSubmissions}</p>
                      <p className="text-sm text-muted-foreground">Buildathon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{user?.team ? user.team.name : "No Team"}</p>
                      <p className="text-sm text-muted-foreground">Current Team</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Jump into challenges and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/dashboard/algorithmic")}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Solve Algorithmic Problems
                  </Button>

                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/dashboard/buildathon")}
                    disabled={!user?.team}
                  >
                    <Hammer className="h-4 w-4 mr-2" />
                    Join Buildathon Challenges
                    {!user?.team && <span className="ml-2 text-xs">(Team Required)</span>}
                  </Button>

                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/dashboard/leaderboard")}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Button>

                  {!user?.team && (
                    <Button className="w-full justify-start" onClick={() => handleNavigation("/dashboard/team")}>
                      <Users className="h-4 w-4 mr-2" />
                      Create or Join Team
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Your latest problem submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentSubmissions.length > 0 ? (
                    <div className="space-y-3">
                      {recentSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {submission.type === "algorithmic" ? (
                              <Code className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Hammer className="h-4 w-4 text-green-500" />
                            )}
                            <div>
                              <p className="font-medium text-sm">{submission.problem.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {submission.type} • {new Date(submission.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{submission.problem.points} pts</Badge>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No submissions yet</p>
                      <p className="text-sm">Start solving problems to see your activity here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Team Status */}
            {user?.team && (
              <Card>
                <CardHeader>
                  <CardTitle>Team Information</CardTitle>
                  <CardDescription>Your current team details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">{user.team.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {user.team.description || "No description provided"}
                      </p>
                      <Badge variant="outline">
                        {user.team.users?.length || 0} member{user.team.users?.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Team Members</h4>
                      <div className="space-y-1">
                        {user.team.users?.map((member) => (
                          <div key={member.id} className="text-sm">
                            {member.name} {member.id === user.id && "(You)"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}