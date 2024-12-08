# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Current Frontend Functionalities:
- Sign up: User can create a new account and is directed to login page 
- login: User can login using existing credentials
- Save books: user can save books to collection
- Delete books: user can delete books from collection
- Collection: User can see what books they have saved
- Seach bar: User can search for a book WIP
- Archive page: User can archive a book and remove from archive
- Book details: User can click on book image to fetch some details about the book

To be Implemented:
- Log out
- Profile page
- Delete Account
- Edit Profile
- Downloaded Books page
- Specific search Features (search by genre, publication year, author, etc)
- User to add fully customizable notes on a book saved in their collection
- User to view book details directly from their collection

Things that need to be worked on:
- Prevent saving Dupe books
- Expanding search functionality (searching for harry potter doesnt show anything)
- Archive page notification (no alert for archiving a book)
