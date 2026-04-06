"use server";

import { sendEmail } from "@/app/lib/sendEmail";


export const sendContactMessage = async (formData) => {
  try {
    await sendEmail({
      to: "kaosarjoy52@gmail.com", // eikhane apnar email thakbe
      subject: `New Message from ${formData.name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p className='text-gray-700 font-bold '><strong>Name:</strong> ${formData.name}</p>
        <p className='text-gray-700'><strong>Email:</strong> ${formData.email}</p>
        <p className='text-gray-700'><strong>Message:</strong> ${formData.message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};