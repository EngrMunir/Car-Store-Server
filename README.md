# 🚗 Car Store Server – Backend

## Overview

The **Car Store Server** is a backend API for managing users, car products, cart items, and orders. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** using **Mongoose**, it provides a robust and scalable solution for a car shop e-commerce platform with full CRUD operations, secure authentication, and inventory management capabilities.

---

## 🚀 Features

- **Express.js** for server and RESTful API development  
- **TypeScript** for strong typing and maintainability  
- **Mongoose** for seamless MongoDB interaction  
- **Zod** for schema validation  
- **JWT (JSON Web Tokens)** for secure authentication  
---

## 🛠️ Error Handling

- **Validation Errors**: Detailed messages for invalid inputs using Zod and Joi  
- **404 Not Found**: Graceful handling of non-existent routes, products, or orders  
- **Generic Errors**: Clear error messages with stack traces in development  

---

## 🧰 Technologies Used

- **Backend Framework**: Node.js with Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Language**: TypeScript  
- **Validation**: Zod and Joi  
- **API Architecture**: RESTful  

---

## ⚙️ Project Setup

### ✅ Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)  
- npm (v6 or above)  
- MongoDB (local or cloud-based)  

---

### 📥 Installation

1. git clone: https://github.com/EngrMunir/Car-Store-Server.git
2. cd Car-Store-Server
3. npm install
4. create .env file and keep
  DATABASE_URL=your_mongodb_connection_string
  PORT=5000
 npm run start:dev
