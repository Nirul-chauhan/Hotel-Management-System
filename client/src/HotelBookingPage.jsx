import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiArrowLeft, FiX, FiCheck } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const HotelBookingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hotelId, hotelName, title } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [guestCount, setGuests] = useState(1);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        checkInDate: '',
        checkOutDate: '',
    });

    const roomTypes = [
        { type: 'Single Room', price: 1000, capacity: 1 },
        { type: 'Deluxe Room', price: 1500, capacity: 2 },
        { type: 'Family Suite', price: 3000, capacity: 4 }
    ];
    
    const [selectedRoomType, setSelectedRoomType] = useState(roomTypes[0]);
    const [errors, setErrors] = useState({});

    const toggleModal = () => {
        if (error) {
            setError(null);
        }
        setIsModalOpen(!isModalOpen);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date, field) => {
        setFormData((prevData) => ({ ...prevData, [field]: date }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
        if (!formData.checkInDate) newErrors.checkInDate = "Check-in date is required.";
        if (!formData.checkOutDate) newErrors.checkOutDate = "Check-out date is required.";
        if (formData.checkInDate && formData.checkOutDate && new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
            newErrors.checkOutDate = "Check-out date must be after check-in date.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (guestCount > selectedRoomType.capacity) {
                setError(`Maximum capacity for ${selectedRoomType.type} is ${selectedRoomType.capacity} guests.`);
                return;
            }

            if (!hotelId || !hotelName) {
                setError('Hotel information is missing. Please select a hotel again.');
                return;
            }

            const userCheckResult = await checkUserRegistration();
            if (!userCheckResult) {
                setError('You are not registered. Please register first.');
                return;
            }
            
            const bookingData = {
                registrationNumber: userCheckResult.registrationNumber,
                hotelId,
                hotelName,
                guestName: formData.name,
                roomType: selectedRoomType.type,
                guestCount,
                checkInDate: formData.checkInDate,
                checkOutDate: formData.checkOutDate,
                total: calculateTotal(),
            };
            
            setBookingDetails(bookingData);
            setRegistrationNumber(userCheckResult.registrationNumber);
            setUserData(userCheckResult);
            toggleModal();
        }
    };

    const confirmBooking = async () => {
        setLoading(true);
        toggleModal();
        try {
            const response = await axios.post('https://main--chating-app-3558.asia-southeast1.hosted.app/api/bookings', bookingDetails);
            if (response.status === 200 || response.status === 201) {
                setIsFormSubmitted(true);
            } else {
                setError('Failed to confirm booking. Please try again.');
            }
        } catch (error) {
            console.error('Error during booking confirmation:', error);
            setError('An internal server error occurred. Please try again.');
        }
        setLoading(false);
    };

    const calculateTotal = () => {
        const nights = Math.abs(new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24);
        return nights > 0 ? (selectedRoomType.price * guestCount * nights) : 0;
    };

    const checkUserRegistration = async () => {
        try {
            const response = await axios.post('https://main--chating-app-3558.asia-southeast1.hosted.app/api/users/check-user', { phoneNumber: formData.phone });
            if (response.data.registered) {
                return response.data.user;
            }
            return null;
        } catch (error) {
            console.error("Error checking registration status:", error);
            setError('Error checking registration status. Please try again.');
            return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <FiArrowLeft /> Back
                </button>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Book Your Room
                </h2>
                {title && <p className="text-gray-600 dark:text-gray-400 mb-6">{title}</p>}
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8"></div>

                {isFormSubmitted && bookingDetails && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">Your room has been successfully booked.</p>
                                
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hotel</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{hotelName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Registration Number</p>
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{registrationNumber}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Guest Name</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{bookingDetails.guestName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Room Type</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{bookingDetails.roomType}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Check-In to Check-Out</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {new Date(bookingDetails.checkInDate).toLocaleDateString('en-IN')} - {new Date(bookingDetails.checkOutDate).toLocaleDateString('en-IN')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">₹{bookingDetails.total}</p>
                                    </div>
                                </div>
                                
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">A confirmation has been recorded. You can view all your bookings in the Bookings section.</p>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate('/bookings')}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                                    >
                                        View Bookings
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsFormSubmitted(false);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                checkInDate: '',
                                                checkOutDate: '',
                                            });
                                            setGuests(1);
                                        }}
                                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                    >
                                        Book Another
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start justify-between">
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                        <button onClick={() => setError(null)}>
                            <FiX className="text-red-700 dark:text-red-400" />
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.phone 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Number of Guests
                            </label>
                            <input
                                type="number"
                                id="guestCount"
                                name="guestCount"
                                value={guestCount}
                                min="1"
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Check-in Date
                            </label>
                            <DatePicker
                                selected={formData.checkInDate}
                                onChange={(date) => handleDateChange(date, 'checkInDate')}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.checkInDate 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                                placeholderText="Select check-in date"
                            />
                            {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
                        </div>

                        <div>
                            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Check-out Date
                            </label>
                            <DatePicker
                                selected={formData.checkOutDate}
                                onChange={(date) => handleDateChange(date, 'checkOutDate')}
                                minDate={formData.checkInDate || new Date()}
                                dateFormat="dd/MM/yyyy"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.checkOutDate 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                                placeholderText="Select check-out date"
                            />
                            {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Room Type
                        </label>
                        <select
                            id="roomType"
                            name="roomType"
                            value={selectedRoomType.type}
                            onChange={(e) => {
                                const room = roomTypes.find(r => r.type === e.target.value);
                                setSelectedRoomType(room);
                            }}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                        >
                            {roomTypes.map((room, index) => (
                                <option key={index} value={room.type}>
                                    {room.type} - ₹{room.price}/night (Max {room.capacity} guests)
                                </option>
                            ))}
                        </select>
                    </div>

                    {formData.checkInDate && formData.checkOutDate && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                Total: <span className="text-xl font-bold text-gray-900 dark:text-white">₹{calculateTotal()}</span>
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {Math.abs(new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)} nights × {guestCount} guests × ₹{selectedRoomType.price}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                        Book Room
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Booking</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">{hotelName}</p>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Registration Number</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{registrationNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Guest Name</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{formData.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Contact</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{formData.email}</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{formData.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Stay Period</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {formData.checkInDate?.toLocaleDateString()} - {formData.checkOutDate?.toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Room Type</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{selectedRoomType.type}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{calculateTotal()}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={confirmBooking}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Confirm'}
                            </button>
                            <button
                                onClick={toggleModal}
                                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelBookingForm;
