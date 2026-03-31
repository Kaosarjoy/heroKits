"use client";
import { postUser } from "@/action/server/auth";
import Link from "next/link";
import React, { useState } from "react";
import GoogleButton from "../buttons/GoogleButton";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

 const RegisterForm = () => {
  const parms = useSearchParams();
  const callbackUrl = parms.get("callbaclUrl") || "/";
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
      
     // route.push("/login");
     const result = await signIn("credentials",{
      email:form.email,
      password:form.password,
      redirect: false,
      callbackUrl:callbackUrl
     })
      if(result.ok){
        route.push(callbackUrl);
        Swal.fire({
          title: "Registration Successful!",
          icon: "success",
          draggable: true
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! try google login or login with your credentials",
          footer: `<a href="#">Why do I have this issue? </a>`
        });
      }
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
        <GoogleButton></GoogleButton>

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