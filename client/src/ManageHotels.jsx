import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/getHotels');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hotelData = { hotelName, location, price, description, imageUrl };

    try {
      if (hotelId) {
        const response = await fetch(`https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/editHotel/${hotelId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hotelData),
        });

        if (response.ok) {
          alert("Hotel updated successfully!");
        }
      } else {
        const response = await fetch('https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/addHotel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hotelData),
        });

        if (response.ok) {
          alert("Hotel added successfully!");
        }
      }

      resetForm();
      fetchHotels();
    } catch (error) {
      console.error('Error processing hotel:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setHotelId(null);
    setHotelName('');
    setLocation('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  const handleEdit = (hotel) => {
    setHotelId(hotel._id);
    setHotelName(hotel.hotelName);
    setLocation(hotel.location);
    setPrice(hotel.price);
    setDescription(hotel.description);
    setImageUrl(hotel.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        const response = await fetch(`https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/deleteHotel/${hotelId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Hotel deleted successfully!");
          fetchHotels();
        } else {
          alert("Failed to delete hotel. Please try again.");
        }
      } catch (error) {
        console.error('Error deleting hotel:', error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Manage Hotels</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {hotelId ? 'Edit Hotel' : 'Add New Hotel'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotelName"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                placeholder="Enter hotel name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                placeholder="Enter location"
                required
              />
            </div>
          
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price per Night (₹)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                placeholder="Enter price"
                required
              />
            </div>
          
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none"
              placeholder="Enter hotel description"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              {hotelId ? <><FiEdit2 /> Update Hotel</> : <><FiPlus /> Add Hotel</>}
            </button>
            
            {hotelId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">All Hotels</h3>
        
        {hotels.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hotels available.</p>
        ) : (
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div key={hotel._id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.hotelName}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {hotel.hotelName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {hotel.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {hotel.description}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{hotel.price}/night
                  </p>
                </div>
                
                <div className="flex md:flex-col gap-2 md:justify-center">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageHotels;
