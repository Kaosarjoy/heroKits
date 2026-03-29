"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthButton = () => {
    const session = useSession();
    return (
        <div>
            {
                session.status =="authenticated"?<button className='btn btn-primary' onClick={()=> signOut()}>LogOut</button> :
                <Link href="/login">
    <button className='btn btn-primary btn-outline'>Login</button>
    </Link>
            }
        </div>
    );
};

export default AuthButton;

{/* */}