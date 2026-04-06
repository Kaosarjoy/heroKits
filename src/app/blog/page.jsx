'use client'
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUserCircle, FaArrowRight } from 'react-icons/fa';
import Loading from '../loading';
import Image from 'next/image';

const blogs = [
  {
    id: 1,
    title: "How to Choose the Right Toy for Your Child's Age",
    excerpt: "Selecting the perfect toy is more than just fun; it's about supporting your child's development...",
    date: "April 05, 2026",
    author: "Admin",
    // সরাসরি ইমেজ লিঙ্ক ব্যবহার করা ভালো
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=600", 
    category: "Parenting Guide"
  },
  {
    id: 2,
    title: "5 Educational Toys That Boost Brain Power",
    excerpt: "Discover toys that help your little ones learn math, science, and problem-solving while they play...",
    date: "April 02, 2026",
    author: "Kaosar Joy",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop",
    category: "Education"
  },
  {
    id: 3,
    title: "Safe Play: Material Safety in Modern Toys",
    excerpt: "Understand what materials are safe for your baby and why BPA-free options are a must...",
    date: "March 28, 2026",
    author: "Safety Expert",
    image: "https://images.unsplash.com/photo-1566433316243-3062395982ab?q=80&w=600&auto=format&fit=crop",
    category: "Safety"
  }
];

const BlogPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
             Hero Kids <span className="text-primary">Blog</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
            `Making childhood magical and educational through play.`
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 group">
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill // 'fill' ব্যবহার করলে ইমেজটা অটোমেটিক প্যারেন্ট কন্টেইনারে ফিট হয়ে যায়
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  {blog.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center text-[11px] font-bold text-gray-400 gap-4 mb-4 uppercase tracking-tighter">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-primary" /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaUserCircle className="text-primary" /> {blog.author}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <button className="flex items-center gap-2 text-primary font-black text-sm group/btn">
                  READ MORE 
                  <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 bg-primary rounded-[3.5rem] p-10 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden shadow-2xl shadow-primary/20">
            {/* Decoration Bubble */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Never miss an update!</h2>
                <p className="text-white/80 mb-10 font-medium">Subscribe to get parenting tips and exclusive toy deals.</p>
                
                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto bg-white p-2 rounded-\[2rem] shadow-inner">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent px-6 py-3 flex-grow:1 focus:outline-none text-gray-700 font-medium"
                    />
                    <button className="bg-primary text-white font-black px-8 py-3 rounded-\[1.5rem] hover:bg-gray-800 transition-colors shadow-lg shadow-primary/20">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;