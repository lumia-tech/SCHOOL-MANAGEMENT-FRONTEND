"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, GraduationCap } from "lucide-react"

// Import dashboard components
import AdminDashboard from "@/components/admin-dashboard"
import TeacherDashboard from "@/components/teacher-dashboard"
import StudentDashboard from "@/components/student-dashboard"
import ParentDashboard from "@/components/parent-dashboard"
import StaffDashboard from "@/components/staff-dashboard"

// Mock authentication - replace with actual API calls
const mockAuth = {
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on email
    const users = {
      "admin@school.com": { role: "ADMIN", name: "John Admin", schoolId: "1" },
      "teacher@school.com": { role: "TEACHER", name: "Jane Teacher", schoolId: "1" },
      "student@school.com": { role: "STUDENT", name: "Bob Student", schoolId: "1" },
      "parent@school.com": { role: "PARENT", name: "Alice Parent", schoolId: "1" },
      "staff@school.com": { role: "STAFF", name: "Mike Staff", schoolId: "1" },
    }

    const user = users[email as keyof typeof users]
    if (user && password === "password") {
      return user
    }
    throw new Error("Invalid credentials")
  },
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<any>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userData = await mockAuth.login(email, password)
      setUser(userData)
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  // If user is logged in, show the appropriate dashboard
  if (user) {
    switch (user.role) {
      case "ADMIN":
        return <AdminDashboard user={user} onLogout={() => setUser(null)} />
      case "TEACHER":
        return <TeacherDashboard user={user} onLogout={() => setUser(null)} />
      case "STUDENT":
        return <StudentDashboard user={user} onLogout={() => setUser(null)} />
      case "PARENT":
        return <ParentDashboard user={user} onLogout={() => setUser(null)} />
      case "STAFF":
        return <StaffDashboard user={user} onLogout={() => setUser(null)} />
      default:
        return <div>Unknown role</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">School Management</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs">
              <p>Admin: admin@school.com / password</p>
              <p>Teacher: teacher@school.com / password</p>
              <p>Student: student@school.com / password</p>
              <p>Parent: parent@school.com / password</p>
              <p>Staff: staff@school.com / password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
