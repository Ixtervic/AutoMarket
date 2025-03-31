<div className="flex-row items-start justify-center gap-4 bg-gray-100 px-8 py-4 md:flex">
    <div className="flex flex-col rounded bg-white px-4 py-4 sm:justify-center sm:pt-0">
        <h2 className="mb-4 py-6 text-xl font-semibold text-gray-800">Resultados de búsqueda para "Ejemplo de búsqueda"</h2>
        <div className="grid grid-cols-1 gap-2 rounded bg-white px-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-44 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-lg">
                    <img src="./imgs/ejemplo.jpg" alt={`Producto ${index}`} className="mb-3 h-40 w-full rounded-md object-cover" />
                    <h3 className="text-lg font-bold text-gray-800">Producto {index}</h3>
                    <p className="text-gray-600">$100.00</p>
                    <a href="#" className="mt-2 inline-block text-blue-500">
                        Ver más
                    </a>
                </div>
            ))}
        </div>
    </div>
</div>;
