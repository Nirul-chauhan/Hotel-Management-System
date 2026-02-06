import React from 'react';
import { FiAward, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: FiAward,
            title: "Quality Service",
            description: "Delivering exceptional hospitality with attention to every detail for an unforgettable experience."
        },
        {
            icon: FiUsers,
            title: "Professional Team",
            description: "Experienced staff dedicated to making your stay comfortable and hassle-free."
        },
        {
            icon: FiTrendingUp,
            title: "Modern Facilities",
            description: "State-of-the-art amenities and contemporary comfort in every room."
        },
        {
            icon: FiCheckCircle,
            title: "Trusted Platform",
            description: "Reliable booking system with transparent pricing and instant confirmation."
        }
    ];

    const stats = [
        { label: "Hotels Listed", value: "50+" },
        { label: "Happy Guests", value: "10K+" },
        { label: "Cities Covered", value: "25+" },
        { label: "Years Experience", value: "5+" }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Story</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                    <p>
                        Welcome to our hotel management platform, where we connect travelers with quality accommodations
                        across multiple destinations. Our mission is to simplify the booking experience while ensuring
                        every guest finds their perfect stay.
                    </p>
                    <p>
                        We partner with verified properties to offer a diverse range of options, from budget-friendly
                        stays to premium accommodations. Our platform is built on trust, transparency, and customer satisfaction.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center border border-blue-200 dark:border-gray-600">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Why Choose Us</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Explore our wide selection of hotels and find the perfect accommodation for your next trip.
                </p>
                <button 
                    onClick={() => navigate('/Book')}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                    Browse Hotels
                </button>
            </div>
        </div>
    );
};

export default About;
