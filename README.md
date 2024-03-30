# FullstackSocialMediaApp
Deployed at: https://fullstacksocialmediaapp.onrender.com/

## Features
- Upload and view posts
- Like and unlike posts
- Read comments on posts
- Sign up and login using JWT for authentication
- View profiles of users and browse through their posts, liked posts and comments
- Search for users by their names

## Installation and usage
1) Clone this repository  
```
git clone https://github.com/SaiVishnu97/FullstackSocialMediaApp.git
```
2) Install dependencies  
```
cd server
npm install
cd client
npm install
```
3) Create .env in base directory of server folder
```
cd server
touch .env
```
4) Configure environment variables in your new .env file.
```
MONGO_URI=<YOUR_MONGO_URI> 
JWT_SECRET=<YOUR_TOKEN_KEY>
PORT=3001
```
5) Run the server
```
npm run start
```
6) Create .env in base directory of client folder
```
cd client
touch .env
```
7) Configure environment variables in your new .env file.
```
REACT_APP_BACKEND_URL=http://localhost:3001
```
8) Start a new terminal and run react's development server
```
cd FullstackSocialMediaApp
cd client
npm run start
``