### Sound Atlas
#### deployed @ https://sound-atlas.onrender.com
#### api doc @ http://localhost:5000/api-docs/ or whatever port is being used
Sound Atlas is a web application that allows users to explore and favorite music albums from various artists. Users can filter albums by country, year, and genre, and view detailed information about artists and their releases. The application also supports user authentication and allows users to manage their favorite albums.

https://github.com/user-attachments/assets/e9676f0c-c9e1-4cd8-b361-b95754ce5a09

#### Frontend
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Zustand: A small, fast, and scalable state-management solution.
- SWR: A React Hooks library for data fetching.
- Clerk: A user management and authentication library.

#### Backend
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: A minimal and flexible Node.js web application framework.
- MongoDB: A NoSQL database for storing user and album data.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- Axios: A promise-based HTTP client for making API requests.
- Vitest: A Vite-native unit test framework.

### How to Run the App
#### Prerequisites
Node.js (v14 or higher)
npm (v6 or higher)
MongoDB (local or cloud instance)

#### Setup
Clone the repository:
```
https://github.com/chris-aqui/sound-atlas.git
```

Install dependencies:
open two terminals and cd into both frontend and backend and run npm i

Set up environment variables: Create a .env file in the root directory and add the following variables:
```
MongoDB_URI=your_mongodb_uri
DISCOGS_USER_TOKEN=your_discogs_user_token
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Run the application:
```
cd sound-atlas-frontend/ npm run dev
cd sound-atlas-backend/ npm run dev
```

Build the application: ```npm run build```

Start the application in production mode:
```npm start```

#### Running Tests
Run all tests:
```npm test```

Run backend tests: ```npm run test:backend```

Run frontend tests: ```npm run test:frontend``` // todo

