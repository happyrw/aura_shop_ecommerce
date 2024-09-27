import { urlFor } from '@/lib/client';
import { Banner } from '@/sanity/schemaTypes/banner';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const HeroBanner = ({ heroBanner }: { heroBanner: Banner }) => {
    return (
        <div className='hero-banner-container'>
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <Image src={urlFor(heroBanner.image).url()} alt="headphone" width={250} height={250} className='hero-banner-image object-cover' />
                <div>
                    <Link href={`/product/${heroBanner._id}`}>
                        <button type="button">{heroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;