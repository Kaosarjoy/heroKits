"use client";
import { postUser } from "@/action/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

 const RegisterForm = () => {
  const route = useRouter();
  const [form , setForm] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    setForm({
      ...form , //spread operator use korlam jate form er baki data gula thik thak rakha jay
      [e.target.name]:e.target.value,//dynamic name use er jono
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const result =await postUser(form);
    if(result?.acknowledged){
      alert("User created successfully");
      route.push("/login");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary text-white py-2 rounded-lg hover:btn-accent transition">
            Register
          </button>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100">
          <svg width="16" height="16" viewBox="0 0 512 512">
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"/>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link  href="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;