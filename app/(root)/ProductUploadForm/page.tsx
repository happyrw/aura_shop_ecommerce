"use client";
import { useState, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import "./style.css";
import Image from 'next/image';
import { client } from '@/lib/client';
import { TiTick } from 'react-icons/ti';
import { BsX } from 'react-icons/bs';

export interface FormData {
    name: string;
    email: string;
    password: string;
    images?: string[];
    [key: string]: string | string[] | number | boolean | undefined;
}

export default function ProductUploadForm() {
    const { register, handleSubmit, setValue, watch } = useForm<FormData>();
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState('');
    const [slugError, setSlugError] = useState('');
    const [slugLoading, setSlugLoading] = useState(false);
    const [slugVerified, setSlugVerified] = useState(false);
    const dropAreaRef = useRef<HTMLDivElement>(null);

    const nameValue = watch('name');
    const isDiscounted = watch('isDiscounted');

    const debouncedCheckSlug = debounce(async (slug: string) => {
        setSlugLoading(true);
        setSlugError('');
        setSlugVerified(false);

        try {
            const query = `*[_type == "product" && slug.current == "${slug}"]`;
            const products = await client.fetch(query);

            if (products.length > 0) {
                setSlugError('A product with this slug already exists.');
            } else {
                setSlugVerified(true);
            }
        } catch (err) {
            console.error(err);
            setSlugError('Error checking slug availability.');
        } finally {
            setSlugLoading(false);
        }
    }, 500);

    useEffect(() => {
        if (nameValue) {
            const generatedSlug = nameValue.toLowerCase().replace(/\s+/g, '-');
            setValue('slug', generatedSlug);
            debouncedCheckSlug(generatedSlug);
        }
    }, [nameValue, setValue]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        if (images.length + selectedFiles.length > 4) {
            setError('You can only upload up to 4 images.');
            return;
        }
        setImages([...images, ...selectedFiles]);
        setError('');
    };

    const onRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        if (images.length !== 4) {
            setError('You must upload exactly 4 images.');
            return;
        }
        console.log('Submitted data', { ...data, images });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2 className="form-title">Product Upload</h2>

            <div className="form-group">
                <label htmlFor="images" className="label" style={{ paddingBottom: '10px' }}>
                    Upload Images (4 images required)
                </label>
                {images.length < 4 && (
                    <div
                        className="border-dashed"
                        ref={dropAreaRef}
                        onDragOver={(e) => {
                            e.preventDefault();
                            dropAreaRef.current?.classList.add('drag-hover');
                        }}
                        onDragLeave={() => dropAreaRef.current?.classList.remove('drag-hover')}
                        onDrop={(e) => {
                            e.preventDefault();
                            dropAreaRef.current?.classList.remove('drag-hover');
                            const files = Array.from(e.dataTransfer.files);
                            if (images.length + files.length > 4) {
                                setError('You can only upload up to 4 images.');
                                return;
                            }
                            setImages([...images, ...files]);
                            setError('');
                        }}
                    >
                        <p>Drag or paste image here, or click to upload</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onImageChange}
                            disabled={images.length >= 4}
                        />
                    </div>
                )}
                {images.length === 4 && (
                    <p className="success-message">You have uploaded 4 images.</p>
                )}

                {images.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded preview"
                                    width={90}
                                    height={90}
                                    className="image-thumbnail"
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(index)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="form-group">
                <label className="label">Name</label>
                <input
                    type="text"
                    {...register('name')}
                    className="input-field"
                />
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
                <label className="label">Slug</label>
                <input
                    type="text"
                    {...register('slug')}
                    className="input-field"
                    readOnly
                />
                {slugLoading && <p style={{ padding: '2px 10px' }}>Checking...</p>}
                {slugError && <p className="error-message">{slugError}</p>}
                {!slugLoading && !slugError && (
                    <p className="success-message" style={{ position: 'absolute', right: '2px', top: '40px' }}>
                        {slugVerified ? <TiTick /> : <BsX />}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label className="label">Price</label>
                <input
                    type="number"
                    {...register('price')}
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label className="label">Category</label>
                <input
                    type="text"
                    {...register('category')}
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label className="label">Stock <span>(number of product)</span></label>
                <input
                    type="number"
                    {...register('stock')}
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label className="label">Details</label>
                <textarea
                    {...register('details')}
                    className="input-field"
                    rows={5}
                    style={{ resize: "none" }}
                ></textarea>
            </div>

            <div className="form-group">
                <label className="label">SKU</label>
                <input
                    type="text"
                    {...register('SKU')}
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label className="label">Is New Arrival</label>
                <input
                    type="checkbox"
                    {...register('isNewArrival')}
                />
            </div>

            <div className="form-group">
                <label className="label">Is Discounted</label>
                <input
                    type="checkbox"
                    {...register('isDiscounted')}
                />
            </div>

            {isDiscounted && (
                <div className="form-group">
                    <label className="label">Discount Price</label>
                    <input
                        type="number"
                        {...register('discountPrice')}
                        className="input-field"
                    />
                </div>
            )}

            <button type="submit" className="submit-btn">
                Upload Product
            </button>
        </form>
    );
}
