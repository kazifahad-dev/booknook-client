# BookNook

A small online library. Add a book, borrow a book, return a book.

**Live site:** https://booknook-client-opal.vercel.app

**Server repository:** https://github.com/kazifahad-dev/booknook-server

## Demo Account

- Email: demo@booknook.com
- Password: Demo1234

Google login may be limited to approved test accounts while the Google app is in testing mode. If it does not open for you, please use the demo account above or register with an email and password.

## Features

- Browse every book on the shelf, or see the six newest arrivals on the home page
- Register and log in with email and password, with password rules enforced on the form
- Continue with Google as a one-click alternative to the email form
- Add your own books with a cover image uploaded to imgbb
- Edit or delete the books you added, using a confirmation modal before deleting
- Borrow a book for seven days, and return it from the My Borrows page
- Live copy count on every book, so a book with no copies left shows "Not Available"
- A user cannot borrow the same book twice at the same time
- Protected API: the server verifies a JWT before it adds, edits, deletes or borrows anything, and only the owner of a book can change it
- Private routes that stay open after a page reload for logged-in users
- Fully responsive layout for mobile, tablet and desktop

## Tech Stack

- Next.js (App Router), Tailwind CSS and DaisyUI
- BetterAuth with the MongoDB adapter and the JWT plugin
- Swiper.js for the home page slider
- React Hot Toast for success and error messages
- Express.js and MongoDB on the server side, with JWT verification using `jose`

## Run Locally

1. Clone the repository and install the packages

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. Start the development server

   ```bash
   npm run dev
   ```