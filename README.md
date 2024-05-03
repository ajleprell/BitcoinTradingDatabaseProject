CS4347-501 Bitcoin Trading Website


This README provides information on setting up and running the project locally.

Prerequisites

Ensure you have the following installed:
    Node.js 

Installation

    Clone the repository:

    bash

git clone <repository-url>
cd <repository-directory>

Install dependencies:

bash

    npm install

Running the Project

    Start the development server:

    bash

npm run dev

This will start a development server, typically accessible at http://localhost:3000.

Building for production:

bash

npm run build



File Structure

    /app/: Contains the main application pages.
    /app/utils/supabase/ contains db integration

Enviroment variables

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
