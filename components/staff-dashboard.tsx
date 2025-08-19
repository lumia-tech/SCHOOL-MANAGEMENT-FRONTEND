"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { DollarSign, Plus, Edit, Trash2, LogOut, Users, FileText, Eye, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface StaffDashboardProps {
  user: any
  onLogout: () => void
}

export default function StaffDashboard({ user, onLogout }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState("transactions")

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice@example.com",
      guardianName: "Mary Johnson",
      guardianPhone: "+1234567890",
      amount: "$500",
      type: "Tuition",
      date: "2024-01-15",
      status: "Paid",
      description: "January 2024 Tuition Fee",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Bob Smith",
      studentEmail: "bob@example.com",
      guardianName: "John Smith",
      guardianPhone: "+1234567891",
      amount: "$300",
      type: "Books",
      date: "2024-01-14",
      status: "Pending",
      description: "Textbooks for Mathematics and Physics",
      paymentMethod: "Cash",
    },
    {
      id: 3,
      studentId: 3,
      studentName: "Charlie Brown",
      studentEmail: "charlie@example.com",
      guardianName: "Sarah Brown",
      guardianPhone: "+1234567892",
      amount: "$75",
      type: "Lab Fee",
      date: "2024-01-13",
      status: "Paid",
      description: "Physics Lab Equipment Fee",
      paymentMethod: "Credit Card",
    },
    {
      id: 4,
      studentId: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice@example.com",
      guardianName: "Mary Johnson",
      guardianPhone: "+1234567890",
      amount: "$150",
      type: "Transport",
      date: "2024-01-12",
      status: "Overdue",
      description: "School Bus Fee - January",
      paymentMethod: "Bank Transfer",
    },
  ])

  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice@example.com",
      className: "Grade 10A",
      guardianName: "Mary Johnson",
      guardianEmail: "mary@example.com",
      guardianPhone: "+1234567890",
      status: "Active",
      totalPaid: 650,
      totalPending: 0,
      totalOverdue: 150,
    },
    {
      id: 2,
      fullName: "Bob Smith",
      email: "bob@example.com",
      className: "Grade 10A",
      guardianName: "John Smith",
      guardianEmail: "john@example.com",
      guardianPhone: "+1234567891",
      status: "Active",
      totalPaid: 0,
      totalPending: 300,
      totalOverdue: 0,
    },
    {
      id: 3,
      fullName: "Charlie Brown",
      email: "charlie@example.com",
      className: "Grade 10A",
      guardianName: "Sarah Brown",
      guardianEmail: "sarah@example.com",
      guardianPhone: "+1234567892",
      status: "Active",
      totalPaid: 75,
      totalPending: 0,
      totalOverdue: 0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const sidebarItems = [
    { id: "transactions", label: "Transaction Management", icon: DollarSign },
    { id: "students", label: "Student Financial Records", icon: Users },
    { id: "reports", label: "Financial Reports", icon: FileText },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const handleUpdateTransaction = (id: number, status: string) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status } : t)))
    // Update student totals accordingly
    updateStudentTotals()
  }

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
    updateStudentTotals()
  }

  const updateStudentTotals = () => {
    // In a real app, this would recalculate based on current transactions
    // For now, we'll just trigger a re-render
    setStudents([...students])
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalStats = () => {
    const totalRevenue = transactions
      .filter((t) => t.status === "Paid")
      .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("$", "")), 0)

    const totalPending = transactions
      .filter((t) => t.status === "Pending")
      .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("$", "")), 0)

    const totalOverdue = transactions
      .filter((t) => t.status === "Overdue")
      .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("$", "")), 0)

    return { totalRevenue, totalPending, totalOverdue }
  }

  const stats = getTotalStats()

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
          <h1 className="text-3xl font-bold text-blue-900">Staff Dashboard</h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {activeTab === "transactions" && (
          <div className="space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-blue-900">${stats.totalRevenue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Pending Payments</p>
                      <p className="text-2xl font-bold text-blue-900">${stats.totalPending}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Overdue Payments</p>
                      <p className="text-2xl font-bold text-blue-900">${stats.totalOverdue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Transaction Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-blue-700">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="search"
                        placeholder="Search by student name, description, or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-blue-700">
                      Status
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-blue-700">
                      Type
                    </Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="tuition">Tuition</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="lab fee">Lab Fee</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Management */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-blue-900">Transaction Management</h2>
              <CreateTransactionDialog
                students={students}
                onTransactionCreated={(newTransaction) =>
                  setTransactions([...transactions, { ...newTransaction, id: Date.now() }])
                }
              />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">All Transactions</CardTitle>
                <CardDescription>
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </CardDescription>
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
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{transaction.studentName}</p>
                              <p className="text-sm text-gray-500">{transaction.studentEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{transaction.amount}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                          </TableCell>
                          <TableCell>{transaction.paymentMethod}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <ViewTransactionDialog transaction={transaction} />
                              <EditTransactionDialog
                                transaction={transaction}
                                onUpdate={(data) => handleUpdateTransaction(transaction.id, data.status)}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteTransaction(transaction.id)}
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

        {activeTab === "students" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Student Financial Records</h2>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Student Payment Summary</CardTitle>
                <CardDescription>Overview of each student's payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Classroom</TableHead>
                        <TableHead>Guardian</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead>Pending</TableHead>
                        <TableHead>Overdue</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.fullName}</p>
                              <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.className}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.guardianName}</p>
                              <p className="text-sm text-gray-500">{student.guardianPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">${student.totalPaid}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800">${student.totalPending}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">${student.totalOverdue}</Badge>
                          </TableCell>
                          <TableCell>
                            <ViewStudentFinancialDialog
                              student={student}
                              transactions={transactions.filter((t) => t.studentId === student.id)}
                            />
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

        {activeTab === "reports" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Financial Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Payment Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Paid Transactions</span>
                      <Badge className="bg-green-100 text-green-800">
                        {transactions.filter((t) => t.status === "Paid").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pending Transactions</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {transactions.filter((t) => t.status === "Pending").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overdue Transactions</span>
                      <Badge className="bg-red-100 text-red-800">
                        {transactions.filter((t) => t.status === "Overdue").length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Payment Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Tuition", "Books", "Lab Fee", "Transport"].map((type) => {
                      const count = transactions.filter((t) => t.type === type).length
                      const amount = transactions
                        .filter((t) => t.type === type && t.status === "Paid")
                        .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("$", "")), 0)

                      return (
                        <div key={type} className="flex justify-between items-center">
                          <span>{type}</span>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {count} transactions
                            </Badge>
                            <p className="text-sm text-gray-600">${amount} collected</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

// Transaction Dialogs
function CreateTransactionDialog({
  students,
  onTransactionCreated,
}: { students: any[]; onTransactionCreated: (transaction: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentEmail: "",
    guardianName: "",
    guardianPhone: "",
    amount: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    description: "",
    paymentMethod: "",
  })

  const handleStudentChange = (studentId: string) => {
    const student = students.find((s) => s.id.toString() === studentId)
    if (student) {
      setFormData({
        ...formData,
        studentId,
        studentName: student.fullName,
        studentEmail: student.email,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTransactionCreated(formData)
    setFormData({
      studentId: "",
      studentName: "",
      studentEmail: "",
      guardianName: "",
      guardianPhone: "",
      amount: "",
      type: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      description: "",
      paymentMethod: "",
    })
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
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Transaction</DialogTitle>
          <DialogDescription>Add a new financial transaction for a student</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student" className="text-blue-700">
              Student
            </Label>
            <Select value={formData.studentId} onValueChange={handleStudentChange}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.fullName} - {student.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-blue-700">
              Transaction Type
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
                <SelectItem value="Other">Other</SelectItem>
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
            <Label htmlFor="description" className="text-blue-700">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-blue-700">
              Payment Method
            </Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewTransactionDialog({ transaction }: { transaction: any }) {
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
          <DialogTitle className="text-blue-900">Transaction Details</DialogTitle>
          <DialogDescription>Complete transaction information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-blue-700">Student:</Label>
              <p className="text-sm text-gray-600">{transaction.studentName}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Amount:</Label>
              <p className="text-sm text-gray-600">{transaction.amount}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Type:</Label>
              <p className="text-sm text-gray-600">{transaction.type}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Date:</Label>
              <p className="text-sm text-gray-600">{transaction.date}</p>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Status:</Label>
              <Badge
                className={`${transaction.status === "Paid" ? "bg-green-100 text-green-800" : transaction.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
              >
                {transaction.status}
              </Badge>
            </div>
            <div>
              <Label className="font-medium text-blue-700">Payment Method:</Label>
              <p className="text-sm text-gray-600">{transaction.paymentMethod}</p>
            </div>
          </div>
          <div>
            <Label className="font-medium text-blue-700">Description:</Label>
            <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
          </div>
          <div>
            <Label className="font-medium text-blue-700">Guardian Contact:</Label>
            <div className="mt-1 space-y-1">
              <p className="text-sm text-gray-600">Name: {transaction.guardianName}</p>
              <p className="text-sm text-gray-600">Phone: {transaction.guardianPhone}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditTransactionDialog({ transaction, onUpdate }: { transaction: any; onUpdate: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    status: transaction.status,
    paymentMethod: transaction.paymentMethod,
    date: transaction.date,
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
          <DialogTitle className="text-blue-900">Edit Transaction</DialogTitle>
          <DialogDescription>Update transaction information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-blue-700">
              Payment Method
            </Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
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
            Update Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ViewStudentFinancialDialog({ student, transactions }: { student: any; transactions: any[] }) {
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
          <DialogTitle className="text-blue-900">Financial Records - {student.fullName}</DialogTitle>
          <DialogDescription>Complete financial history and payment details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-blue-700">Name:</Label>
                  <p className="text-sm text-gray-600">{student.fullName}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Email:</Label>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Classroom:</Label>
                  <p className="text-sm text-gray-600">{student.className}</p>
                </div>
                <div>
                  <Label className="font-medium text-blue-700">Status:</Label>
                  <Badge className="bg-blue-100 text-blue-800">{student.status}</Badge>
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

          {/* Payment Summary */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-700">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">${student.totalPaid}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">${student.totalPending}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-700">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">${student.totalOverdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="font-medium">{transaction.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${transaction.status === "Paid" ? "bg-green-100 text-green-800" : transaction.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {transactions.length === 0 && (
                <p className="text-center text-gray-500 py-4">No transactions found for this student</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
