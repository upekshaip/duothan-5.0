"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Users, RefreshCw, Crown } from "lucide-react"

export default function Leaderboard({ currentTeam }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalSubmissions: 0,
    activeChallenges: 0,
  })

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/leaderboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      setLeaderboard(data.leaderboard || [])
      setStats(data.stats || stats)
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st Place</Badge>
      case 2:
        return <Badge className="bg-gray-400 hover:bg-gray-500">2nd Place</Badge>
      case 3:
        return <Badge className="bg-amber-600 hover:bg-amber-700">3rd Place</Badge>
      default:
        return <Badge variant="outline">#{rank}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how your team ranks against others</p>
        </div>
        <Button onClick={fetchLeaderboard} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalTeams}</p>
                <p className="text-sm text-muted-foreground">Total Teams</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.activeChallenges}</p>
                <p className="text-sm text-muted-foreground">Active Challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Team Rankings</span>
          </CardTitle>
          <CardDescription>Rankings based on points and completion time</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg animate-pulse">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-32 h-4 bg-muted rounded mb-2"></div>
                    <div className="w-24 h-3 bg-muted rounded"></div>
                  </div>
                  <div className="w-16 h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((team, index) => {
                const rank = index + 1
                const isCurrentTeam = team.id === currentTeam?.id

                return (
                  <div
                    key={team.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      isCurrentTeam ? "bg-primary/10 border border-primary/20" : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">{getRankIcon(rank)}</div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold ${isCurrentTeam ? "text-primary" : ""}`}>
                            {team.name}
                            {isCurrentTeam && <span className="ml-2 text-xs text-primary">(You)</span>}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {team.completedChallenges || 0} challenges completed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{team.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                      {getRankBadge(rank)}
                    </div>
                  </div>
                )
              })}

              {leaderboard.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No teams on the leaderboard yet</p>
                  <p className="text-sm">Be the first to complete a challenge!</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
