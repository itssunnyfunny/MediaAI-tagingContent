# Tag Generator on Content

A robust full-stack monorepo application designed to generate relevant tags for content using advanced AI models. Built with **Next.js 15**, **Turborepo**, and **Prisma**.

## 🚀 Features

*   **AI-Powered Tagging**: Uses Google Gemini (via `gemini-2.5-flash`) to analyze text and generate accurate tags.
*   **Tag History**: Automatically stores generated tags and content metadata in a PostgreSQL database.
*   **Monorepo Architecture**: Efficiently managed using Turborepo.
*   **Type Safety**: End-to-end TypeScript support.
*   **Modern Stack**: Tailwind CSS v4, Prisma ORM, and Next.js App Router (App Directory).

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Monorepo**: [Turborepo](https://turbo.build/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **AI Models**:
    *   Google Gemini (Primary)
    *   OpenAI (Integration available)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Package Manager**: [Yarn](https://yarnpkg.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Yarn](https://yarnpkg.com/) package manager
*   [PostgreSQL](https://www.postgresql.org/) database

## ⚙️ Environment Variables

Create `.env` files in the respective directories as needed.

### `packages/db/.env`
Required for database connection.
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taggenerator?schema=public"
```

### `apps/web/.env.local`
Required for AI services.
```env
# Required for primary tag generation
GEMINI_API_KEY=your_gemini_api_key

# Optional: If you switch to OpenAI
OPENAI_API_KEY=your_openai_api_key
```

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd tagGeneratorOnContent
    ```

2.  **Install Dependencies**
    ```bash
    yarn install
    ```

3.  **Database Setup**
    Ensure your PostgreSQL server is running and `DATABASE_URL` is set in `packages/db/.env`.
    
    You need to generate the Prisma Client mostly to update the types and push the schema to your DB.
    
    ```bash
    # Navigate to the DB package
    cd packages/db
    
    # Generate Prisma Client
    npx prisma generate
    
    # Push schema to database
    npx prisma db push
    
    # Return to root
    cd ../..
    ```

4.  **Run the Application**
    From the root directory:
    ```bash
    yarn dev
    ```
    
    The web application will be available at `http://localhost:3000`.

## 🔌 API Usage

### Generate Tags
`POST /api/tag_generate`

Generates 5 relevant tags for the provided content using Gemini AI and saves the result to the database if a `contentItemId` is provided.

**Request Body:**
```json
{
  "content": "The text content you want to tag...",
  "contentItemId": "optional-uuid-of-existing-content-item",
  "userId": "optional-user-id"
}
```

**Response:**
```json
{
  "tags": ["Technology", "AI", "Coding", "Software", "Development"]
}
```

## 🏗️ Project Structure

*   `apps/web`: The main Next.js web application.
*   `packages/db`: Shared database logic, Prisma schema, and client.
*   `packages/ui`: Shared React UI components.
*   `packages/config`: Shared configuration (eslint, typescript).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
