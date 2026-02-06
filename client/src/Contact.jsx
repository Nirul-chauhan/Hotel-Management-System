import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitted(false);
        } else {
            setErrors({});
            setSubmitted(true);
            console.log('Form submitted:', formData);
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setSubmitted(false);
            }, 3000);
        }
    };

    const contactInfo = [
        {
            icon: FiMapPin,
            title: "Address",
            content: "Maharastha "
        },
        {
            icon: FiPhone,
            title: "Phone",
            content: "+91 9045995741"
        },
        {
            icon: FiMail,
            title: "Email",
            content: "nirulchauhan9045@gmail.com"
        },
        {
            icon: FiClock,
            title: "Support Hours",
            content: "24/7 Available"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Have questions or need assistance? We're here to help.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-12">
                {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {info.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {info.content}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                    
                    {submitted && (
                        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-green-700 dark:text-green-400 text-sm">
                                Your message has been sent successfully! We'll get back to you soon.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                                placeholder="Enter your name"
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
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.message 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors resize-none`}
                                placeholder="How can we help you?"
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5486894793967!2d73.92870731484188!3d18.50830298741927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5c70e0d%3A0x2d19689e09e2fced!2sHadapsar%2C%20Pune%2C%20Maharashtra%20411028!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                        className="w-full h-full min-h-[400px]"
                        allowFullScreen
                        loading="lazy"
                        title="Location Map"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
