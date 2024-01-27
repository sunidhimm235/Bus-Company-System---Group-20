# Bus Company System Website

Repository contains the code for bus company system website, like Greyhound or Megabus, using the MERN stack (MongoDB, Express, React, Node.js). Features includes user account creation, login system, and a bus reservation system.

## Project Description

Web application for a bus service company, similar to Greyhound or Megabus. This application will simulate real-life scenarios of bus travel and management.

### Key Features

- **Multiple Buses and Cities**: The application will handle multiple buses departing from various cities.
- **Ticketing System**: Passengers can obtain tickets for travel from one location to another, such as from location A to location B. The bus will stop at specific locations (E, D, C, B, A) at designated times.
- **Bus Capacities**: Each bus has a maximum capacity of 40 seats. The application will need to manage these capacities effectively.
- **Seat Reservation**: A reservation system will allow a company worker to reserve a specific seat on a bus for a passenger traveling to a certain destination.
- **Web Application Features**: If the project is a web application:
  - **Login System**: There will be a login system for the company's workers.
  - **Passenger Account Creation**: Passengers can create accounts and make reservations through the system.

## Project Structure

### Backend (Node.js/Express)
- **`server.js`**: Entry point of the Node.js application.
- **`/models`**: Mongoose models for MongoDB.
- **`/routes`**: Express routes for handling HTTP requests.
- **`/controllers`**: Logic for handling requests.
- **`/middleware`**: Middleware functions, including authentication.
- **`/config`**: Configuration files, including database configuration.
- **`/utils`**: Utility functions and helpers.

### Frontend (React)
- **`/client`**: Root directory for React frontend.
- **`/client/src`**: Contains all React source files.
  - **`/components`**: React components for the user interface.
  - **`/pages`**: React components representing different pages/views.
  - **`/App.js`**: Main React component of the application.
  - **`/index.js`**: Entry point of the React application.
- **`/client/public`**: Public assets like images and `index.html`.

## Get Started

1. Clone the repo
2. Install dependencies for both backend and frontend:
   - In root directory: `npm install`
   - In `client` directory: `npm install`
3. Start the backend server: `node server.js`
4. Start the React frontend: 
   - Go to `client` directory: `cd client`
   - Start the React app: `npm start`
5. The app should now be running on the ports.