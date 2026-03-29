"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react"
import Swal from "sweetalert2";
import error from "@/app/error";
import { useRouter } from "next/navigation";
export const LoginForm = () => {
  const router = useRouter();
  const [form , setForm] = useState({
    email :"",
    password:"",
  })
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    })

  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
      // ekhane form data diye login er jonno api call kora jabe
   const result = await signIn("credentials",{
    email:form.email,
    password:form.password,
   redirect: false
  })
// console.log(result);
  if(!result.ok){
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: `<a href=\"#\">Why do I have this issue? </a>`
});
  }else{
    Swal.fire({
  title: "Login Successful!",
  icon: "success",
  draggable: true
});
router.push("/")
  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onClick={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full btn btn-primary text-white py-2 rounded-lg hover:btn-accent transition">
            Login
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

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;