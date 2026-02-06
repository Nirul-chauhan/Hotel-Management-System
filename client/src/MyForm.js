import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiX } from "react-icons/fi";

export default function MyForm(props) {
    const [isError, setError] = useState(false);
    const [getPinError, setPinError] = useState(false);
    const [getAdhar, setAdhar] = useState(false);
    const [getAccountType] = useState("Customer");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        adharNumber: "",
        birthday: "",
        state: "",
        city: "",
        pincode: "",
        accountType: "",
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { value, name, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);

    const handlesubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await axios.post(
                "http://localhost:5000/register", // <-- your local backend
                formData
            );



            if (data.data.success) {
                setRegistrationData({
                    name: `${formData.firstName} ${formData.lastName}`,
                    registrationNumber: data.data.user.registrationNumber,
                    phoneNumber: formData.phoneNumber,
                });
                setShowSuccess(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    adharNumber: "",
                    birthday: "",
                    state: "",
                    city: "",
                    pincode: "",
                    accountType: "",
                });
            }
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    const statesOfIndia = [
        "Choose a State",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

    const handleClick = () => {
        navigate("/");
    };

    const validate = (evt) => {
        const regex = /[^0-9]/;
        let val = evt.target.value;
        if (regex.test(val) || val.length > 10) {
            evt.target.value = evt.target.value.substr(0, val.length - 1);
            setError(true);
        } else {
            if (isError === true) setError(false);
        }
    };

    const validateAdhar = (evt) => {
        const regex = /[^0-9]/;
        let val2 = evt.target.value;
        if (regex.test(val2) || val2.length > 12) {
            evt.target.value = val2.substr(0, val2.length - 1);
            setAdhar(true);
        } else {
            if (getAdhar === true) setAdhar(false);
        }
    };

    const validatePin = (evt) => {
        const regex = /[^0-9]/;
        let val1 = evt.target.value;
        if (regex.test(val1) || val1.length > 6) {
            evt.target.value = val1.substr(0, val1.length - 1);
            setPinError(true);
        } else {
            if (getPinError === true) setPinError(false);
        }
    };

    return ( <
        div className = "max-w-6xl mx-auto px-4 py-12" >
        <
        div className = "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700" >
        <
        div className = "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700" >
        <
        div >
        <
        h1 className = "text-3xl font-bold text-gray-900 dark:text-white" > { " " } { props.title } { " " } <
        /h1>{" "} <
        div className = "h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2" > { " " } <
        /div>{" "} < /
        div > { " " } <
        button onClick = { handleClick }
        className = "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" >
        <
        FiX className = "w-6 h-6 text-gray-600 dark:text-gray-400" / >
        <
        /button>{" "} < /
        div > { " " } <
        form onSubmit = { handlesubmit }
        className = "p-8" >
        <
        input type = "hidden"
        id = "accountType"
        name = "accountType"
        value = { getAccountType }
        />{" "} <
        div className = "grid md:grid-cols-2 gap-6" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        First Name { " " } <
        /label>{" "} <
        input type = "text"
        id = "firstName"
        name = "firstName"
        onChange = { handleOnChange }
        placeholder = "Enter first name"
        className = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        Last Name { " " } <
        /label>{" "} <
        input type = "text"
        id = "lastName"
        name = "lastName"
        onChange = { handleOnChange }
        placeholder = "Enter last name"
        className = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        Phone Number { " " } <
        /label>{" "} <
        input type = "tel"
        id = "phoneNumber"
        name = "phoneNumber"
        onChange = { handleOnChange }
        onInput = { validate }
        placeholder = "Enter 10-digit mobile number"
        className = { `w-full px-4 py-3 rounded-lg border ${
                  isError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors` }
        required /
        >
        { " " } {
            isError && ( <
                p className = "text-red-500 text-sm mt-1" > { " " }
                Invalid phone number { " " } <
                /p>
            )
        } { " " } <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        Aadhar Number { " " } <
        /label>{" "} <
        input type = "text"
        id = "adharNumber"
        name = "adharNumber"
        onChange = { handleOnChange }
        onInput = { validateAdhar }
        placeholder = "Enter 12-digit Aadhar number"
        className = { `w-full px-4 py-3 rounded-lg border ${
                  getAdhar
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors` }
        required /
        >
        { " " } {
            getAdhar && ( <
                p className = "text-red-500 text-sm mt-1" > { " " }
                Invalid Aadhar number { " " } <
                /p>
            )
        } { " " } <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        Date of Birth { " " } <
        /label>{" "} <
        input type = "date"
        id = "birthday"
        name = "birthday"
        onChange = { handleOnChange }
        className = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        State { " " } <
        /label>{" "} <
        select name = "state"
        id = "state"
        onChange = { handleOnChange }
        className = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
        required > {
            statesOfIndia.map((state, index) => ( <
                option key = { index }
                value = { state } > { " " } { state } { " " } <
                /option>
            ))
        } { " " } <
        /select>{" "} < /
        div > { " " } <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        City { " " } <
        /label>{" "} <
        input type = "text"
        id = "city"
        name = "city"
        onChange = { handleOnChange }
        placeholder = "Enter city"
        className = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" >
        Pincode { " " } <
        /label>{" "} <
        input type = "text"
        id = "pincode"
        name = "pincode"
        onChange = { handleOnChange }
        onInput = { validatePin }
        placeholder = "Enter 6-digit pincode"
        className = { `w-full px-4 py-3 rounded-lg border ${
                  getPinError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-colors` }
        required /
        >
        { " " } {
            getPinError && ( <
                p className = "text-red-500 text-sm mt-1" > Invalid pincode < /p>
            )
        } { " " } <
        /div>{" "} < /
        div > { " " } <
        div className = "mt-8" >
        <
        button type = "submit"
        className = "w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all" >
        Submit Registration { " " } <
        /button>{" "} < /
        div > { " " } <
        /form>{" "} < /
        div > { " " } {
            showSuccess && registrationData && ( <
                div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" >
                <
                div className = "bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700" >
                <
                div className = "text-center" >
                <
                div className = "w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4" >
                <
                svg className = "w-8 h-8 text-green-600 dark:text-green-400"
                fill = "none"
                stroke = "currentColor"
                viewBox = "0 0 24 24" >
                <
                path strokeLinecap = "round"
                strokeLinejoin = "round"
                strokeWidth = "2"
                d = "M5 13l4 4L19 7" /
                >
                <
                /svg>{" "} < /
                div > { " " } <
                h3 className = "text-2xl font-bold text-gray-900 dark:text-white mb-2" > { " " }
                Registration Successful!{ " " } <
                /h3>{" "} <
                p className = "text-gray-600 dark:text-gray-400 mb-6" > { " " }
                Your account has been created.Please save your registration details. { " " } <
                /p>{" "} <
                div className = "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left" >
                <
                div className = "mb-3" >
                <
                p className = "text-xs text-gray-500 dark:text-gray-400 mb-1" > { " " }
                Name { " " } <
                /p>{" "} <
                p className = "text-sm font-semibold text-gray-900 dark:text-white" > { " " } { registrationData.name } { " " } <
                /p>{" "} < /
                div > { " " } <
                div className = "mb-3" >
                <
                p className = "text-xs text-gray-500 dark:text-gray-400 mb-1" > { " " }
                Registration Number { " " } <
                /p>{" "} <
                p className = "text-lg font-bold text-blue-600 dark:text-blue-400" > { " " } { registrationData.registrationNumber } { " " } <
                /p>{" "} < /
                div > { " " } <
                div >
                <
                p className = "text-xs text-gray-500 dark:text-gray-400 mb-1" > { " " }
                Phone Number { " " } <
                /p>{" "} <
                p className = "text-sm font-semibold text-gray-900 dark:text-white" > { " " } { registrationData.phoneNumber } { " " } <
                /p>{" "} < /
                div > { " " } <
                /div>{" "} <
                p className = "text-xs text-gray-600 dark:text-gray-400 mb-6" > { " " }
                Use your phone number to book rooms.Your registration number will be used
                for all bookings. { " " } <
                /p>{" "} <
                button onClick = {
                    () => {
                        setShowSuccess(false);
                        navigate("/Book");
                    }
                }
                className = "w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all" >
                Browse Hotels { " " } <
                /button>{" "} < /
                div > { " " } <
                /div>{" "} < /
                div >
            )
        } { " " } <
        /div>
    );
}
