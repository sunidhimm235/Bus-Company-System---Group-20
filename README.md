# Bus Company System Website

Repository contains the code for bus company system website, like Greyhound or Megabus, using the MERN stack (MongoDB, Express, React, Node.js). Features includes user account creation, login system, and a bus reservation system.

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