import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
       <Link href='/' className='flex justify-between items-center gap-2'>
        <Image alt='hero-kits'
        src={'/assets/logo.png'}
        width={60}
        height={40}
        />

        <h2 className='text-bold text-xl'>Hero <span className='text-bold text-xl text-primary'>Kits</span></h2>
       </Link>
    );
};

export default Logo;