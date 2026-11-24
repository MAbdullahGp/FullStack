# Online Food Ordering System

A full-stack Online Food Ordering System application built with **HTML5/CSS3/Bootstrap 5**, **vanilla JavaScript**, **NestJS**, **TypeORM**, and **PostgreSQL**.

---

## 1. Features & Architecture

### Domain & Database (PostgreSQL + TypeORM)
- **Restaurant Entity**: Contains `id`, `name`, `cuisine`, `address`, `createdAt`, `updatedAt`, and a one-to-many relationship with `MenuItem`.
- **MenuItem Entity**: Contains `id`, `name`, `description`, `price`, `category`, `restaurantId`, foreign key with `CASCADE` on delete, and a many-to-one relationship with `Restaurant`.
- Configured via environment variables (`.env`) with sensible defaults (`food_ordering_db`).

### NestJS Architecture & Validation
- **Modules**: `RestaurantsModule`, `MenuItemsModule`, and central `AppModule`.
- **Controllers & Services**:
  - `GET /restaurants` - Retrieve all restaurants with their menu items.
  - `GET /restaurants/:id` - Retrieve a specific restaurant.
  - `POST /restaurants` - Create a restaurant.
  - `GET /menu-items` - Retrieve menu items (supports optional `?restaurantId=` filtering).
  - `GET /menu-items/:id` - Retrieve a single menu item with restaurant relation.
  - `POST /menu-items` - Create a menu item.
  - `PATCH /menu-items/:id` & `PUT /menu-items/:id` - Update / replace menu item.
  - `DELETE /menu-items/:id` - Delete menu item.
- **DTOs & Global ValidationPipe**:
  - `CreateMenuItemDto`: `name` is `@IsString()` & `@IsNotEmpty()`, `price` is `@IsNumber()` & `@IsPositive()`, `restaurantId` is `@IsNumber()` & `@IsPositive()`.
  - Configured in [main.ts](file:///media/abdullahgp/New%20Volume/1_Study/5th%20semester/FullStack/labExam-Task2/src/main.ts) with `whitelist: true`, `transform: true`.

### Middleware & Guard
- **RequestLoggerMiddleware**: Logs incoming method, original URL, HTTP status code, and execution time in milliseconds (`[ISO Timestamp] METHOD URL STATUS - DURATIONms`) applied to all `/menu-items` routes.
- **ApiKeyGuard**: Requires an `x-api-key` header matching `API_KEY` (defaults to `my-secret-food-key`) on `/menu-items` endpoints. Returns `401 Unauthorized` when absent or incorrect.

### Responsive Frontend (HTML/CSS/Bootstrap + JS)
- Responsive Bootstrap 5 UI served statically from `/public` via `NestExpressApplication.useStaticAssets`.
- Navbar with quick restaurant modal trigger and real-time editable `x-api-key` header input.
- Dual-view interface: toggle between interactive Food Cards and a structured Data Table.
- Filter menu items by restaurant dropdown dynamically.
- Client-side validation for non-empty item name, positive decimal price, and restaurant selection before triggering async `fetch()`.
- Add, edit, and delete dishes with immediate state updates and Bootstrap alert feedback.

---

## 2. Environment Setup

Create or check your `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=superuser
DB_DATABASE=food_ordering_db
PORT=3000
API_KEY=my-secret-food-key
```

### PostgreSQL Database Setup
Ensure PostgreSQL is running and the database exists:
```bash
# In psql or PostgreSQL CLI
CREATE DATABASE food_ordering_db;
```

---

## 3. Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Start development server with hot-reload
npm run start:dev

# Or run standard start
npm run start
```
Once started, open your browser at **http://localhost:3000**.

To run unit tests:
```bash
npm test
```

---

## 4. API Testing with Postman & cURL

The default API Key is `my-secret-food-key` (set via `API_KEY` in `.env`).

### A. Restaurant Endpoints (Public)

#### 1. Create a Restaurant
- **Method**: `POST`
- **URL**: `http://localhost:3000/restaurants`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "Luigi's Trattoria",
    "cuisine": "Italian",
    "address": "123 Pasta Boulevard"
  }
  ```
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/restaurants \
    -H "Content-Type: application/json" \
    -d '{"name": "Luigi'\''s Trattoria", "cuisine": "Italian", "address": "123 Pasta Boulevard"}'
  ```

#### 2. Get All Restaurants
- **Method**: `GET`
- **URL**: `http://localhost:3000/restaurants`
- **cURL**:
  ```bash
  curl http://localhost:3000/restaurants
  ```

---

### B. Menu Item Endpoints (Protected by `x-api-key`)

> **Note**: Requests without `x-api-key: my-secret-food-key` will return `401 Unauthorized`.

#### 1. Get All Menu Items
- **Method**: `GET`
- **URL**: `http://localhost:3000/menu-items` (or `http://localhost:3000/menu-items?restaurantId=1`)
- **Headers**:
  - `x-api-key`: `my-secret-food-key`
- **cURL**:
  ```bash
  curl -X GET http://localhost:3000/menu-items \
    -H "x-api-key: my-secret-food-key"
  ```

#### 2. Create a Menu Item
- **Method**: `POST`
- **URL**: `http://localhost:3000/menu-items`
- **Headers**:
  - `Content-Type: application/json`
  - `x-api-key`: `my-secret-food-key`
- **Body**:
  ```json
  {
    "name": "Margherita Pizza",
    "price": 12.99,
    "category": "Main Course",
    "description": "Stone baked crust with mozzarella and fresh basil",
    "restaurantId": 1
  }
  ```
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/menu-items \
    -H "Content-Type: application/json" \
    -H "x-api-key: my-secret-food-key" \
    -d '{
      "name": "Margherita Pizza",
      "price": 12.99,
      "category": "Main Course",
      "description": "Stone baked crust with mozzarella and fresh basil",
      "restaurantId": 1
    }'
  ```

#### 3. Get Menu Item by ID
- **Method**: `GET`
- **URL**: `http://localhost:3000/menu-items/1`
- **Headers**:
  - `x-api-key`: `my-secret-food-key`
- **cURL**:
  ```bash
  curl -X GET http://localhost:3000/menu-items/1 \
    -H "x-api-key: my-secret-food-key"
  ```

#### 4. Update Menu Item (PATCH)
- **Method**: `PATCH`
- **URL**: `http://localhost:3000/menu-items/1`
- **Headers**:
  - `Content-Type: application/json`
  - `x-api-key`: `my-secret-food-key`
- **Body**:
  ```json
  {
    "price": 14.50
  }
  ```
- **cURL**:
  ```bash
  curl -X PATCH http://localhost:3000/menu-items/1 \
    -H "Content-Type: application/json" \
    -H "x-api-key: my-secret-food-key" \
    -d '{"price": 14.50}'
  ```

#### 5. Delete Menu Item
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/menu-items/1`
- **Headers**:
  - `x-api-key`: `my-secret-food-key`
- **cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/menu-items/1 \
    -H "x-api-key: my-secret-food-key"
  ```

#### 6. Unauthorized Request Test (401 Response)
- **cURL**:
  ```bash
  curl -i -X GET http://localhost:3000/menu-items
  ```
  Expected Response:
  ```json
  HTTP/1.1 401 Unauthorized
  {"statusCode":401,"message":"Invalid or missing API key in x-api-key header","error":"Unauthorized"}
  ```

---

## 5. Recommended Git Commit Steps

If initializing a new git repository or committing changes:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all files (ensuring .env and node_modules are ignored via .gitignore)
git add .

# 3. Create initial refactor commit
git commit -m "feat: refactor into Online Food Ordering System with NestJS, TypeORM, Guard, and Bootstrap UI"

# 4. (Optional) Connect to remote and push
# git remote add origin <your-github-repo-url>
# git branch -M main
# git push -u origin main
```
