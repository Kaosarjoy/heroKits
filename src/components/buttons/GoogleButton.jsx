"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const GoogleButton = () => {
    const params = useSearchParams();
    const handleSubmit = async()=>{
        // ekhane google sign in er jonno api call kora jabe
        const result = await signIn("google",{redirect: false , callbackUrl: params.get("callbackUrl") || "/"})
        if(result.ok){
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
        <div>
            <button onClick={handleSubmit} className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100">
          <svg width="16" height="16" viewBox="0 0 512 512">
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"/>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"/>
          </svg>
          Continue with Google
        </button>
        </div>
    );
};

export default GoogleButton;