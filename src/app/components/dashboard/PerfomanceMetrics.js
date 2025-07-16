"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Code, Trophy, Target, Calendar, CheckCircle, XCircle } from "lucide-react"
import { formatTime } from "@/lib/utils"

export default function PerformanceMetrics({ team, submissions, progress }) {
  const totalSubmissions = submissions?.length || 0
  const acceptedSubmissions = submissions?.filter((s) => s.status === "accepted").length || 0
  const rejectedSubmissions = submissions?.filter((s) => s.status === "rejected").length || 0
  const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0

  const completedChallenges = progress?.filter((p) => p.buildathonCompleted).length || 0
  const totalChallenges = progress?.length || 0
  const completionRate = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0

  const averageTime = progress?.reduce((acc, p) => acc + (p.totalTime || 0), 0) / (completedChallenges || 1)

  const recentSubmissions = submissions?.slice(0, 5) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your team's performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{team?.points || 0}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">#{team?.rank || "N/A"}</p>
                <p className="text-sm text-muted-foreground">Current Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{completedChallenges}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{formatTime(Math.round(averageTime))}</p>
                <p className="text-sm text-muted-foreground">Avg. Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Progress Overview</span>
            </CardTitle>
            <CardDescription>Your team's overall progress and completion rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Challenge Completion</span>
                <span className="text-sm text-muted-foreground">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Submission Accuracy</span>
                <span className="text-sm text-muted-foreground">{acceptanceRate}%</span>
              </div>
              <Progress value={acceptanceRate} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{acceptedSubmissions}</p>
                <p className="text-xs text-muted-foreground">Accepted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{rejectedSubmissions}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{totalSubmissions}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Submissions</span>
            </CardTitle>
            <CardDescription>Your latest submission attempts and results</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length > 0 ? (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {submission.status === "accepted" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{submission.challenge?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {submission.type} • {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={submission.status === "accepted" ? "success" : "destructive"}>
                      {submission.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No submissions yet</p>
                <p className="text-sm">Start solving challenges to see your activity here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
