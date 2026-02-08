# Itara Pathos IT Nig Ltd - Official Website

Official website for Itara Pathos IT Nig Ltd, an IT company dedicated to producing secure applications and products for the African market.

## About

Itara Pathos IT Nig Ltd is committed to **"Providing a secure internet"** across Africa. We build applications and platforms that prioritize user security without compromising functionality or ease of use.

## Current Project

We are currently developing **Sellam.online**, a secure marketplace platform that provides a safe space for Africans to buy and sell used products without fear of fraud.

## Website Features

- **Homepage**: Company overview and featured project showcase
- **About Us**: Company mission, values, and commitment to security
- **Projects**: Detailed information about Sellam Online and future products
- **Blog**: Industry insights, security tips, and company updates
- **Contact**: Get in touch form and company contact information

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Icon library

### Backend (Coming Soon)
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AaronTosyne/itara-pathos-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd itara-pathos-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Create environment variables files:

   **Backend (.env):**
```bash
   cd server
   cp .env.example .env
```
   
   Then edit `server/.env` and add your actual:
   - MongoDB connection string
   - JWT secret key

   **Frontend (.env):**
```bash
   cd ../client
   cp .env.example .env
```
   
   Edit if needed for your API URL.

6. Open your browser and visit `http://localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

```
itara-pathos-website/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point
│   ├── index.css       # Global styles with Tailwind directives
│   └── ...
├── .env                # Environment variables (not tracked in Git)
├── .gitignore          # Files and folders to ignore
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Configuration

### Tailwind CSS

The project uses Tailwind CSS v3. Configuration can be found in `tailwind.config.js`. To customize the design system:

1. Open `tailwind.config.js`
2. Modify the `theme` object to extend or override default values
3. Restart the development server

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```
DISABLE_ESLINT_PLUGIN=true
```

Note: Never commit the `.env` file to version control. It's already included in `.gitignore`.

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Hosting Services

The build folder can be deployed to any static hosting service:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the build folder or connect via Git
- **GitHub Pages**: Use `gh-pages` package for deployment

We are probabaly using **Hostinger**

## Roadmap

- [x] Design and implement frontend
- [x] Set up responsive navigation
- [x] Create homepage with hero section
- [x] Build About Us page
- [x] Develop Projects showcase page
- [x] Add Blog section
- [x] Create Contact form
- [ ] Build backend API with Express
- [ ] Set up MongoDB database
- [ ] Implement blog post management
- [ ] Add contact form submission handling
- [ ] Implement user authentication for admin panel
- [ ] Deploy to production

## Contributing

We welcome contributions! If you'd like to contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## Security

Security is at the core of everything we do. If you discover a security vulnerability, please email us at itarapathos@gmail.com instead of using the issue tracker.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited.

## Contact

**Itara Pathos IT Nig Ltd**
- Website: [www.itara-pathos.com]
- Email:itarapathos@gmail.com
- Location: Lagos, Nigeria

## Acknowledgments

- Design inspiration from modern IT security companies
- Icons provided by [Lucide](https://lucide.dev/)
- Built with [Create React App](https://create-react-app.dev/)

---

**"Providing a secure internet"** - Itara Pathos IT Nig Ltd © 2026