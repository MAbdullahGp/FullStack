# Q1. Library Book Tracker

A clean, responsive, and robust full-stack Library Book Tracker application built with **HTML5, CSS3, Bootstrap 5**, vanilla **JavaScript (ES6+)**, and **NestJS (Node.js)** with JSON file persistence.

---

## Features

1. **Frontend**:
   - Modern, responsive UI designed with **HTML5**, **CSS3**, and **Bootstrap 5.3**.
   - Navigation bar with brand icon and subtitle.
   - Interactive **Add Book** form with live validation feedback for Title, Author, Category, and Year.
   - Dual view modes: **Bootstrap Cards** (grid) and **Bootstrap Table** with dynamic category count badge and empty-state messaging.
   - **Dynamic DOM updates & event delegation**: Asynchronously communicates with backend API for real-time adding and removing of books.
   - **Category Filter**: Built using JavaScript array methods (`filter`, `map`) and arrow functions.

2. **Backend REST API**:
   - Built on **NestJS** utilizing TypeScript and ESM modules (`"type": "module"`).
   - Validates incoming data using `class-validator` / `ValidationPipe` (`CreateBookDto`).
   - Persists all book records safely in `data/books.json` with atomic write operations.
   - Fully serves frontend assets from the `public/` directory statically.

---

## Project Structure

```text
├── data/
│   └── books.json               # JSON storage for persisted books
├── public/
│   ├── css/
│   │   └── styles.css           # Custom CSS styling
│   ├── js/
│   │   └── app.js               # Frontend logic (DOM, fetch, filters)
│   └── index.html               # Main responsive UI
├── src/
│   ├── books/
│   │   ├── dto/
│   │   │   └── create-book.dto.ts # Validation DTO
│   │   ├── book.interface.ts    # TypeScript interface
│   │   ├── books.controller.ts  # REST API controller
│   │   ├── books.module.ts      # Books module
│   │   └── books.service.ts     # JSON read/write persistence logic
│   ├── app.module.ts            # Root application module
│   └── main.ts                  # NestJS bootstrap & static file server
├── package.json
└── README.md
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Run the Server
To run in production mode:
```bash
npm run start:prod
# or: node dist/main.js
```

Or run in development watch mode:
```bash
npm run start:dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

---

## Testing the REST API with cURL

### 1. `GET /books` (Retrieve all books)
```bash
curl -X GET http://localhost:3000/books
```

### 2. `POST /books` (Add a new book)
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Patterns",
    "author": "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    "category": "Technology",
    "year": 1994
  }'
```

### 3. `DELETE /books/:id` (Delete a book by ID)
```bash
curl -X DELETE http://localhost:3000/books/1
```
*(Replace `1` with any valid book ID returned from `GET /books` or `POST /books`)*
