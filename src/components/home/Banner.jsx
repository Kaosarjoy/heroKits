import { fontBangla } from '@/app/layout';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex justify-between items-center '>
            <div className='flex-1 space-y-5'>
                <h2 className={`${fontBangla.className} text-6xl font-bold leading-20`}>আপনার শিশু একদিন একটি সুন্দর <span className='text-primary'>ভবিষ্যৎ গড়বে</span>।</h2>
                <p className='text-xl font-light'>Buy any product up to 15% discounts</p>
                <button className='btn btn-primary btn-outline'>Explore more</button>
            </div>
            <div className='flex-1'>
        <Image alt='Buy any product up to 15% discounts'
        src={"/assets/hero.png"}
        width={600}
        height={500}
        ></Image>
            </div>
        </div>
    );
};

export default Banner;