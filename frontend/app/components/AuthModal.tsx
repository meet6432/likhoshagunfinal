"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Sparkles, Mail, Lock, User } from "lucide-react"
import axios from "axios"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    console.log("in the handleSubmit")
    e.preventDefault()
    const response = await axios.post('http://localhost:8800/api/auth/signup',{name,email,password})
    console.log(response)
    console.log("hii")
    // Here you would typically handle the authentication logic
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }
  const handle = async(e: React.FormEvent) => {
    console.log("in the handle")
    e.preventDefault()
    const response = await axios.post('http://localhost:8800/api/auth/signin',{email,password})
    console.log(response)
    console.log("handle")
    // Here you would typically handle the authentication logic
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-red-50 to-orange-50 border-red-300">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-red-800 text-center">Welcome to Chandla</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-red-100">
            <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-red-800">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-red-800">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form  className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-red-800"  >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    required
                    className="pl-10 border-red-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-red-800">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    required
                    className="pl-10 border-red-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </div>
              </div>
              <Button type="submit" onClick={handle} className="w-full bg-red-600 hover:bg-red-700 text-white">
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-red-800">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={18} />
                  <Input
                    id="name"
                    type="text"
                    required
                    className="pl-10 border-red-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your name"
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-red-800">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    required
                    className="pl-10 border-red-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-red-800">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    required
                    className="pl-10 border-red-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Create a password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="mt-6 text-center">
          <p className="text-sm text-red-700">
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-red-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-red-800">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

