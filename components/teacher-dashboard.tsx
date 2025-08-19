"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import {
  BookOpen,
  FileText,
  Users,
  Calendar,
  Plus,
  Upload,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  Bell,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  GraduationCap,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface TeacherDashboardProps {
  user: any
  onLogout: () => void
}

const teacherData = {
  id: "teacher-1",
  fullName: "Jane Teacher",
  classrooms: [
    {
      id: "class-1",
      name: "Grade 10A",
      students: [
        {
          id: "student-1",
          fullName: "Alice Johnson",
          email: "alice@example.com",
          birthDate: "2008-05-15",
          guardianName: "Mary Johnson",
          guardianEmail: "mary@example.com",
          guardianPhone: "+1234567890",
          status: "Active",
          scores: [
            { subject: "Mathematics", score: 85, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
            { subject: "Physics", score: 78, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
          ],
          assignments: [
            {
              id: 1,
              title: "Algebra Quiz",
              subject: "Mathematics",
              status: "Submitted",
              dueDate: "2024-01-20",
              score: 85,
            },
            {
              id: 2,
              title: "Physics Lab Report",
              subject: "Physics",
              status: "Pending",
              dueDate: "2024-01-25",
              score: null,
            },
          ],
          attendance: [
            { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
            { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
            { date: "2024-01-14", subject: "English", status: "LATE" },
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
          ],
        },
        {
          id: "student-2",
          fullName: "Bob Smith",
          email: "bob@example.com",
          birthDate: "2008-03-22",
          guardianName: "John Smith",
          guardianEmail: "john@example.com",
          guardianPhone: "+1234567891",
          status: "Active",
          scores: [
            { subject: "Mathematics", score: 78, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
            { subject: "Physics", score: 82, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
          ],
          assignments: [
            {
              id: 1,
              title: "Algebra Quiz",
              subject: "Mathematics",
              status: "Submitted",
              dueDate: "2024-01-20",
              score: 78,
            },
            {
              id: 2,
              title: "Physics Lab Report",
              subject: "Physics",
              status: "Submitted",
              dueDate: "2024-01-25",
              score: 82,
            },
          ],
          attendance: [
            { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
            { date: "2024-01-15", subject: "Physics", status: "ABSENT" },
            { date: "2024-01-14", subject: "English", status: "PRESENT" },
          ],
          remarks: [
            {
              id: 1,
              teacher: "Jane Teacher",
              subject: "Mathematics",
              remark: "Good progress, keep it up",
              date: "2024-01-15",
            },
          ],
        },
        {
          id: "student-3",
          fullName: "Charlie Brown",
          email: "charlie@example.com",
          birthDate: "2008-07-10",
          guardianName: "Sarah Brown",
          guardianEmail: "sarah@example.com",
          guardianPhone: "+1234567892",
          status: "Active",
          scores: [
            { subject: "Mathematics", score: 92, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
            { subject: "Physics", score: 88, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
          ],
          assignments: [
            {
              id: 1,
              title: "Algebra Quiz",
              subject: "Mathematics",
              status: "Submitted",
              dueDate: "2024-01-20",
              score: 92,
            },
            {
              id: 2,
              title: "Physics Lab Report",
              subject: "Physics",
              status: "Submitted",
              dueDate: "2024-01-25",
              score: 88,
            },
          ],
          attendance: [
            { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
            { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
            { date: "2024-01-14", subject: "English", status: "PRESENT" },
          ],
          remarks: [
            {
              id: 1,
              teacher: "Jane Teacher",
              subject: "Mathematics",
              remark: "Outstanding student, shows great potential",
              date: "2024-01-15",
            },
          ],
        },
      ],
    },
    {
      id: "class-2",
      name: "Grade 10B",
      students: [
        {
          id: "student-4",
          fullName: "Diana Prince",
          email: "diana@example.com",
          birthDate: "2008-01-18",
          guardianName: "Steve Prince",
          guardianEmail: "steve@example.com",
          guardianPhone: "+1234567893",
          status: "Active",
          scores: [
            { subject: "Mathematics", score: 90, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
            { subject: "Physics", score: 85, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
          ],
          assignments: [
            {
              id: 1,
              title: "Algebra Quiz",
              subject: "Mathematics",
              status: "Submitted",
              dueDate: "2024-01-20",
              score: 90,
            },
          ],
          attendance: [
            { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
            { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
          ],
          remarks: [],
        },
        {
          id: "student-5",
          fullName: "Edward Norton",
          email: "edward@example.com",
          birthDate: "2008-09-05",
          guardianName: "Helen Norton",
          guardianEmail: "helen@example.com",
          guardianPhone: "+1234567894",
          status: "Active",
          scores: [
            { subject: "Mathematics", score: 75, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
            { subject: "Physics", score: 80, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
          ],
          assignments: [
            {
              id: 1,
              title: "Algebra Quiz",
              subject: "Mathematics",
              status: "Pending",
              dueDate: "2024-01-20",
              score: null,
            },
          ],
          attendance: [
            { date: "2024-01-15", subject: "Mathematics", status: "LATE" },
            { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
          ],
          remarks: [
            {
              id: 1,
              teacher: "Jane Teacher",
              subject: "Mathematics",
              remark: "Needs to improve punctuality",
              date: "2024-01-15",
            },
          ],
        },
      ],
    },
  ],
  subjects: [
    { id: "subject-1", name: "Mathematics", teacherId: "teacher-1" },
    { id: "subject-2", name: "Physics", teacherId: "teacher-1" },
  ],
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState("classrooms")

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", teacherId: "teacher-1", createdAt: "2024-01-15" },
    { id: 2, name: "Physics", teacherId: "teacher-1", createdAt: "2024-01-15" },
  ])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Quiz",
      description: "Basic algebra problems covering linear equations",
      classId: "class-1",
      className: "Grade 10A",
      teacherId: "teacher-1",
      createdAt: "2024-01-15",
      submissions: [
        {
          id: "sub-1",
          studentId: "student-1",
          studentName: "Alice Johnson",
          content: "Submitted",
          createdAt: "2024-01-16",
        },
        {
          id: "sub-2",
          studentId: "student-2",
          studentName: "Bob Smith",
          content: "Submitted",
          createdAt: "2024-01-17",
        },
      ],
    },
  ])

  const [scores, setScores] = useState([
    { id: "score-1", studentId: "student-1", studentName: "Alice Johnson", subjectId: "subject-1", score: 85 },
    { id: "score-2", studentId: "student-2", studentName: "Bob Smith", subjectId: "subject-1", score: 78 },
  ])

  const [classAnnouncements, setClassAnnouncements] = useState([
    {
      id: "ann-1",
      title: "Math Test Next Week",
      details: "Prepare for the algebra test scheduled for next Friday",
      classId: "class-1",
      className: "Grade 10A",
      createdAt: "2024-01-20",
      priority: "High",
      targetAudience: "Students",
      createdBy: "Jane Teacher",
    },
  ])

  const [schedules, setSchedules] = useState([
    {
      id: "sched-1",
      title: "Mathematics Class",
      description: "Regular mathematics class",
      date: "2024-01-22",
      time: "09:00",
      duration: "1 hour",
      classId: "class-1",
      className: "Grade 10A",
      subject: "Mathematics",
      type: "Class",
      isCompleted: false,
      createdBy: "Jane Teacher",
    },
  ])

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Chapter 1: Introduction to Algebra",
      subject: "Mathematics",
      type: "PDF",
      uploadDate: "2024-01-15",
    },
    { id: 2, title: "Physics Lab Manual", subject: "Physics", type: "Document", uploadDate: "2024-01-14" },
  ])

  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", class: "Grade 10A", attendance: "PRESENT", score: 85 },
    { id: 2, name: "Bob Smith", class: "Grade 10A", attendance: "ABSENT", score: 78 },
    { id: 3, name: "Charlie Brown", class: "Grade 10A", attendance: "LATE", score: 92 },
  ])

  const sidebarItems = [
    { id: "classrooms", label: "My Classrooms", icon: BookOpen },
    { id: "students", label: "Student Management", icon: Users },
    { id: "subjects", label: "My Subjects", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "scoring", label: "Student Scoring", icon: Users },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "events", label: "Class Events", icon: Calendar },
    { id: "announcements", label: "Class Announcements", icon: Bell },
    { id: "materials", label: "Materials", icon: Upload },
  ]

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "ABSENT":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "LATE":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "EXCUSED":
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const handleAttendanceChange = (studentId: number, newStatus: string) => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, attendance: newStatus } : student)))
  }

  const saveAttendance = () => {
    alert("Attendance saved successfully!")
  }

  const handleUpdateSubject = (id: number, updatedData: any) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, ...updatedData } : subject)))
  }

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const handleAddRemark = (studentId: string, remarkData: any) => {
    // In a real app, this would update the backend
    alert(`Remark added for student: ${remarkData.remark}`)
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
          <h1 className="text-3xl font-bold text-blue-900">Teacher Dashboard</h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {activeTab === "classrooms" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">My Classrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacherData.classrooms.map((classroom) => (
                <Card key={classroom.id} className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-900">{classroom.name}</CardTitle>
                    <CardDescription>{classroom.students.length} students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-700">Students:</h4>
                      <div className="space-y-1">
                        {classroom.students.slice(0, 3).map((student) => (
                          <div key={student.id} className="text-sm text-gray-600">
                            {student.fullName}
                          </div>
                        ))}
                        {classroom.students.length > 3 && (
                          <div className="text-sm text-gray-500">+{classroom.students.length - 3} more students</div>
                        )}
                      </div>
                      <ViewClassroomStudentsDialog classroom={classroom} onAddRemark={handleAddRemark} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Student Management</h2>

            <div className="grid gap-6">
              {teacherData.classrooms.map((classroom) => (
                <Card key={classroom.id} className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {classroom.name}
                    </CardTitle>
                    <CardDescription>{classroom.students.length} students in this classroom</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Guardian</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {classroom.students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.fullName}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>{student.guardianName}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={student.status === "Active" ? "default" : "secondary"}
                                  className="bg-blue-100 text-blue-800"
                                >
                                  {student.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <ViewStudentDetailDialog student={student} />
                                  <AddRemarkDialog student={student} onAddRemark={handleAddRemark} />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "subjects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">My Subjects</h2>
              <CreateSubjectDialog
                onSubjectCreated={(newSubject) => setSubjects([...subjects, { ...newSubject, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject Name</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>{subject.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <EditSubjectDialog
                                subject={subject}
                                onUpdate={(data) => handleUpdateSubject(subject.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteSubject(subject.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

        {activeTab === "assignments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Assignments</h2>
              <CreateAssignmentDialog
                onAssignmentCreated={(newAssignment) =>
                  setAssignments([...assignments, { ...newAssignment, id: Date.now(), submissions: [] }])
                }
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.className}</TableCell>
                          <TableCell>{assignment.createdAt}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {assignment.submissions.length} submissions
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <ViewSubmissionsDialog assignment={assignment} />
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

        {activeTab === "scoring" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Student Scoring</h2>
              <CreateScoreDialog
                onScoreCreated={(newScore) => setScores([...scores, { ...newScore, id: Date.now().toString() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Student Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scores.map((score) => (
                        <TableRow key={score.id}>
                          <TableCell className="font-medium">{score.studentName}</TableCell>
                          <TableCell>Mathematics</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {score.score}/100
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
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

        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Class Events</h2>
              <CreateEventDialog
                onEventCreated={(newEvent) => setSchedules([...schedules, { ...newEvent, id: Date.now().toString() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Scheduled Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell className="font-medium">{schedule.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant={schedule.type === "Exam" ? "destructive" : "default"}
                              className={schedule.type === "Exam" ? "" : "bg-blue-100 text-blue-800"}
                            >
                              {schedule.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{schedule.date}</TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell>{schedule.className}</TableCell>
                          <TableCell>{schedule.subject}</TableCell>
                          <TableCell>
                            <Badge
                              variant={schedule.isCompleted ? "default" : "secondary"}
                              className={schedule.isCompleted ? "bg-blue-100 text-blue-800" : ""}
                            >
                              {schedule.isCompleted ? "Completed" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSchedules(schedules.filter((s) => s.id !== schedule.id))
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Classroom Announcements</h2>
              <CreateClassAnnouncementDialog
                onAnnouncementCreated={(newAnn) =>
                  setClassAnnouncements([...classAnnouncements, { ...newAnn, id: Date.now().toString() }])
                }
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classAnnouncements.map((announcement) => (
                        <TableRow key={announcement.id}>
                          <TableCell className="font-medium">{announcement.title}</TableCell>
                          <TableCell>{announcement.className}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                announcement.priority === "High"
                                  ? "destructive"
                                  : announcement.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className={
                                announcement.priority === "High"
                                  ? ""
                                  : announcement.priority === "Medium"
                                    ? "bg-blue-100 text-blue-800"
                                    : ""
                              }
                            >
                              {announcement.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{announcement.targetAudience}</TableCell>
                          <TableCell>{announcement.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <EditAnnouncementDialog
                                announcement={announcement}
                                onUpdate={(data) => {
                                  setClassAnnouncements(
                                    classAnnouncements.map((ann) =>
                                      ann.id === announcement.id ? { ...ann, ...data } : ann,
                                    ),
                                  )
                                }}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setClassAnnouncements(classAnnouncements.filter((ann) => ann.id !== announcement.id))
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Attendance Management</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="10a">
                  <SelectTrigger className="w-full sm:w-40 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10a">Grade 10A</SelectItem>
                    <SelectItem value="10b">Grade 10B</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" className="w-full sm:w-40 border-blue-200" />
              </div>
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Student Attendance</CardTitle>
                <CardDescription>Mark attendance for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getAttendanceIcon(student.attendance)}
                              <span>{student.attendance}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={student.attendance}
                              onValueChange={(value) => handleAttendanceChange(student.id, value)}
                            >
                              <SelectTrigger className="w-32 border-blue-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PRESENT">Present</SelectItem>
                                <SelectItem value="ABSENT">Absent</SelectItem>
                                <SelectItem value="LATE">Late</SelectItem>
                                <SelectItem value="EXCUSED">Excused</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Button onClick={saveAttendance} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Subject Materials</h2>
              <UploadMaterialDialog
                onMaterialUploaded={(newMaterial) => setMaterials([...materials, { ...newMaterial, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Uploaded Materials</CardTitle>
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
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {material.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{material.uploadDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                Delete
                              </Button>
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
      </div>
    </DashboardLayout>
  )
}

// Enhanced Classroom Students Dialog
function ViewClassroomStudentsDialog({
  classroom,
  onAddRemark,
}: { classroom: any; onAddRemark: (studentId: string, remarkData: any) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">View All Students</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {classroom.name} - Student Details
          </DialogTitle>
          <DialogDescription>Complete student information and management</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Students in {classroom.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Guardian</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classroom.students.map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.fullName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.guardianName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={student.status === "Active" ? "default" : "secondary"}
                            className="bg-blue-100 text-blue-800"
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <ViewStudentDetailDialog student={student} />
                            <AddRemarkDialog student={student} onAddRemark={onAddRemark} />
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
      </DialogContent>
    </Dialog>
  )
}

// Enhanced Student Detail Dialog for Teachers
function ViewStudentDetailDialog({ student }: { student: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Student Details - {student.fullName}
          </DialogTitle>
          <DialogDescription>Complete academic and personal information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-blue-700">Email:</Label>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Birth Date:</Label>
                  <p className="text-sm text-gray-600">{student.birthDate}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Status:</Label>
                  <Badge
                    variant={student.status === "Active" ? "default" : "secondary"}
                    className="bg-blue-100 text-blue-800"
                  >
                    {student.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Label className="font-medium text-blue-700">Guardian Information:</Label>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Name: {student.guardianName}</p>
                  <p className="text-sm text-gray-600">Email: {student.guardianEmail}</p>
                  <p className="text-sm text-gray-600">Phone: {student.guardianPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Scores */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Academic Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.scores.map((score: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{score.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>
                              {score.score}/{score.maxScore}
                            </span>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {Math.round((score.score / score.maxScore) * 100)}%
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{score.teacher}</TableCell>
                        <TableCell>{score.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.assignments.map((assignment: any) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={assignment.status === "Submitted" ? "default" : "secondary"}
                            className={assignment.status === "Submitted" ? "bg-blue-100 text-blue-800" : ""}
                          >
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
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

          {/* Teacher Remarks */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Teacher Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.remarks && student.remarks.length > 0 ? (
                  student.remarks.map((remark: any) => (
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
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No remarks yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Recent Attendance</CardTitle>
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
                    {student.attendance.map((record: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "PRESENT"
                                ? "default"
                                : record.status === "LATE"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={record.status === "PRESENT" ? "bg-blue-100 text-blue-800" : ""}
                          >
                            {record.status}
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
      </DialogContent>
    </Dialog>
  )
}

// Add Remark Dialog
function AddRemarkDialog({
  student,
  onAddRemark,
}: { student: any; onAddRemark: (studentId: string, remarkData: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    remark: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddRemark(student.id, {
      ...formData,
      teacher: "Jane Teacher", // In real app, get from user context
    })
    setFormData({
      subject: "",
      remark: "",
      date: new Date().toISOString().split("T")[0],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Add Remark for {student.fullName}</DialogTitle>
          <DialogDescription>Add a teacher remark or comment about this student</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-blue-700">
              Subject
            </Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remark" className="text-blue-700">
              Remark
            </Label>
            <Textarea
              id="remark"
              placeholder="Enter your remark about the student..."
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-blue-700">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Remark
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Keep all other existing dialog components with blue theme...
function CreateSubjectDialog({ onSubjectCreated }: { onSubjectCreated: (subject: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "teacher-1",
    createdAt: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubjectCreated(formData)
    setFormData({ name: "", teacherId: "teacher-1", createdAt: new Date().toISOString().split("T")[0] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Subject</DialogTitle>
          <DialogDescription>Add a new subject to teach</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-700">
              Subject Name
            </Label>
            <Input
              id="name"
              placeholder="Enter subject name (e.g., Mathematics)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Subject
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditSubjectDialog({ subject, onUpdate }: { subject: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: subject.name,
    teacherId: subject.teacherId,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Edit Subject</DialogTitle>
          <DialogDescription>Update subject information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-700">
              Subject Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Subject
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateAssignmentDialog({ onAssignmentCreated }: { onAssignmentCreated: (assignment: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    className: "",
    createdAt: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAssignmentCreated(formData)
    setFormData({
      title: "",
      description: "",
      classId: "",
      className: "",
      createdAt: new Date().toISOString().split("T")[0],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Assignment</DialogTitle>
          <DialogDescription>Create a new assignment for your classroom</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-blue-700">
              Assignment Title
            </Label>
            <Input
              id="title"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classroom" className="text-blue-700">
              Classroom
            </Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => {
                const classroom = teacherData.classrooms.find((c) => c.id === value)
                setFormData({ ...formData, classId: value, className: classroom?.name || "" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {teacherData.classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-blue-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Assignment description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Assignment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateScoreDialog({ onScoreCreated }: { onScoreCreated: (score: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    subjectId: "subject-1",
    score: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onScoreCreated(formData)
    setFormData({ studentId: "", studentName: "", subjectId: "subject-1", score: 0 })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Score
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Add Student Score</DialogTitle>
          <DialogDescription>Record a score for a student</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student" className="text-blue-700">
              Student
            </Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) => {
                const student = teacherData.classrooms.flatMap((c) => c.students).find((s) => s.id === value)
                setFormData({ ...formData, studentId: value, studentName: student?.fullName || "" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {teacherData.classrooms.flatMap((classroom) =>
                  classroom.students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.fullName} ({classroom.name})
                    </SelectItem>
                  )),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score" className="text-blue-700">
              Score (out of 100)
            </Label>
            <Input
              id="score"
              type="number"
              min="0"
              max="100"
              placeholder="Enter score"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: Number.parseInt(e.target.value) || 0 })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Score
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateEventDialog({ onEventCreated }: { onEventCreated: (event: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    classId: "",
    className: "",
    subject: "",
    type: "Class",
    isCompleted: false,
    createdBy: "Jane Teacher",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEventCreated(formData)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      classId: "",
      className: "",
      subject: "",
      type: "Class",
      isCompleted: false,
      createdBy: "Jane Teacher",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create Classroom Event</DialogTitle>
          <DialogDescription>Schedule an event for your classroom</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-blue-700">
              Event Title
            </Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-blue-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classroom" className="text-blue-700">
              Classroom
            </Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => {
                const selectedClassroom = teacherData.classrooms.find((c) => c.id === value)
                setFormData({ ...formData, classId: value, className: selectedClassroom?.name || "" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {teacherData.classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-blue-700">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-blue-700">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-blue-700">
              Duration
            </Label>
            <Input
              id="duration"
              placeholder="e.g., 2 hours"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-blue-700">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-blue-700">
              Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class">Class</SelectItem>
                <SelectItem value="Exam">Exam</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateClassAnnouncementDialog({
  onAnnouncementCreated,
}: { onAnnouncementCreated: (announcement: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    classId: "",
    className: "",
    priority: "Medium",
    targetAudience: "Students",
    createdAt: new Date().toISOString().split("T")[0],
    createdBy: "Jane Teacher",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnnouncementCreated(formData)
    setFormData({
      title: "",
      details: "",
      classId: "",
      className: "",
      priority: "Medium",
      targetAudience: "Students",
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "Jane Teacher",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create Classroom Announcement</DialogTitle>
          <DialogDescription>Create an announcement for your classroom</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-blue-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter announcement title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classroom" className="text-blue-700">
              Classroom
            </Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => {
                const selectedClassroom = teacherData.classrooms.find((c) => c.id === value)
                setFormData({ ...formData, classId: value, className: selectedClassroom?.name || "" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {teacherData.classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="text-blue-700">
              Details
            </Label>
            <Textarea
              id="details"
              placeholder="Enter announcement details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-blue-700">
              Priority
            </Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-blue-700">
              Target Audience
            </Label>
            <Select
              value={formData.targetAudience}
              onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Parents">Parents</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Announcement
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditAnnouncementDialog({ announcement, onUpdate }: { announcement: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: announcement.title,
    details: announcement.details,
    priority: announcement.priority,
    targetAudience: announcement.targetAudience,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Edit Announcement</DialogTitle>
          <DialogDescription>Update announcement information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-blue-700">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="text-blue-700">
              Details
            </Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-blue-700">
              Priority
            </Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Announcement
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewSubmissionsDialog({ assignment }: { assignment: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          View Submissions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-900">{assignment.title} - Submissions</DialogTitle>
          <DialogDescription>{assignment.className}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignment.submissions.map((submission: any) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.studentName}</TableCell>
                    <TableCell>{submission.createdAt}</TableCell>
                    <TableCell>{submission.content}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {assignment.submissions.length === 0 && <p className="text-center text-gray-500 py-4">No submissions yet</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function UploadMaterialDialog({ onMaterialUploaded }: { onMaterialUploaded: (material: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    type: "",
    fileUrl: "",
    uploadDate: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onMaterialUploaded(formData)
    setFormData({ title: "", subject: "", type: "", fileUrl: "", uploadDate: new Date().toISOString().split("T")[0] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Upload Study Material</DialogTitle>
          <DialogDescription>Upload materials for your students</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="materialTitle" className="text-blue-700">
              Title
            </Label>
            <Input
              id="materialTitle"
              placeholder="Enter material title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialSubject" className="text-blue-700">
              Subject
            </Label>
            <Select
              id="materialSubject"
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialType" className="text-blue-700">
              Type
            </Label>
            <Select
              id="materialType"
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Document">Document</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl" className="text-blue-700">
              File URL
            </Label>
            <Input
              id="fileUrl"
              type="url"
              placeholder="Enter file URL"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Upload Material
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
