"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react"
import Swal from "sweetalert2";
import error from "@/app/error";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "../buttons/GoogleButton";


export const LoginForm = () => {

 const params = useSearchParams()
 const callback = params.get("callbackUrl") || "/"

  const [loading, setLoading]=useState(false);
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
    setLoading(true);
      // ekhane form data diye login er jonno api call kora jabe
   const result = await signIn("credentials",{
    email:form.email,
    password:form.password,
  // redirect: false,
   callbackUrl:params.get("callbackUrl") || "/"
  })
  setLoading(false);
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

  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
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
        <GoogleButton></GoogleButton>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href={`/register?callbackUrl=${callback}`} className="text-blue-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;