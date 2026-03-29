"use client"
import Link from 'next/link';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const error = () => {
    return (
       <div className='flex flex-col min-h-screen justify-center items-center gap-5'>
            <BiErrorAlt className='text-primary' size={100} />
            <h2 className='text-4xl '>Something was worng </h2>
            <Link href={'/'} className='btn btn-primary'>Go back</Link>
        </div>
    );
};

export default error;