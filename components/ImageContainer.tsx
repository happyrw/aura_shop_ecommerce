"use server";
import { urlFor } from '@/lib/client'
import Image from 'next/image'
import React from 'react'

const ImageContainer = ({ image, name }: { image: string[], name: string }) => {
    return (
        <>
            <div className="image-container">
                <Image
                    src={urlFor(image && image[0]).url()}
                    alt={name}
                    width={250}
                    height={250}
                    className='product-detail-image'
                />
            </div>
            <div className="small-images-container">
                {image?.map((item, i) => (
                    <Image
                        key={i}
                        src={urlFor(item && item).url()}
                        alt=""
                        width={250}
                        height={250}
                        className={i === 0 ? 'small-image selected-image' : 'small-image'}
                    // onMouseEnter={() => setIndex(i)}
                    />
                ))}
            </div>
        </>
    )
}

export default ImageContainer