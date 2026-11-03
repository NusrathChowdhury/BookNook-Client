# 📚 BookNook – A Small Online Library

<div align="center">

### 📖 Discover Books. Borrow Stories. Build Your Reading Journey.

**Your next favorite book is waiting for you.**

BookNook is a modern online library platform where readers can explore books, add their own books, borrow available books, and manage their borrowing history.

Built with Next.js, React, Express.js, MongoDB, and Better Auth, BookNook provides a simple and responsive experience for managing a digital library.

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Better_Auth-6C47FF?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p>
  <a href="#-features">Features</a> •
  <a href="#-pages-and-functionality">Pages</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-getting-started">Installation</a>
</p>

</div>

---

## 🌿 About the Project

**BookNook** is a small online library designed to make book discovery and borrowing easier.

Users can explore the available book collection, view book information, and borrow books for a specific period. Registered users can also contribute books to the library and manage the books they have added.

The platform includes a borrowing management system that tracks borrowed books, return dates, and available copies.

The main idea behind BookNook is simple:

**Add a book. Borrow a book. Return a book.**

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>📚 Explore Books</h3>
      Browse the available book collection with book images, titles, authors, and categories.
    </td>
    <td width="50%">
      <h3>🆕 New Arrivals</h3>
      Discover recently added books displayed on the homepage.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 Authentication</h3>
      User authentication and session management with Better Auth.
    </td>
    <td width="50%">
      <h3>➕ Add Books</h3>
      Logged-in users can contribute new books to the library.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>✏️ Manage My Books</h3>
      Users can edit and delete books they have added.
    </td>
    <td width="50%">
      <h3>📖 Borrow Books</h3>
      Borrow books and save borrowing information in the database.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔄 Return Books</h3>
      Manage borrowed books and return them through the My Borrows section.
    </td>
    <td width="50%">
      <h3>📦 Available Copies</h3>
      Track book availability as books are borrowed and returned.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🛡️ JWT Protection</h3>
      Validate authentication tokens for protected backend operations.
    </td>
    <td width="50%">
      <h3>📱 Responsive Design</h3>
      A responsive interface designed for desktop, tablet, and mobile devices.
    </td>
  </tr>
</table>

## 🖥️ Pages and Functionality

| Page | Description | Access |
|---|---|---|
| 🏠 Home | Homepage with banner, new arrivals, and additional sections | Public |
| 📚 All Books | Displays the available book collection | Public |
| 📖 Book Details | Displays detailed information about a selected book | Private |
| ➕ Add Book | Form to add a new book | Private |
| 📋 My Books | Manage books added by the logged-in user | Private |
| 🔄 My Borrows | View and return borrowed books | Private |
| 🔐 Login | User login and authentication | Public |
| 📝 Register | Create a new user account | Public |
| 🦶 Footer | Contact information, social links, and project information | All pages |

## 🎨 Design and User Experience

BookNook follows a modern library-inspired design focused on readability and easy navigation.

**Design principles**

- Clean layouts and consistent typography.
- Book cards with uniform image sizes.
- Clear navigation and organized page sections.
- Consistent button styles and spacing.
- Responsive layouts for different screen sizes.
- User-friendly forms and interactive dialogs.
- Toast notifications for success and error messages.

## ⚙️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework and App Router |
| React 19 | Component-based user interface |
| TypeScript / JavaScript | Application development |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Reusable UI components |
| Better Auth | User authentication and session management |
| MongoDB Adapter | Better Auth database integration |
| Express.js | Backend REST API |
| MongoDB | Book and borrowing data storage |
| MongoDB Node.js Driver | Database connectivity and CRUD operations |
| JOSE | JWT verification |

## 🔌 API Reference

**Backend Base URL**

```text
http://localhost:5000
```

### 📚 Book APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/books` | Retrieve all books | Public |
| GET | `/books/:id` | Retrieve a single book | Protected |
| POST | `/books` | Add a new book | Protected |
| PATCH | `/books/:id` | Update a book | Protected |
| DELETE | `/books/:id` | Delete a book | Protected |

### 🔄 Borrow APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/borrows` | Borrow a book | Protected |
| GET | `/borrows` | Retrieve the logged-in user's borrowed books | Protected |
| DELETE | `/borrows/:id` | Return a borrowed book | Protected |

### 🔐 API Authentication

Protected API requests use a JWT access token.

Example request:

```javascript
const response = await fetch("http://localhost:5000/books", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const books = await response.json();
```

## 🗄️ Database Structure

BookNook uses MongoDB to store library information.

**Main collections**

| Collection | Purpose |
|---|---|
| `books` | Stores book information, availability, and user details |
| `borrows` | Stores borrowing and return information |
| Better Auth collections | Store authentication and session data |

**Book document fields**

- Book ID
- Title
- Author
- Category
- Image
- Description
- Total Copies
- Date Added
- User Name
- User Email

**Borrow document fields**

- Book ID
- Book Title
- Book Image
- User Email
- Borrow Date
- Return Date

## 🔐 Authentication and Security

BookNook uses Better Auth with the MongoDB Adapter for authentication.

The Express backend uses JWT validation to protect private API operations.

**Authentication features**

- User registration and login.
- Google authentication.
- Session management.
- Protected frontend routes.
- JWT-based backend authorization.
- User-specific book management.
- Borrowing information associated with the authenticated user.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB Atlas account or local MongoDB

### 1. Clone the Client Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
cd YOUR_CLIENT_PROJECT_FOLDER
```

### 2. Install Client Dependencies

```bash
npm install
```

### 3. Configure Client Environment Variables

Create a `.env.local` file in the client project root.

Add your actual Better Auth and backend configuration values.

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Use the exact environment variable names required by your current authentication configuration.

### 4. Start the Client

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Clone the Server Repository

Open another terminal:

```bash
git clone YOUR_SERVER_REPOSITORY_URL
cd YOUR_SERVER_PROJECT_FOLDER
```

### 6. Install Server Dependencies

```bash
npm install
```

### 7. Configure Server Environment Variables

Create a `.env` file in the server project root.

```env
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

Add any additional JWT/JWKS or frontend-origin variables required by your server configuration.

### 8. Start the Backend

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

**Note:** The environment variable names and start commands should match the actual configuration in each project's `.env` and `package.json` files.

## 📁 Project Structure

BookNook is organized into two separate applications:

```text
BookNook/
│
├── BookNook_Client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── .env.local
│   ├── package.json
│   └── README.md
│
└── BookNook_Server/
    ├── index.js
    ├── package.json
    ├── .env
    └── README.md
```

*Note: This is a representative structure. Your actual folder names and files may differ.*

## 🌐 Deployment

Deployment information will be updated after production hosting is completed.

| Application | Platform | Status |
|---|---|---|
| Client | Vercel | Pending |
| Server | Render | Pending |
| Database | MongoDB Atlas | Configuration dependent |

## 🔗 Project Links

| Resource | Link |
|---|---|
| 🌍 Live Website | Coming Soon |
| 💻 Client Repository | Add Client GitHub URL |
| ⚙️ Server Repository | Add Server GitHub URL |

## 👩‍💻 Developed by
**Fouzia Nusrath Chowdhury**

BSc in Computer Science and Engineering  
North East University Bangladesh

- GitHub: [NusrathChowdhury](https://github.com/NusrathChowdhury)

---

<div align="center">

### 📚 BookNook

**Add a book. Borrow a book. Return a book.**

<sub>Built with ❤️ using Next.js, Express.js, MongoDB, and Better Auth.</sub>

</div>
