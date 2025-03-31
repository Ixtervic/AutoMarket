import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';

const ProductForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [year, setYear] = useState(2022);
    const [mileage, setMileage] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [brandId, setBrandId] = useState(1); // ID de ejemplo
    const [categoryId, setCategoryId] = useState(1); // ID de ejemplo
    const [locationId, setLocationId] = useState(1); // ID de ejemplo
    const [image, setImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!title || !description || !price || !year || !mileage || !fuelType || !transmission) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('year', year.toString());
        formData.append('mileage', mileage);
        formData.append('fuel_type', fuelType);
        formData.append('transmission', transmission);
        formData.append('brand_id', brandId.toString());
        formData.append('category_id', categoryId.toString());
        formData.append('location_id', locationId.toString());

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Vehículo publicado exitosamente');
            // Limpiar el formulario
            setTitle('');
            setDescription('');
            setPrice(0);
            setYear(2022);
            setMileage('');
            setFuelType('');
            setTransmission('');
            setBrandId(1);
            setCategoryId(1);
            setLocationId(1);
            setImage(null);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Ocurrió un error al publicar el vehículo.');
            console.error('Error al publicar el vehículo:', error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-lg">
                <Head title="Publicar Vehículo" />
                <h2 className="mb-6 text-center text-2xl font-bold text-white">Publicar un Vehículo</h2>

                {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="title">
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título del vehículo"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripción del vehículo"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="price">
                            Precio
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Precio del vehículo"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="year">
                            Año
                        </label>
                        <input
                            type="number"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            placeholder="Año del vehículo"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="mileage">
                            Kilometraje
                        </label>
                        <input
                            type="text"
                            id="mileage"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                            placeholder="Kilometraje"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="fuelType">
                            Tipo de Combustible
                        </label>
                        <input
                            type="text"
                            id="fuelType"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                            placeholder="Tipo de combustible"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="transmission">
                            Transmisión
                        </label>
                        <input
                            type="text"
                            id="transmission"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                            placeholder="Tipo de transmisión"
                            required
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-300" htmlFor="image">
                            Imagen
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
                    >
                        Publicar Vehículo
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
