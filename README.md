# 📚 Book Search App

A modern, responsive web application for searching and exploring books using the Open Library API. Built with Next.js 16, TypeScript, and Tailwind CSS.

![Project Preview](https://via.placeholder.com/1200x600?text=Book+Search+App+Preview)

## ✨ Features

- **Search Functionality**: Instantly search for books by title, author, or ISBN using the Open Library API.
- **Book Details**: View detailed information about each book, including covers, publication dates, and author details.
- **Favorites System**: Save your favorite books to a personalized list for easy access.
- **Dark/Light Mode**: Seamlessly switch between dark and light themes for a comfortable reading experience.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI**: Clean and intuitive interface built with **shadcn/ui** and **Framer Motion** animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (accessible primitives)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/book-search-app.git
    cd book-search-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📦 Build & Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Push your code to a GitHub repository.
2.  Go to **Vercel** and sign up/login.
3.  Click **"Add New..."** > **"Project"**.
4.  Import your GitHub repository.
5.  Click **"Deploy"**. Vercel will automatically detect the Next.js configuration and build your site.

### Manual Build

To create a production build locally:

```bash
npm run build
npm start
```

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
│   ├── favorites/        # Favorites page
│   ├── layout.tsx        # Root layout with ThemeProvider
│   └── page.tsx          # Home page (Search)
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation bar
│   ├── ThemeToggle.tsx   # Light/Dark mode toggle
│   └── BookCard.tsx      # Book display component
├── lib/                  # Utility functions and API helpers
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
