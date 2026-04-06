"use client";

import { sendContactMessage } from "@/action/server/contact";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaRocket } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactPage = () => {
    // page load hobar loading state
    const [loading, setLoading] = useState(true);
    // button e click korle loading hobe kina
    const [isSubmitting, setIsSubmitting] = useState(false);
    // form er data
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // sending start...

        const res = await sendContactMessage(formData);
        
        setIsSubmitting(false); // sending end

        if (res.success) {
            Swal.fire({
                icon: "success",
                title: "Message Sent! 🚀",
                text: "Thanks! Amar kace msg ta aise gice. Sob thik thakle ami apnake reply debo.",
                confirmButtonColor: "#FF6F61",
                customClass: { popup: 'rounded-[2rem]' }
            });
            setFormData({ name: "", email: "", message: "" });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Kicu ekta vul hocce! Abar try koren to.",
                confirmButtonColor: "#FF6F61",
                customClass: { popup: 'rounded-[2rem]' }
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <span className="loading loading-infinity loading-lg text-primary"></span>
                <p className="text-gray-400 animate-pulse font-medium">Hero Kids is ready...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FDFDFF] min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Mathar header - simple rakha hoise */}
                <div className="text-center mb-16 space-y-3">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                        Get in <span className="text-primary italic">Touch</span>
                    </h1>
                    <div className="h-1.5 w-20 bg-primary/20 mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-lg">If you have any questions about the toy, feel free to let me know!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-4 space-y-6">
                        {[
                            { icon: <FaPhoneAlt />, label: "Call Us", val: "+880 1753 903123", bg: "bg-orange-50", text: "text-orange-500" },
                            { icon: <FaEnvelope />, label: "Email Us", val: "kaosarjoy52@gmail.com", bg: "bg-emerald-50", text: "text-emerald-500" },
                            { icon: <FaMapMarkerAlt />, label: "Location", val: "Najir Road, Feni, BD", bg: "bg-blue-50", text: "text-blue-500" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group flex items-center gap-5">
                                <div className={`${item.bg} ${item.text} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">{item.label}</p>
                                    <p className="text-gray-800 font-bold">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Main Form */}
                    <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-50 shadow-2xl shadow-gray-200/40 relative overflow-hidden">
                        {/* Shundor ekta background decoration */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-700" 
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Your Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-700" 
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">How can we help?</label>
                                <textarea 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-700 min-h-[160px] resize-none"
                                    placeholder="Message details..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            
                            <button 
                                disabled={isSubmitting}
                                className={`group btn border-none w-full h-[60px] rounded-2xl text-white font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${isSubmitting ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-primary/30'}`}
                            >
                                {isSubmitting ? (
                                    <> <span className="loading loading-spinner"></span> Sending... </>
                                ) : (
                                    <> Send Message <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;