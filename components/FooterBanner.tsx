import { urlFor } from '@/lib/client'
import { Banner } from '@/sanity/schemaTypes/banner'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FooterBanner = ({ footerBanner }: { footerBanner: Banner }) => {
    return (
        <div className='footer-banner-container'>
            <div className="banner-desc">
                <div className="left">
                    <p>{footerBanner.discount}</p>
                    <h3>{footerBanner.largeText1}</h3>
                    <h3>{footerBanner.largeText2}</h3>
                    <p>{footerBanner.saleTime}</p>
                </div>
                <div className="right">
                    <p>{footerBanner.smallText}</p>
                    <h3>{footerBanner.midText}</h3>
                    <p>{footerBanner.desc}</p>
                    <Link href={`/products/${footerBanner.product}`}>
                        <button type='button'>{footerBanner.buttonText}</button>
                    </Link>
                </div>
                <Image
                    src={urlFor(footerBanner.image).url()}
                    alt=""
                    width={250}
                    height={250}
                    className="footer-banner-image"
                />
            </div>
        </div>
    )
}

export default FooterBanner;