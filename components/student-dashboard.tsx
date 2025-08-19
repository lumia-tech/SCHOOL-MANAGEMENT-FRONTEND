"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  FileText,
  Upload,
  Calendar,
  DollarSign,
  LogOut,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Textarea } from "@/components/ui/textarea"

interface StudentDashboardProps {
  user: any
  onLogout: () => void
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("subjects")
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Quiz",
      description: "Basic algebra problems covering linear equations",
      classId: "class-1",
      teacherId: "teacher-1",
      createdAt: "2024-01-15",
      dueDate: "2024-01-20",
      status: "Pending",
      submission: null,
    },
    {
      id: 2,
      title: "Newton's Laws Essay",
      description: "Write an essay about Newton's three laws of motion",
      classId: "class-1",
      teacherId: "teacher-1",
      createdAt: "2024-01-12",
      dueDate: "2024-01-18",
      status: "Submitted",
      submission: {
        id: "sub-1",
        content: "Essay content submitted",
        createdAt: "2024-01-17",
      },
    },
  ])

  // Mock data
  const subjects = [
    { id: 1, name: "Mathematics", teacher: "John Doe", grade: "A-", progress: 85 },
    { id: 2, name: "Physics", teacher: "Jane Smith", grade: "B+", progress: 78 },
    { id: 3, name: "English", teacher: "Bob Johnson", grade: "A", progress: 92 },
  ]

  const materials = [
    {
      id: 1,
      title: "Chapter 1: Introduction to Algebra",
      subject: "Mathematics",
      type: "PDF",
      uploadDate: "2024-01-15",
    },
    { id: 2, title: "Physics Lab Manual", subject: "Physics", type: "Document", uploadDate: "2024-01-14" },
    { id: 3, title: "Romeo and Juliet Study Guide", subject: "English", type: "PDF", uploadDate: "2024-01-16" },
  ]

  const attendance = [
    { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
    { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
    { date: "2024-01-14", subject: "English", status: "LATE" },
    { date: "2024-01-14", subject: "Mathematics", status: "ABSENT" },
  ]

  const transactions = [
    { id: 1, description: "Tuition Fee - January", amount: "$500", date: "2024-01-01", status: "Paid" },
    { id: 2, description: "Library Books", amount: "$50", date: "2024-01-10", status: "Pending" },
    { id: 3, description: "Lab Equipment Fee", amount: "$75", date: "2024-01-05", status: "Paid" },
  ]

  const schedule = [
    { day: "Monday", time: "9:00 - 10:00", subject: "Mathematics", teacher: "John Doe", room: "Room 101" },
    { day: "Monday", time: "10:30 - 11:30", subject: "Physics", teacher: "Jane Smith", room: "Lab 1" },
    { day: "Tuesday", time: "9:00 - 10:00", subject: "English", teacher: "Bob Johnson", room: "Room 203" },
  ]

  const sidebarItems = [
    { id: "subjects", label: "My Subjects", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "materials", label: "Materials", icon: Download },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "transactions", label: "Transactions", icon: DollarSign },
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
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const handleAssignmentSubmit = (assignmentId: number, submissionData: any) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              status: "Submitted",
              submission: {
                id: Date.now().toString(),
                content: submissionData.content,
                createdAt: new Date().toISOString().split("T")[0],
              },
            }
          : assignment,
      ),
    )
  }

  const downloadMaterial = (materialId: number) => {
    // Mock download functionality
    alert("Material downloaded successfully!")
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
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {activeTab === "subjects" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.id}>
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>Teacher: {subject.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Grade:</span>
                      <Badge variant="outline">{subject.grade}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Assignments</h2>

            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{assignment.description}</TableCell>
                          <TableCell>{assignment.createdAt}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                          <TableCell>
                            {assignment.status === "Pending" ? (
                              <SubmitAssignmentDialog
                                assignment={assignment}
                                onSubmit={(submissionData) => handleAssignmentSubmit(assignment.id, submissionData)}
                              />
                            ) : (
                              <ViewSubmissionDialog assignment={assignment} />
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

        {activeTab === "materials" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Study Materials</h2>

            <Card>
              <CardHeader>
                <CardTitle>Available Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">{material.title}</TableCell>
                          <TableCell>{material.subject}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{material.type}</Badge>
                          </TableCell>
                          <TableCell>{material.uploadDate}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => downloadMaterial(material.id)}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
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
            <h2 className="text-2xl font-bold">Attendance Record</h2>

            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
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
                      {attendance.map((record, index) => (
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
            <h2 className="text-2xl font-bold">Class Schedule</h2>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
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
                      {schedule.map((item, index) => (
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
            <h2 className="text-2xl font-bold">Financial Transactions</h2>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.status === "Paid" ? "default" : "secondary"}>
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
      </div>
    </DashboardLayout>
  )
}

function SubmitAssignmentDialog({ assignment, onSubmit }: { assignment: any; onSubmit: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    file: null as File | null,
    content: "",
    comments: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      content: formData.content || "File submitted",
      comments: formData.comments,
    })
    setFormData({ file: null, content: "", comments: "" })
    setOpen(false)
    alert("Assignment submitted successfully!")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogDescription>
            {assignment.title} - Due: {assignment.dueDate}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Assignment Content</Label>
            <Textarea
              id="content"
              placeholder="Enter your assignment content or describe your submission..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Assignment File (Optional)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments (Optional)</Label>
            <Input
              id="comments"
              placeholder="Any additional comments..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Assignment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewSubmissionDialog({ assignment }: { assignment: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Submission
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{assignment.title} - Submission</DialogTitle>
          <DialogDescription>Submitted on: {assignment.submission?.createdAt}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Content:</Label>
            <p className="text-sm text-gray-600 mt-1">{assignment.submission?.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
