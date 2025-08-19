"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Bell,
  Eye,
  GraduationCap,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface AdminDashboardProps {
  user: any
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Enhanced student data with scores across subjects
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice@example.com",
      role: "STUDENT",
      status: "Active",
      birthDate: "2008-05-15",
      guardianName: "Mary Johnson",
      guardianEmail: "mary@example.com",
      guardianPhone: "+1234567890",
      classId: "class-1",
      className: "Grade 10A",
      scores: [
        { subject: "Mathematics", score: 85, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
        { subject: "Physics", score: 78, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
        { subject: "English", score: 92, maxScore: 100, date: "2024-01-13", teacher: "John Educator" },
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
      ],
      attendance: [
        { date: "2024-01-15", subject: "Mathematics", status: "PRESENT" },
        { date: "2024-01-15", subject: "Physics", status: "PRESENT" },
        { date: "2024-01-14", subject: "English", status: "LATE" },
      ],
    },
    {
      id: 2,
      fullName: "Bob Smith",
      email: "bob@example.com",
      role: "STUDENT",
      status: "Active",
      birthDate: "2008-03-22",
      guardianName: "John Smith",
      guardianEmail: "john@example.com",
      guardianPhone: "+1234567891",
      classId: "class-1",
      className: "Grade 10A",
      scores: [
        { subject: "Mathematics", score: 78, maxScore: 100, date: "2024-01-15", teacher: "Jane Teacher" },
        { subject: "Physics", score: 82, maxScore: 100, date: "2024-01-14", teacher: "Jane Teacher" },
        { subject: "English", score: 88, maxScore: 100, date: "2024-01-13", teacher: "John Educator" },
      ],
      assignments: [
        { id: 1, title: "Algebra Quiz", subject: "Mathematics", status: "Submitted", dueDate: "2024-01-20", score: 78 },
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
    },
  ])

  const [teachers, setTeachers] = useState([
    {
      id: 3,
      fullName: "Jane Teacher",
      email: "jane@example.com",
      role: "TEACHER",
      status: "Active",
      phone: "+1234567892",
      subjects: ["Mathematics", "Physics"],
      classrooms: ["Grade 10A", "Grade 10B"],
      assignedClassroomId: "class-1",
    },
    {
      id: 4,
      fullName: "John Educator",
      email: "john.edu@example.com",
      role: "TEACHER",
      status: "Active",
      phone: "+1234567893",
      subjects: ["English", "History"],
      classrooms: ["Grade 9A"],
      assignedClassroomId: "class-2",
    },
  ])

  const [parents, setParents] = useState([
    {
      id: 5,
      fullName: "Mary Johnson",
      email: "mary@example.com",
      role: "PARENT",
      status: "Active",
      phone: "+1234567890",
      wards: ["Alice Johnson"],
      wardIds: [1],
    },
    {
      id: 6,
      fullName: "John Smith",
      email: "john@example.com",
      role: "PARENT",
      status: "Active",
      phone: "+1234567891",
      wards: ["Bob Smith"],
      wardIds: [2],
    },
  ])

  const [classrooms, setClassrooms] = useState([
    {
      id: "class-1",
      name: "Grade 10A",
      teacherId: "teacher-1",
      teacherName: "Jane Teacher",
      students: 30,
      capacity: 35,
      studentIds: [1, 2],
      schedule: [
        { day: "Monday", time: "9:00 - 10:00", subject: "Mathematics", room: "Room 101" },
        { day: "Monday", time: "10:30 - 11:30", subject: "Physics", room: "Lab 1" },
        { day: "Tuesday", time: "9:00 - 10:00", subject: "English", room: "Room 203" },
      ],
      assignments: [
        { id: 1, title: "Algebra Quiz", subject: "Mathematics", dueDate: "2024-01-20", createdBy: "Jane Teacher" },
        { id: 2, title: "Physics Lab Report", subject: "Physics", dueDate: "2024-01-25", createdBy: "Jane Teacher" },
      ],
    },
    {
      id: "class-2",
      name: "Grade 9B",
      teacherId: "teacher-2",
      teacherName: "John Educator",
      students: 28,
      capacity: 30,
      studentIds: [],
      schedule: [
        { day: "Monday", time: "11:00 - 12:00", subject: "English", room: "Room 205" },
        { day: "Tuesday", time: "10:00 - 11:00", subject: "History", room: "Room 206" },
      ],
      assignments: [],
    },
  ])

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", teacherId: "teacher-1", teacherName: "Jane Teacher", createdAt: "2024-01-15" },
    { id: 2, name: "Physics", teacherId: "teacher-1", teacherName: "Jane Teacher", createdAt: "2024-01-15" },
    { id: 3, name: "English", teacherId: "teacher-2", teacherName: "John Educator", createdAt: "2024-01-16" },
  ])

  const [transactions, setTransactions] = useState([
    { id: 1, student: "Alice Johnson", amount: "$500", type: "Tuition", date: "2024-01-15", status: "Paid" },
    { id: 2, student: "Bob Smith", amount: "$300", type: "Books", date: "2024-01-14", status: "Pending" },
  ])

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "School Holiday Notice",
      details: "School will be closed on January 26th for Republic Day.",
      createdAt: "2024-01-20",
      priority: "High",
      createdBy: "Admin",
      targetAudience: "All",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      details: "Parent-teacher meetings will be held on February 15th from 10 AM to 4 PM.",
      createdAt: "2024-01-18",
      priority: "Medium",
      createdBy: "Admin",
      targetAudience: "Parents",
    },
  ])

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: "Mathematics Exam",
      description: "Final examination for Mathematics subject",
      date: "2024-02-15",
      time: "09:00",
      duration: "2 hours",
      classId: "class-1",
      className: "Grade 10A",
      subject: "Mathematics",
      type: "Exam",
      createdBy: "Admin",
    },
    {
      id: 2,
      title: "Science Fair",
      description: "Annual science fair presentation",
      date: "2024-02-20",
      time: "10:00",
      duration: "4 hours",
      classId: "all",
      className: "All Classes",
      subject: "Science",
      type: "Event",
      createdBy: "Admin",
    },
  ])

  // Mock data
  const stats = [
    { title: "Total Students", value: students.length.toString(), icon: Users, color: "text-blue-600" },
    { title: "Total Teachers", value: teachers.length.toString(), icon: Users, color: "text-blue-600" },
    { title: "Total Classrooms", value: classrooms.length.toString(), icon: BookOpen, color: "text-blue-600" },
    { title: "Revenue", value: "$45,678", icon: DollarSign, color: "text-blue-600" },
  ]

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Calendar },
    { id: "students", label: "Students", icon: Users },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "parents", label: "Parents", icon: Users },
    { id: "classrooms", label: "Classrooms", icon: BookOpen },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "transactions", label: "Transactions", icon: DollarSign },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "schedules", label: "Schedules", icon: Calendar },
  ]

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
  }

  const handleDeleteParent = (id: number) => {
    setParents(parents.filter((parent) => parent.id !== id))
  }

  const handleDeleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter((cls) => cls.id !== id))
  }

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const handleUpdateTransaction = (id: number, status: string) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const handleUpdateStudent = (id: number, updatedData: any) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, ...updatedData } : student)))
  }

  const handleUpdateTeacher = (id: number, updatedData: any) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, ...updatedData } : teacher)))
  }

  const handleUpdateClassroom = (id: string, updatedData: any) => {
    setClassrooms(classrooms.map((classroom) => (classroom.id === id ? { ...classroom, ...updatedData } : classroom)))
  }

  const handleUpdateSubject = (id: number, updatedData: any) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, ...updatedData } : subject)))
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
  }

  const handleUpdateAnnouncement = (id: number, updatedData: any) => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === id ? { ...announcement, ...updatedData } : announcement,
      ),
    )
  }

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const handleUpdateSchedule = (id: number, updatedData: any) => {
    setSchedules(schedules.map((schedule) => (schedule.id === id ? { ...schedule, ...updatedData } : schedule)))
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
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <p className="text-sm">New student Alice Johnson enrolled in Grade 10A</p>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <p className="text-sm">Teacher Jane Smith submitted grades for Mathematics</p>
                    <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Student Management</h2>
              <CreateStudentDialog
                onStudentCreated={(newStudent) => setStudents([...students, { ...newStudent, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Students</CardTitle>
                <CardDescription>Manage student records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Guardian</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.fullName}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.className}</TableCell>
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
                              <EditStudentDialog
                                student={student}
                                onUpdate={(data) => handleUpdateStudent(student.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteStudent(student.id)}>
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

        {activeTab === "teachers" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Teacher Management</h2>
              <CreateTeacherDialog
                onTeacherCreated={(newTeacher) => setTeachers([...teachers, { ...newTeacher, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Teachers</CardTitle>
                <CardDescription>Manage teacher records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">{teacher.fullName}</TableCell>
                          <TableCell>{teacher.email}</TableCell>
                          <TableCell>{teacher.phone}</TableCell>
                          <TableCell>{teacher.subjects.join(", ")}</TableCell>
                          <TableCell>
                            <Badge
                              variant={teacher.status === "Active" ? "default" : "secondary"}
                              className="bg-blue-100 text-blue-800"
                            >
                              {teacher.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <ViewTeacherDialog teacher={teacher} />
                              <EditTeacherDialog
                                teacher={teacher}
                                onUpdate={(data) => handleUpdateTeacher(teacher.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteTeacher(teacher.id)}>
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

        {activeTab === "parents" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Parent Management</h2>
              <CreateParentDialog
                onParentCreated={(newParent) => setParents([...parents, { ...newParent, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Parents</CardTitle>
                <CardDescription>Manage parent records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Wards</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell className="font-medium">{parent.fullName}</TableCell>
                          <TableCell>{parent.email}</TableCell>
                          <TableCell>{parent.phone}</TableCell>
                          <TableCell>{parent.wards.join(", ")}</TableCell>
                          <TableCell>
                            <Badge
                              variant={parent.status === "Active" ? "default" : "secondary"}
                              className="bg-blue-100 text-blue-800"
                            >
                              {parent.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <ViewParentDialog parent={parent} students={students} />
                              <EditParentDialog
                                parent={parent}
                                onUpdate={(data) => handleUpdateTeacher(parent.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteParent(parent.id)}>
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

        {activeTab === "classrooms" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Classroom Management</h2>
              <CreateClassroomDialog
                onClassroomCreated={(newClassroom) =>
                  setClassrooms([...classrooms, { ...newClassroom, id: `class-${Date.now()}` }])
                }
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Classrooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Classroom Name</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classrooms.map((classroom) => (
                        <TableRow key={classroom.id}>
                          <TableCell className="font-medium">{classroom.name}</TableCell>
                          <TableCell>{classroom.teacherName}</TableCell>
                          <TableCell>
                            {classroom.students}/{classroom.capacity}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={classroom.students >= classroom.capacity ? "destructive" : "default"}
                              className="bg-blue-100 text-blue-800"
                            >
                              {classroom.capacity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <ViewClassroomDetailDialog classroom={classroom} students={students} />
                              <EditClassroomDialog
                                classroom={classroom}
                                onUpdate={(data) => handleUpdateClassroom(classroom.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteClassroom(classroom.id)}>
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

        {activeTab === "subjects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Subject Management</h2>
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
                        <TableHead>Teacher</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>{subject.teacherName}</TableCell>
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

        {activeTab === "transactions" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Transaction Records</h2>
              <CreateTransactionDialog
                onTransactionCreated={(newTransaction) =>
                  setTransactions([...transactions, { ...newTransaction, id: Date.now() }])
                }
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.student}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={transaction.status === "Paid" ? "default" : "secondary"}
                              className="bg-blue-100 text-blue-800"
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUpdateTransaction(
                                    transaction.id,
                                    transaction.status === "Paid" ? "Pending" : "Paid",
                                  )
                                }
                              >
                                <Edit className="w-4 h-4" />
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
              <h2 className="text-2xl font-bold text-blue-900">School Announcements</h2>
              <CreateAnnouncementDialog
                onAnnouncementCreated={(newAnnouncement) =>
                  setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now() }])
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
                        <TableHead>Priority</TableHead>
                        <TableHead>Target Audience</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.map((announcement) => (
                        <TableRow key={announcement.id}>
                          <TableCell className="font-medium">{announcement.title}</TableCell>
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
                          <TableCell>{announcement.createdBy}</TableCell>
                          <TableCell>{announcement.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <ViewAnnouncementDialog announcement={announcement} />
                              <EditAnnouncementDialog
                                announcement={announcement}
                                onUpdate={(data) => handleUpdateAnnouncement(announcement.id, data)}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteAnnouncement(announcement.id)}
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

        {activeTab === "schedules" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Schedule Management</h2>
              <CreateScheduleDialog
                classrooms={classrooms}
                onScheduleCreated={(newSchedule) => setSchedules([...schedules, { ...newSchedule, id: Date.now() }])}
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Schedules</CardTitle>
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
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
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
                            <div className="flex space-x-2">
                              <ViewScheduleDialog schedule={schedule} />
                              <EditScheduleDialog
                                schedule={schedule}
                                classrooms={classrooms}
                                onUpdate={(data) => handleUpdateSchedule(schedule.id, data)}
                              />
                              <Button size="sm" variant="outline" onClick={() => handleDeleteSchedule(schedule.id)}>
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
      </div>
    </DashboardLayout>
  )
}

// Enhanced Student Detail Dialog
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
                  <Label className="font-medium text-blue-700">Classroom:</Label>
                  <p className="text-sm text-gray-600">{student.className}</p>
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

// Enhanced Classroom Detail Dialog
function ViewClassroomDetailDialog({ classroom, students }: { classroom: any; students: any[] }) {
  const [open, setOpen] = useState(false)
  const classroomStudents = students.filter((student) => classroom.studentIds.includes(student.id))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Classroom Details - {classroom.name}
          </DialogTitle>
          <DialogDescription>Complete classroom information with students, schedule, and assignments</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Classroom Info */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Classroom Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-medium text-blue-700">Teacher:</Label>
                  <p className="text-sm text-gray-600">{classroom.teacherName}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Students:</Label>
                  <p className="text-sm text-gray-600">
                    {classroom.students}/{classroom.capacity}
                  </p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Capacity:</Label>
                  <Badge
                    variant={classroom.students >= classroom.capacity ? "destructive" : "default"}
                    className="bg-blue-100 text-blue-800"
                  >
                    {classroom.capacity}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students in Classroom */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Students in Classroom</CardTitle>
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
                    {classroomStudents.map((student) => (
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
                          <ViewStudentDetailDialog student={student} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Class Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Room</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classroom.schedule.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.day}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell>{item.room}</TableCell>
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
              <CardTitle className="text-lg text-blue-900">Classroom Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Created By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classroom.assignments.map((assignment: any) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>{assignment.createdBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {classroom.assignments.length === 0 && (
                <p className="text-center text-gray-500 py-4">No assignments yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Enhanced Parent Dialog with Ward Details
function ViewParentDialog({ parent, students }: { parent: any; students: any[] }) {
  const [open, setOpen] = useState(false)
  const wardStudents = students.filter((student) => parent.wardIds.includes(student.id))

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
            <Users className="w-5 h-5" />
            Parent Details - {parent.fullName}
          </DialogTitle>
          <DialogDescription>Parent information and ward details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Parent Information */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Parent Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-blue-700">Email:</Label>
                  <p className="text-sm text-gray-600">{parent.email}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Phone:</Label>
                  <p className="text-sm text-gray-600">{parent.phone}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Status:</Label>
                  <Badge
                    variant={parent.status === "Active" ? "default" : "secondary"}
                    className="bg-blue-100 text-blue-800"
                  >
                    {parent.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ward Details */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Ward Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wardStudents.map((student) => (
                  <Card key={student.id} className="border-blue-50">
                    <CardHeader>
                      <CardTitle className="text-base text-blue-800">{student.fullName}</CardTitle>
                      <CardDescription>{student.className}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Student Scores */}
                        <div>
                          <Label className="font-medium text-blue-700">Recent Scores:</Label>
                          <div className="mt-2 space-y-2">
                            {student.scores.map((score: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                <span className="text-sm font-medium">{score.subject}</span>
                                <Badge variant="outline" className="bg-white text-blue-700">
                                  {score.score}/{score.maxScore} ({Math.round((score.score / score.maxScore) * 100)}%)
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Student Assignments */}
                        <div>
                          <Label className="font-medium text-blue-700">Assignments:</Label>
                          <div className="mt-2 space-y-2">
                            {student.assignments.map((assignment: any) => (
                              <div
                                key={assignment.id}
                                className="flex justify-between items-center p-2 bg-blue-50 rounded"
                              >
                                <div>
                                  <span className="text-sm font-medium">{assignment.title}</span>
                                  <p className="text-xs text-gray-600">{assignment.subject}</p>
                                </div>
                                <div className="text-right">
                                  <Badge
                                    variant={assignment.status === "Submitted" ? "default" : "secondary"}
                                    className={assignment.status === "Submitted" ? "bg-blue-100 text-blue-800" : ""}
                                  >
                                    {assignment.status}
                                  </Badge>
                                  {assignment.score && (
                                    <p className="text-xs text-blue-600 mt-1">{assignment.score}/100</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <ViewStudentDetailDialog student={student} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Keep all other existing dialog components with blue theme...
function CreateStudentDialog({ onStudentCreated }: { onStudentCreated: (student: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    classId: "",
    className: "",
    status: "Active",
    scores: [],
    assignments: [],
    attendance: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStudentCreated(formData)
    setFormData({
      fullName: "",
      email: "",
      birthDate: "",
      guardianName: "",
      guardianEmail: "",
      guardianPhone: "",
      classId: "",
      className: "",
      status: "Active",
      scores: [],
      assignments: [],
      attendance: [],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Student</DialogTitle>
          <DialogDescription>Add a new student to the system</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-blue-700">
              Birth Date
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianName" className="text-blue-700">
              Guardian Name
            </Label>
            <Input
              id="guardianName"
              placeholder="Guardian name"
              value={formData.guardianName}
              onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianEmail" className="text-blue-700">
              Guardian Email
            </Label>
            <Input
              id="guardianEmail"
              type="email"
              placeholder="Guardian email"
              value={formData.guardianEmail}
              onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianPhone" className="text-blue-700">
              Guardian Phone
            </Label>
            <Input
              id="guardianPhone"
              placeholder="Guardian phone"
              value={formData.guardianPhone}
              onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
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
              onValueChange={(value) => setFormData({ ...formData, classId: value, className: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                <SelectItem value="Grade 9B">Grade 9B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Student
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditStudentDialog({ student, onUpdate }: { student: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: student.fullName,
    email: student.email,
    birthDate: student.birthDate,
    guardianName: student.guardianName,
    guardianEmail: student.guardianEmail,
    guardianPhone: student.guardianPhone,
    classId: student.classId,
    className: student.className,
    status: student.status,
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
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900">Edit Student</DialogTitle>
          <DialogDescription>Update student information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Student
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Continue with other dialog components...
function CreateTeacherDialog({ onTeacherCreated }: { onTeacherCreated: (teacher: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subjects: [],
    classrooms: [],
    status: "Active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTeacherCreated(formData)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subjects: [],
      classrooms: [],
      status: "Active",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Teacher</DialogTitle>
          <DialogDescription>Add a new teacher to the system</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-700">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Teacher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewTeacherDialog({ teacher }: { teacher: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Teacher Details</DialogTitle>
          <DialogDescription>{teacher.fullName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-blue-700">Email:</Label>
              <p className="text-sm text-gray-600">{teacher.email}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Phone:</Label>
              <p className="text-sm text-gray-600">{teacher.phone}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Status:</Label>
              <Badge
                variant={teacher.status === "Active" ? "default" : "secondary"}
                className="bg-blue-100 text-blue-800"
              >
                {teacher.status}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="font-medium text-blue-700">Subjects:</Label>
            <p className="text-sm text-gray-600">{teacher.subjects.join(", ")}</p>
          </div>
          <div>
            <Label className="font-medium text-blue-700">Classrooms:</Label>
            <p className="text-sm text-gray-600">{teacher.classrooms.join(", ")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditTeacherDialog({ teacher, onUpdate }: { teacher: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: teacher.fullName,
    email: teacher.email,
    phone: teacher.phone,
    status: teacher.status,
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
          <DialogTitle className="text-blue-900">Edit Teacher</DialogTitle>
          <DialogDescription>Update teacher information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-700">
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Teacher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateParentDialog({ onParentCreated }: { onParentCreated: (parent: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    wards: [],
    wardIds: [],
    status: "Active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onParentCreated(formData)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      wards: [],
      wardIds: [],
      status: "Active",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Parent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Parent</DialogTitle>
          <DialogDescription>Add a new parent to the system</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-700">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Parent
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditParentDialog({ parent, onUpdate }: { parent: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: parent.fullName,
    email: parent.email,
    phone: parent.phone,
    status: parent.status,
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
          <DialogTitle className="text-blue-900">Edit Parent</DialogTitle>
          <DialogDescription>Update parent information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-700">
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Parent
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateClassroomDialog({ onClassroomCreated }: { onClassroomCreated: (classroom: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    teacherName: "",
    capacity: 30,
    students: 0,
    studentIds: [],
    schedule: [],
    assignments: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClassroomCreated(formData)
    setFormData({
      name: "",
      teacherId: "",
      teacherName: "",
      capacity: 30,
      students: 0,
      studentIds: [],
      schedule: [],
      assignments: [],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Classroom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Classroom</DialogTitle>
          <DialogDescription>Add a new classroom to the system</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-700">
              Classroom Name
            </Label>
            <Input
              id="name"
              placeholder="Enter classroom name (e.g., Grade 10A)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher" className="text-blue-700">
              Assign Teacher
            </Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => {
                const teacherName = value === "teacher-1" ? "Jane Teacher" : "John Educator"
                setFormData({ ...formData, teacherId: value, teacherName })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher-1">Jane Teacher</SelectItem>
                <SelectItem value="teacher-2">John Educator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-blue-700">
              Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Enter classroom capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 30 })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Classroom
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditClassroomDialog({ classroom, onUpdate }: { classroom: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: classroom.name,
    teacherId: classroom.teacherId,
    teacherName: classroom.teacherName,
    capacity: classroom.capacity,
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
          <DialogTitle className="text-blue-900">Edit Classroom</DialogTitle>
          <DialogDescription>Update classroom information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-700">
              Classroom Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher" className="text-blue-700">
              Assign Teacher
            </Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => {
                const teacherName = value === "teacher-1" ? "Jane Teacher" : "John Educator"
                setFormData({ ...formData, teacherId: value, teacherName })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher-1">Jane Teacher</SelectItem>
                <SelectItem value="teacher-2">John Educator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-blue-700">
              Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 30 })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Classroom
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateSubjectDialog({ onSubjectCreated }: { onSubjectCreated: (subject: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    teacherName: "",
    createdAt: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubjectCreated(formData)
    setFormData({ name: "", teacherId: "", teacherName: "", createdAt: new Date().toISOString().split("T")[0] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Subject</DialogTitle>
          <DialogDescription>Add a new subject to the system</DialogDescription>
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

          <div className="space-y-2">
            <Label htmlFor="teacher" className="text-blue-700">
              Assign Teacher
            </Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => {
                const teacherName = value === "teacher-1" ? "Jane Teacher" : "John Educator"
                setFormData({ ...formData, teacherId: value, teacherName })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher-1">Jane Teacher</SelectItem>
                <SelectItem value="teacher-2">John Educator</SelectItem>
              </SelectContent>
            </Select>
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
    teacherName: subject.teacherName,
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

          <div className="space-y-2">
            <Label htmlFor="teacher" className="text-blue-700">
              Assign Teacher
            </Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => {
                const teacherName = value === "teacher-1" ? "Jane Teacher" : "John Educator"
                setFormData({ ...formData, teacherId: value, teacherName })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher-1">Jane Teacher</SelectItem>
                <SelectItem value="teacher-2">John Educator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Subject
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateTransactionDialog({ onTransactionCreated }: { onTransactionCreated: (transaction: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    type: "",
    date: "",
    status: "Pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTransactionCreated(formData)
    setFormData({ student: "", amount: "", type: "", date: "", status: "Pending" })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Transaction</DialogTitle>
          <DialogDescription>Add a new transaction record</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student" className="text-blue-700">
              Student
            </Label>
            <Select value={formData.student} onValueChange={(value) => setFormData({ ...formData, student: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                <SelectItem value="Bob Smith">Bob Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-blue-700">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount (e.g., $500)"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tuition">Tuition</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
              </SelectContent>
            </Select>
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
            Create Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// New Announcement Management Dialogs
function CreateAnnouncementDialog({ onAnnouncementCreated }: { onAnnouncementCreated: (announcement: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    priority: "Medium",
    targetAudience: "All",
    createdAt: new Date().toISOString().split("T")[0],
    createdBy: "Admin",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnnouncementCreated(formData)
    setFormData({
      title: "",
      details: "",
      priority: "Medium",
      targetAudience: "All",
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "Admin",
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
          <DialogTitle className="text-blue-900">Create New Announcement</DialogTitle>
          <DialogDescription>Create a school-wide announcement</DialogDescription>
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
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Teachers">Teachers</SelectItem>
                <SelectItem value="Parents">Parents</SelectItem>
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

function ViewAnnouncementDialog({ announcement }: { announcement: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">{announcement.title}</DialogTitle>
          <DialogDescription>Announcement Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="font-medium text-blue-700">Details:</Label>
            <p className="text-sm text-gray-600 mt-1">{announcement.details}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-blue-700">Priority:</Label>
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
            </div>
            <div>
              <Label className="font-medium text-blue-700">Target Audience:</Label>
              <p className="text-sm text-gray-600">{announcement.targetAudience}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Created By:</Label>
              <p className="text-sm text-gray-600">{announcement.createdBy}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Date:</Label>
              <p className="text-sm text-gray-600">{announcement.createdAt}</p>
            </div>
          </div>
        </div>
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
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Teachers">Teachers</SelectItem>
                <SelectItem value="Parents">Parents</SelectItem>
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

// New Schedule Management Dialogs
function CreateScheduleDialog({
  classrooms,
  onScheduleCreated,
}: { classrooms: any[]; onScheduleCreated: (schedule: any) => void }) {
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
    createdBy: "Admin",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onScheduleCreated(formData)
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
      createdBy: "Admin",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Schedule</DialogTitle>
          <DialogDescription>Schedule a new class or event</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-blue-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter schedule title"
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
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
            />
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
            <Label htmlFor="classroom" className="text-blue-700">
              Classroom
            </Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => {
                const classroom = classrooms.find((c) => c.id === value)
                setFormData({ ...formData, classId: value, className: classroom?.name || "All Classes" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            Create Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewScheduleDialog({ schedule }: { schedule: any }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">{schedule.title}</DialogTitle>
          <DialogDescription>Schedule Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="font-medium text-blue-700">Description:</Label>
            <p className="text-sm text-gray-600 mt-1">{schedule.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-blue-700">Date:</Label>
              <p className="text-sm text-gray-600">{schedule.date}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Time:</Label>
              <p className="text-sm text-gray-600">{schedule.time}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Duration:</Label>
              <p className="text-sm text-gray-600">{schedule.duration}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Type:</Label>
              <Badge
                variant={schedule.type === "Exam" ? "destructive" : "default"}
                className={schedule.type === "Exam" ? "" : "bg-blue-100 text-blue-800"}
              >
                {schedule.type}
              </Badge>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Classroom:</Label>
              <p className="text-sm text-gray-600">{schedule.className}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Subject:</Label>
              <p className="text-sm text-gray-600">{schedule.subject}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditScheduleDialog({
  schedule,
  classrooms,
  onUpdate,
}: { schedule: any; classrooms: any[]; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: schedule.title,
    description: schedule.description,
    date: schedule.date,
    time: schedule.time,
    duration: schedule.duration,
    classId: schedule.classId,
    className: schedule.className,
    subject: schedule.subject,
    type: schedule.type,
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
          <DialogTitle className="text-blue-900">Edit Schedule</DialogTitle>
          <DialogDescription>Update schedule information</DialogDescription>
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
            <Label htmlFor="description" className="text-blue-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
            />
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
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                const classroom = classrooms.find((c) => c.id === value)
                setFormData({ ...formData, classId: value, className: classroom?.name || "All Classes" })
              }}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-blue-700">
              Subject
            </Label>
            <Input
              id="subject"
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
            Update Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
