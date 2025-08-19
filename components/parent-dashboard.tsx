"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  FileText,
  Calendar,
  DollarSign,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  GraduationCap,
  Users,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface ParentDashboardProps {
  user: any
  onLogout: () => void
}

export default function ParentDashboard({ user, onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedChild, setSelectedChild] = useState("child-1")

  // Mock data for parent's children
  const children = [
    {
      id: "child-1",
      fullName: "Alice Johnson",
      email: "alice@example.com",
      className: "Grade 10A",
      birthDate: "2008-05-15",
      status: "Active",
      teacher: "Jane Teacher",
      scores: [
        { subject: "Mathematics", score: 85, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
        { subject: "Physics", score: 78, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
        { subject: "English", score: 92, maxScore: 100, date: "2024-01-13", teacher: "John Educator" },
        { subject: "Chemistry", score: 88, maxScore: 100, date: "2024-01-12", teacher: "Sarah Wilson" },
      ],
      assignments: [
        { id: 1, title: "Algebra Quiz", subject: "Mathematics", status: "Submitted", dueDate: "2024-01-20", score: 85 },
        {
          id: 2,
          title: "Physics Lab Report",
          subject: "Physics",
          status: "Pending",
          dueDate: "2024-01-25",
          score: null,
        },
        { id: 3, title: "English Essay", subject: "English", status: "Submitted", dueDate: "2024-01-18", score: 92 },
        {
          id: 4,
          title: "Chemistry Experiment",
          subject: "Chemistry",
          status: "Graded",
          dueDate: "2024-01-15",
          score: 88,
        },
      ],
      attendance: [
        { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
        { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
        { date: "2024-01-14", subject: "English", status: "LATE" },
        { date: "2024-01-14", subject: "Chemistry", status: "PRESENT" },
        { date: "2024-01-13", subject: "Mathematics", status: "ABSENT" },
      ],
      remarks: [
        {
          id: 1,
          teacher: "Jane Teacher",
          subject: "Mathematics",
          remark: "Excellent performance in algebra",
          date: "2024-01-15",
        },
        {
          id: 2,
          teacher: "Jane Teacher",
          subject: "Physics",
          remark: "Needs improvement in lab work",
          date: "2024-01-14",
        },
        {
          id: 3,
          teacher: "John Educator",
          subject: "English",
          remark: "Outstanding writing skills",
          date: "2024-01-13",
        },
      ],
      transactions: [
        {
          id: 1,
          description: "Tuition Fee - January",
          amount: "$500",
          date: "2024-01-01",
          status: "Paid",
          type: "Tuition",
        },
        { id: 2, description: "Library Books", amount: "$50", date: "2024-01-10", status: "Pending", type: "Books" },
        { id: 3, description: "Lab Equipment Fee", amount: "$75", date: "2024-01-05", status: "Paid", type: "Lab Fee" },
      ],
      schedule: [
        { day: "Monday", time: "9:00 - 10:00", subject: "Mathematics", teacher: "Jane Teacher", room: "Room 101" },
        { day: "Monday", time: "10:30 - 11:30", subject: "Physics", teacher: "Jane Teacher", room: "Lab 1" },
        { day: "Tuesday", time: "9:00 - 10:00", subject: "English", teacher: "John Educator", room: "Room 203" },
        { day: "Tuesday", time: "10:30 - 11:30", subject: "Chemistry", teacher: "Sarah Wilson", room: "Lab 2" },
        { day: "Wednesday", time: "9:00 - 10:00", subject: "Mathematics", teacher: "Jane Teacher", room: "Room 101" },
      ],
    },
    {
      id: "child-2",
      fullName: "Charlie Johnson",
      email: "charlie@example.com",
      className: "Grade 8A",
      birthDate: "2010-03-22",
      status: "Active",
      teacher: "Mike Brown",
      scores: [
        { subject: "Mathematics", score: 78, maxScore: 100, date: "2024-01-15", teacher: "Mike Brown" },
        { subject: "Science", score: 82, maxScore: 100, date: "2024-01-14", teacher: "Lisa Green" },
        { subject: "English", score: 88, maxScore: 100, date: "2024-01-13", teacher: "John Educator" },
      ],
      assignments: [
        {
          id: 1,
          title: "Basic Algebra",
          subject: "Mathematics",
          status: "Submitted",
          dueDate: "2024-01-20",
          score: 78,
        },
        { id: 2, title: "Science Project", subject: "Science", status: "Pending", dueDate: "2024-01-25", score: null },
      ],
      attendance: [
        { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
        { date: "2024-01-15", subject: "Science", status: "PRESENT" },
        { date: "2024-01-14", subject: "English", status: "PRESENT" },
      ],
      remarks: [
        {
          id: 1,
          teacher: "Mike Brown",
          subject: "Mathematics",
          remark: "Good progress, keep practicing",
          date: "2024-01-15",
        },
      ],
      transactions: [
        {
          id: 1,
          description: "Tuition Fee - January",
          amount: "$400",
          date: "2024-01-01",
          status: "Paid",
          type: "Tuition",
        },
        { id: 2, description: "Sports Equipment", amount: "$30", date: "2024-01-08", status: "Paid", type: "Sports" },
      ],
      schedule: [
        { day: "Monday", time: "9:00 - 10:00", subject: "Mathematics", teacher: "Mike Brown", room: "Room 201" },
        { day: "Monday", time: "10:30 - 11:30", subject: "Science", teacher: "Lisa Green", room: "Lab 3" },
        { day: "Tuesday", time: "9:00 - 10:00", subject: "English", teacher: "John Educator", room: "Room 203" },
      ],
    },
  ]

  const currentChild = children.find((child) => child.id === selectedChild) || children[0]

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "academics", label: "Academic Performance", icon: GraduationCap },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "schedule", label: "Class Schedule", icon: Calendar },
    { id: "transactions", label: "Financial Records", icon: DollarSign },
    { id: "remarks", label: "Teacher Remarks", icon: Users },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "ABSENT":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "LATE":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      Pending: "secondary",
      Submitted: "outline",
      Graded: "default",
    }
    return (
      <Badge variant={variants[status] || "default"} className="bg-blue-100 text-blue-800">
        {status}
      </Badge>
    )
  }

  const getOverallGrade = () => {
    const totalScore = currentChild.scores.reduce((sum, score) => sum + score.score, 0)
    const totalMaxScore = currentChild.scores.reduce((sum, score) => sum + score.maxScore, 0)
    return Math.round((totalScore / totalMaxScore) * 100)
  }

  const getAttendanceRate = () => {
    const presentCount = currentChild.attendance.filter((record) => record.status === "PRESENT").length
    return Math.round((presentCount / currentChild.attendance.length) * 100)
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-blue-900">Parent Dashboard</h1>
          <div className="flex items-center gap-4">
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48 border-blue-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.fullName} - {child.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Child Overview Card */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {currentChild.fullName} - Overview
                </CardTitle>
                <CardDescription>
                  {currentChild.className} • Class Teacher: {currentChild.teacher}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-700">Overall Grade</p>
                    <p className="text-3xl font-bold text-blue-900">{getOverallGrade()}%</p>
                    <Progress value={getOverallGrade()} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-700">Attendance Rate</p>
                    <p className="text-3xl font-bold text-blue-900">{getAttendanceRate()}%</p>
                    <Progress value={getAttendanceRate()} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-700">Assignments</p>
                    <p className="text-3xl font-bold text-blue-900">
                      {currentChild.assignments.filter((a) => a.status === "Submitted" || a.status === "Graded").length}
                      /{currentChild.assignments.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Subjects</p>
                      <p className="text-2xl font-bold text-blue-900">{currentChild.scores.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Pending Assignments</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {currentChild.assignments.filter((a) => a.status === "Pending").length}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Teacher Remarks</p>
                      <p className="text-2xl font-bold text-blue-900">{currentChild.remarks.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Pending Fees</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {currentChild.transactions.filter((t) => t.status === "Pending").length}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <p className="text-sm">New assignment submitted: English Essay</p>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <p className="text-sm">Grade received: Mathematics Quiz - 85/100</p>
                    <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <p className="text-sm">Teacher remark added for Physics</p>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Academic Performance - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Subject-wise Performance</CardTitle>
                <CardDescription>Detailed scores across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentChild.scores.map((score, index) => {
                        const percentage = Math.round((score.score / score.maxScore) * 100)
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{score.subject}</TableCell>
                            <TableCell>
                              {score.score}/{score.maxScore}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span>{percentage}%</span>
                                <Progress value={percentage} className="w-20 h-2" />
                              </div>
                            </TableCell>
                            <TableCell>{score.teacher}</TableCell>
                            <TableCell>{score.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  percentage >= 90
                                    ? "bg-green-100 text-green-800"
                                    : percentage >= 80
                                      ? "bg-blue-100 text-blue-800"
                                      : percentage >= 70
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }
                              >
                                {percentage >= 90
                                  ? "Excellent"
                                  : percentage >= 80
                                    ? "Good"
                                    : percentage >= 70
                                      ? "Average"
                                      : "Needs Improvement"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentChild.scores
                      .filter((score) => (score.score / score.maxScore) * 100 >= 85)
                      .map((score, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">{score.subject}</span>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round((score.score / score.maxScore) * 100)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentChild.scores
                      .filter((score) => (score.score / score.maxScore) * 100 < 80)
                      .map((score, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="font-medium">{score.subject}</span>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {Math.round((score.score / score.maxScore) * 100)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Assignments - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Assignments</CardTitle>
                <CardDescription>Track assignment progress and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentChild.assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.subject}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                          <TableCell>
                            {assignment.score ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {assignment.score}/100
                              </Badge>
                            ) : (
                              <span className="text-gray-400">Not graded</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Attendance Record - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Recent Attendance</CardTitle>
                <CardDescription>Attendance rate: {getAttendanceRate()}%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentChild.attendance.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(record.status)}
                              <span>{record.status}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Class Schedule - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Weekly Schedule</CardTitle>
                <CardDescription>{currentChild.className}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Room</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentChild.schedule.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.day}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.teacher}</TableCell>
                          <TableCell>{item.room}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Financial Records - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Transaction History</CardTitle>
                <CardDescription>Payment records and pending fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentChild.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={transaction.status === "Paid" ? "default" : "secondary"}
                              className={
                                transaction.status === "Paid"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "remarks" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Teacher Remarks - {currentChild.fullName}</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Teacher Remarks</CardTitle>
                <CardDescription>Feedback and comments from teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentChild.remarks.map((remark) => (
                    <div key={remark.id} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-blue-900">{remark.subject}</p>
                          <p className="text-sm text-blue-700">by {remark.teacher}</p>
                        </div>
                        <span className="text-xs text-gray-500">{remark.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{remark.remark}</p>
                    </div>
                  ))}
                  {currentChild.remarks.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No teacher remarks yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
