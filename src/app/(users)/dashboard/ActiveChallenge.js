"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Hammer, Play, CheckCircle, AlertCircle, Clock, Github, Send, Loader2 } from "lucide-react"

// Mock CodeEditor component since we don't have the actual one
const CodeEditor = ({ value, onChange, language, height }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-md bg-background font-mono text-sm"
      style={{ height }}
      placeholder={`Write your ${language} code here...`}
    />
  )
}

// Mock toast function
const toast = {
  success: (message) => console.log("SUCCESS:", message),
  error: (message) => console.log("ERROR:", message)
}

export default function ActiveChallenge({ challenge, progress, onSubmitCode, onSubmitFlag, onSubmitBuildathon }) {
  const [activeTab, setActiveTab] = useState("algorithmic")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [flag, setFlag] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)

  // Initialize with dummy data if props are not provided
  const dummyChallenge = challenge || {
    id: 1,
    title: "Binary Search Tree Implementation",
    description: "Implement a binary search tree with insert, search, and delete operations",
    points: 150,
    algorithmicProblem: `Problem: Implement a Binary Search Tree (BST) with the following operations:

1. Insert a value into the BST
2. Search for a value in the BST
3. Delete a value from the BST
4. Find the minimum value in the BST
5. Find the maximum value in the BST

Requirements:
- Implement the BST class with all required methods
- Handle edge cases (empty tree, single node, etc.)
- Maintain BST properties after insertions and deletions
- Return appropriate values for each operation

Input Format:
- First line: number of operations n
- Next n lines: operation type and value (if applicable)
  - "INSERT x" - insert value x
  - "SEARCH x" - search for value x (return true/false)
  - "DELETE x" - delete value x
  - "MIN" - find minimum value
  - "MAX" - find maximum value

Output Format:
- For each operation, output the result on a new line
- For SEARCH: output "true" or "false"
- For MIN/MAX: output the value or "empty" if tree is empty
- For INSERT/DELETE: output "success" or "failed"

Example:
Input:
5
INSERT 10
INSERT 5
INSERT 15
SEARCH 5
MIN

Output:
success
success
success
true
5`,
    buildathonProblem: `Buildathon Challenge: Task Management System

Build a complete task management web application with the following features:

Core Features:
1. User authentication and authorization
2. Create, read, update, and delete tasks
3. Task categorization and tagging
4. Due date management with notifications
5. Task priority levels (High, Medium, Low)
6. Task status tracking (Todo, In Progress, Done)
7. Search and filter functionality

Advanced Features:
8. Team collaboration (share tasks with team members)
9. Real-time updates using WebSockets
10. File attachments for tasks
11. Dashboard with analytics and charts
12. Mobile-responsive design
13. Dark/light theme toggle

Technical Requirements:
- Frontend: React.js or Vue.js with modern UI library
- Backend: Node.js/Express, Python/Django, or similar
- Database: PostgreSQL, MongoDB, or MySQL
- Authentication: JWT or OAuth
- Real-time: WebSockets or similar
- Deployment: Docker containerization

Deliverables:
1. Complete source code with proper documentation
2. Database schema and setup instructions
3. API documentation
4. Demo video (5-10 minutes)
5. Deployment instructions
6. Live demo URL (optional but recommended)

Evaluation Criteria:
- Code quality and organization (25%)
- Feature completeness (25%)
- User experience and design (20%)
- Technical implementation (20%)
- Documentation and presentation (10%)`
  }

  const dummyProgress = progress || {
    algorithmicCompleted: false,
    buildathonCompleted: false
  }

  useEffect(() => {
    if (dummyProgress?.algorithmicCompleted && !dummyProgress?.buildathonCompleted) {
      setActiveTab("buildathon")
    }
  }, [dummyProgress])

  const handleCodeExecution = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to execute")
      return
    }

    setIsExecuting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock execution results
      const mockResults = [
        {
          status: "Accepted",
          output: "success\nsuccess\nsuccess\ntrue\n5",
          time: "0.12",
          memory: "1024"
        },
        {
          status: "Wrong Answer",
          output: "success\nsuccess\nfalse\ntrue\n5",
          error: "Expected output doesn't match",
          time: "0.08",
          memory: "896"
        },
        {
          status: "Runtime Error",
          output: "",
          error: "NullPointerException at line 23",
          time: "0.05",
          memory: "512"
        }
      ]
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setExecutionResult(randomResult)
      
      if (randomResult.status === "Accepted") {
        toast.success("Code executed successfully!")
      } else {
        toast.error("Code execution failed")
      }
      
      setIsExecuting(false)
    }, 2000)
  }

  const handleFlagSubmission = async () => {
    if (!flag.trim()) {
      toast.error("Please enter a flag")
      return
    }

    // Mock flag validation
    setTimeout(() => {
      const correctFlag = "success\nsuccess\nsuccess\ntrue\n5"
      if (flag.trim() === correctFlag) {
        toast.success("Correct flag! Buildathon phase unlocked!")
        setActiveTab("buildathon")
        setFlag("")
        if (onSubmitFlag) onSubmitFlag(dummyChallenge.id, flag)
      } else {
        toast.error("Incorrect flag. Try again!")
      }
    }, 500)
  }

  const handleBuildathonSubmission = async () => {
    if (!githubLink.trim()) {
      toast.error("Please enter a GitHub repository link")
      return
    }

    // Basic GitHub URL validation
    const githubRegex = /^https:\/\/github\.com\/[\w\-.]+\/[\w\-.]+/
    if (!githubRegex.test(githubLink)) {
      toast.error("Please enter a valid GitHub repository URL")
      return
    }

    // Mock submission
    setTimeout(() => {
      toast.success("Buildathon submission successful!")
      setGithubLink("")
      if (onSubmitBuildathon) onSubmitBuildathon(dummyChallenge.id, githubLink)
    }, 1000)
  }

  if (!dummyChallenge) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Select a challenge to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{dummyChallenge.title}</h1>
          <p className="text-muted-foreground">{dummyChallenge.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{dummyChallenge.points} points</Badge>
          {dummyProgress?.buildathonCompleted && (
            <Badge variant="success">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="algorithmic" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Algorithmic Challenge</span>
            {dummyProgress?.algorithmicCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger
            value="buildathon"
            disabled={!dummyProgress?.algorithmicCompleted}
            className="flex items-center space-x-2"
          >
            <Hammer className="h-4 w-4" />
            <span>Buildathon Challenge</span>
            {dummyProgress?.buildathonCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="algorithmic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
              <CardDescription>Solve this algorithmic problem to unlock the buildathon phase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg">{dummyChallenge.algorithmicProblem}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
                <CardDescription>Write your solution here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Language:</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 border rounded-md bg-background"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>
                </div>

                <CodeEditor value={code} onChange={setCode} language={language} height="300px" />

                <div className="flex space-x-2">
                  <Button onClick={handleCodeExecution} disabled={isExecuting} className="flex items-center space-x-2">
                    {isExecuting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                    <span>{isExecuting ? "Executing..." : "Run Code"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Results</CardTitle>
                <CardDescription>Output and execution details</CardDescription>
              </CardHeader>
              <CardContent>
                {executionResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant={executionResult.status === "Accepted" ? "default" : "destructive"}>
                        {executionResult.status}
                      </Badge>
                    </div>

                    {executionResult.output && (
                      <div>
                        <label className="text-sm font-medium">Output:</label>
                        <pre className="mt-1 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                          {executionResult.output}
                        </pre>
                      </div>
                    )}

                    {executionResult.error && (
                      <div>
                        <label className="text-sm font-medium text-destructive">Error:</label>
                        <pre className="mt-1 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm overflow-x-auto text-destructive">
                          {executionResult.error}
                        </pre>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Time:</span> {executionResult.time}s
                      </div>
                      <div>
                        <span className="font-medium">Memory:</span> {executionResult.memory}KB
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2" />
                      <p>Run your code to see results</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Flag Submission */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Flag</CardTitle>
              <CardDescription>Enter the correct output as your flag to unlock the buildathon phase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your flag here..."
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleFlagSubmission} className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Submit Flag</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Hint: The correct flag is the expected output from the problem example
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buildathon" className="space-y-6">
          {dummyProgress?.algorithmicCompleted ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Buildathon Challenge</CardTitle>
                  <CardDescription>Build a complete solution for this challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg">{dummyChallenge.buildathonProblem}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Solution</CardTitle>
                  <CardDescription>
                    Provide a GitHub repository link containing your buildathon solution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">GitHub Repository URL</label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        placeholder="https://github.com/username/repository"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleBuildathonSubmission} className="flex items-center space-x-2">
                        <Github className="h-4 w-4" />
                        <span>Submit</span>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Submission Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Repository must be public</li>
                      <li>• Include a detailed README.md</li>
                      <li>• Source code should be well-documented</li>
                      <li>• Include setup/installation instructions</li>
                      <li>• Demonstrate the working solution</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <div className="text-center text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>Complete the algorithmic challenge first to unlock this phase</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Demo Controls */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Demo Controls</CardTitle>
          <CardDescription className="text-blue-600">
            Use these buttons to test different states of the component
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab("algorithmic")}
            >
              Switch to Algorithmic
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab("buildathon")}
            >
              Switch to Buildathon
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCode("class BST {\n  constructor() {\n    this.root = null;\n  }\n  \n  insert(value) {\n    // Your implementation here\n  }\n}")}
            >
              Add Sample Code
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFlag("success\nsuccess\nsuccess\ntrue\n5")}
            >
              Fill Correct Flag
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setGithubLink("https://github.com/username/task-management-system")}
            >
              Fill Sample GitHub URL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}