# Peminjaman Desa

## Overview
Peminjaman Desa is a web application designed for managing village facilities borrowing. The application allows users to register, log in, and manage their borrowing requests efficiently.

## Features
- User registration and authentication using Firebase.
- Dark/light mode toggle for better user experience.
- Responsive design for mobile and desktop users.
- Form validation for user inputs.

## Project Structure
```
peminjaman-desa
├── src
│   ├── app
│   │   ├── regis
│   │   │   └── page.tsx        # Registration page component
│   │   └── login
│   │       └── page.tsx        # Login page component
│   ├── lib
│   │   └── firebase.ts          # Firebase initialization
│   └── types
│       └── index.ts             # TypeScript types and interfaces
├── .env.local                    # Environment variables for Firebase
├── package.json                  # npm configuration file
├── tsconfig.json                 # TypeScript configuration file
└── README.md                     # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd peminjaman-desa
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Usage
- To start the development server, run:
  ```
  npm run dev
  ```
- Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.