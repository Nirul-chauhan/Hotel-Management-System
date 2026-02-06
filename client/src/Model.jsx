import React from 'react';

function Model({ icon, title, desc, onClick }) {
    return (
        <div 
            className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = onClick}
        >
            <img src={icon} alt={title} className="h-16 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 text-center">{desc}</p>
        </div>
    );
}

export default Model;
