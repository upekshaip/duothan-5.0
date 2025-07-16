"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Mail, Calendar, Trophy, Edit } from "lucide-react"
import { useState } from "react"

export default function TeamProfile({ team, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: team?.name || "",
    members: team?.members || "",
    email: team?.email || "",
  })

  const handleSave = async () => {
    try {
      await onUpdate(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Profile</h1>
          <p className="text-muted-foreground">Manage your team information and settings</p>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Information</span>
            </CardTitle>
            <CardDescription>Basic details about your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Team Name</label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold">{team?.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{team?.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Team Members</label>
              {isEditing ? (
                <Textarea
                  value={formData.members}
                  onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                  placeholder="Enter team member names (one per line)"
                  className="mt-1"
                  rows={4}
                />
              ) : (
                <div className="mt-1">
                  {team?.members ? (
                    <div className="space-y-1">
                      {team.members
                        .split("\n")
                        .filter((member) => member.trim())
                        .map((member, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{member.trim()}</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No members listed</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Registration Date</label>
              <div className="mt-1 flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{team?.createdAt ? formatDate(team.createdAt) : "Unknown"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Performance Stats</span>
            </CardTitle>
            <CardDescription>Your team's current standing and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{team?.points || 0}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">#{team?.rank || "N/A"}</div>
                <div className="text-sm text-muted-foreground">Current Rank</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Authentication Status</span>
                <Badge variant="success">Verified</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Account Type</span>
                <Badge variant="default">Team</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Challenge Access</span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  )
}
