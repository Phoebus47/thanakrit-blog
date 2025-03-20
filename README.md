# Thanakrit Blog Documentation

⚠️ **Warning:** This documentation is currently in progress and may not be complete or up-to-date.

## 📖 Project Overview

Thanakrit Blog is a **personal project** created to enhance my development skills and showcase my capabilities as a front-end developer.
Thanakrit Blog is a personal blog built using **React**, **Vite**, **Tailwind CSS**, and **ESLint**. The project aims to provide a simple and efficient way to manage and publish blog posts.

## 🚀 Getting Started

### Installation

To install the required dependencies, run one of the following commands:

```sh
npm install  # Using npm
yarn install # Using yarn
```

### Usage

To start the development server, use:

```sh
npm run dev  # Using npm
yarn dev     # Using yarn
```

Then, open `http://localhost:5173/` in your browser.

## 🌟 Features

- 🔍 **Searchbar** - Search for blog posts by keyword
- 🏠 **Navbar** - Navigation bar for different sections of the blog
- 📝 **Markdown Support** - Future support for markdown-based blog posts
- 🎨 **Responsive Design** - Styled with Tailwind CSS for mobile-friendly UI

## 📦 Components

### 🔍 Searchbar

#### Props:

- `placeholder` - Placeholder text for the search input field
- `onSearch` - Callback function to handle search queries

#### Example:

```jsx
<Searchbar
  placeholder="Search blog posts"
  onSearch={(query) => console.log(query)}
/>
```

### 🏠 Navbar

#### Props:

- `links` - Array of link objects with `label` and `href` properties

#### Example:

```jsx
<Navbar links=[
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' }
]} />
```

### 📝 App

#### Props:

- `posts` - Array of blog post objects with `title`, `content`, and `date` properties

#### Example:

```jsx
<App posts=[
  { title: 'Hello World', content: 'This is a sample blog post.', date: '2025-03-20' }
]} />
```

## 🛤 Roadmap

- [ ] Implement blog post creation and editing features
- [ ] Add support for comments and discussion threads
- [ ] Improve search functionality and filtering

## 📜 License

Thanakrit Blog is licensed under the **MIT License**.

### 📄 MIT License (Full Text)

```
MIT License

Copyright (c) 2025 Thanakrit Thanyawatsakul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Thanakrit Blog is licensed under the **MIT License**.

## 🙏 Acknowledgments

Special thanks to [list acknowledgments] for their contributions to Thanakrit Blog.

## 📝 Todo

- [ ] Implement responsive design and mobile support
- [ ] Implement a tagging system for blog posts
- [ ] Improve performance and optimization

## 🛠 Known Issues

- 🔍 **Search functionality** is currently broken
- 📌 **Navbar links** are not properly styled
- 📝 **Blog post content** is not properly formatted

📢 This documentation is **a work in progress** and will be updated regularly. If you have any questions or need help with Thanakrit Blog, feel free to reach out! 🚀
