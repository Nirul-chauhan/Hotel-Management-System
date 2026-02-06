# 🏨 Hotel Management System [![Live Demo](https://img.shields.io/badge/🚀%20Live-Demo-brightgreen?style=for-the-badge)](https://hotel-managemnt.vercel.app/)

A modern, full-stack hotel management application built with the MERN stack. Features a responsive UI with dark/light mode, comprehensive booking system, and user-friendly hotel management interface.

## ✨ Features

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Seamless theme switching with persistent user preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Interface**: Clean, professional design with smooth animations and transitions
- **Tailwind CSS**: Utility-first styling for consistent design system

### 👤 User Management
- **Guest Registration**: Secure user registration with auto-generated registration numbers
- **User Verification**: Phone-based authentication for booking process
- **Profile Management**: Store user details including Aadhar, location, and contact information

### 🏨 Hotel Operations
- **Hotel Browsing**: Search, filter, and sort hotels by location and price
- **Advanced Filters**: Filter by location, price range with dynamic sorting
- **Pagination**: Efficient browsing with 9 hotels per page
- **Hotel Management**: Complete CRUD operations for hotel administrators

### 📅 Booking System
- **Smart Booking**: Automatic user registration number linking
- **Room Selection**: Multiple room types (Single, Deluxe, Family Suite)
- **Date Selection**: Intuitive date picker with validation
- **Price Calculation**: Real-time calculation based on nights, guests, and room type
- **Booking Confirmation**: Detailed confirmation modal with complete booking summary
- **Booking Management**: View, search, and manage all bookings

### 🔒 Data Security
- **Input Validation**: Frontend and backend validation for all forms
- **MongoDB Integration**: Secure database with proper schema validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - Modern UI library
- **React Router** 6.26.0 - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React DatePicker** - Date selection component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 4.21.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.7.0 - MongoDB ODM
- **Express Validator** - Request validation
- **CORS** - Cross-origin resource sharing
- **Bcrypt.js** - Password hashing

### Deployment
- **Frontend**: Local development server
- **Backend**: Firebase Hosting (asia-southeast1)

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or above)
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/Nirul-chauhan/Hotel-Management-System.git
   cd Hotel-Management
   ```

2. **Install Backend Dependencies**
   ```bash
   cd HotelMng
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `HotelMng` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Start the Application**

   **Backend Server** (Terminal 1):
   ```bash
   cd HotelMng
   node server.js
   ```

   **Frontend Application** (Terminal 2):
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
Hotel-Management/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React Context (Theme)
│   │   ├── About.jsx
│   │   ├── BookHotel.jsx      # Hotel browsing with filters
│   │   ├── BookingList.jsx    # View all bookings
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx           # Dashboard
│   │   ├── HotelBookingPage.jsx  # Room booking form
│   │   ├── ManageHotels.jsx   # Hotel CRUD operations
│   │   ├── MyForm.js          # User registration
│   │   ├── Navbar.jsx
│   │   └── App.jsx
│   └── package.json
│
├── HotelMng/                  # Node.js backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Business logic
│   ├── middleware/            # Custom middleware
│   ├── models/
│   │   ├── User.js            # User schema with registration number
│   │   ├── Hotel.js           # Hotel schema
│   │   └── bookingModel.js    # Booking schema
│   ├── routes/
│   │   ├── auth.js            # User authentication routes
│   │   ├── hotelRoutes.js     # Hotel CRUD routes
│   │   └── bookingRoutes.js   # Booking routes
│   ├── server.js
│   └── package.json
│
├── images/                    # Screenshots
└── README.md
```
  # screenshoot




## 🔄 Complete Booking Flow

1. **User Registration**
   - New users register with personal details
   - System generates unique registration number (e.g., `REG172345678AB12`)
   - Registration number is displayed in success modal

2. **Browse Hotels**
   - Filter hotels by location, price range
   - Sort by price (ascending/descending) or recommended
   - Search hotels by name or location
   - Paginated results (9 hotels per page)

3. **Book a Room**
   - Select hotel and click "Book"
   - Enter guest details and phone number
   - System automatically fetches user's registration number
   - Select room type, dates, and number of guests
   - Real-time price calculation displayed
   - Confirm booking with detailed review

4. **Booking Confirmation**
   - Complete booking summary displayed in modal
   - Includes hotel name, registration number, dates, total amount
   - Options to view all bookings or book another hotel

5. **Manage Bookings**
   - View all bookings in table format
   - Search by registration number or guest name
   - See hotel name, room type, dates, and total
   - Delete bookings when needed

## 🎯 API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /check-user` - Verify user by phone number

### Hotel Routes (`/api/hotels`)
- `GET /getHotels` - Fetch all hotels
- `POST /addHotel` - Add new hotel
- `PUT /editHotel/:id` - Update hotel details
- `DELETE /deleteHotel/:id` - Delete hotel

### Booking Routes (`/api/bookings`)
- `GET /` - Fetch all bookings
- `POST /` - Create new booking
- `DELETE /:id` - Delete booking

## 🗃️ Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  phoneNumber: String (required, unique),
  adharNumber: String (required),
  birthday: Date (required),
  state: String,
  city: String,
  pincode: Number,
  accountType: String (default: 'Customer'),
  registrationNumber: String (unique, auto-generated)
}
```

### Hotel Model
```javascript
{
  hotelName: String (required),
  location: String (required),
  price: Number (required),
  description: String,
  imageUrl: String
}
```

### Booking Model
```javascript
{
  registrationNumber: String (required),
  hotelId: ObjectId (required, ref: 'Hotel'),
  hotelName: String (required),
  guestName: String (required),
  roomType: String (required),
  guestCount: Number (required),
  checkInDate: Date (required),
  checkOutDate: Date (required),
  total: Number (required)
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Rushikesh Satpute**
- 📧 Email: nirulchauhan9045@gmail.com
- 🐙 GitHub: [@Nirul chauhan](https://github.com/Nirul-chauhan)
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/nirul-chauhan-570a842a2)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database
- All contributors and supporters of this project

---

<div align="center">
  <p>Made with ❤️ by Nirul chauhan</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
