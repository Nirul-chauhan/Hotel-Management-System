import React from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = '/placeholder-hotel.jpg';

function CartModel(props) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking', {
      state: {
        hotelId: props.hotelId,
        hotelName: props.title,
        title: props.title,
        description: props.description,
        price: props.price,
        imageUrl: props.imageUrl,
      },
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="relative h-44 bg-gray-100 dark:bg-gray-700">
        <img
          src={props.imageUrl || DEFAULT_IMAGE}
          loading="lazy"
          alt={props.title || 'Hotel image'}
          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE }}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {props.title}
        </h3>
        
        {props.location && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {props.location}
          </p>
        )}
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {props.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">From</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{props.price}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span>
            </div>
          </div>
          
          <button
            onClick={handleBooking}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartModel;
