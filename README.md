# YOUR BAZAR

**Created by [Sourav Tarafder](https://github.com/Sourav-108)**

A modern 3D e-commerce storefront built with HTML, CSS and JavaScript. It features an interactive WebGL hero, a glass-style colorful interface, dark and light themes, customer reviews, user accounts and a purchase history profile.

> **Status:** Frontend demo. Data is stored in the browser (localStorage). A backend is required for production use.

## Live Demo

Add your link here after deployment: `https://sourav-108.github.io/your-bazar/`

## Features

**Storefront**
- Interactive 3D hero scene powered by three.js (drag to rotate)
- Product catalog with category filters, search and sorting (price, discount, rating)
- Glass-style cards with colorful borders, 3D tilt and shine effects
- Flash sale countdown and coupon support (`SAVE10` gives 10% off)
- Fully responsive layout for mobile, tablet and desktop

**Customer accounts**
- Sign up and login with email and password (password is hashed with SHA-256)
- Profile page with total amount spent, number of orders, number of reviews and full order history

**Reviews and ratings**
- Product detail view with average rating and customer reviews
- Star rating and written review for logged-in users
- "Verified buyer" badge for customers who purchased the product

**Cart and checkout**
- Quantity controls, coupon code, delivery charge (free above ৳3,000, otherwise ৳60)
- Checkout form with mobile number validation
- Payment options: bKash, Nagad, Card, Cash on Delivery (interface only)

**Experience**
- Dark and light mode with saved preference
- Keyboard focus styles and reduced-motion support

## Tech Stack

| Area | Technology |
| --- | --- |
| Markup and styling | HTML5, CSS3 (custom properties, glassmorphism) |
| Logic | Vanilla JavaScript (ES6+) |
| 3D graphics | three.js r128 (loaded from cdnjs) |
| Typography | Bricolage Grotesque (Google Fonts) |
| Storage | Browser localStorage (demo only) |

## Project Structure

```
your-bazar/
├── index.html              # Main page and modal markup
├── css/
│   └── style.css           # Themes, layout and components
├── js/
│   └── app.js              # Shop logic, auth, reviews, orders, 3D scene
├── demo-single-file.html   # Everything in one file (CSS and JS inlined)
├── LICENSE
├── .gitignore
└── README.md
```

## Getting Started

No build step is needed.

```bash
git clone https://github.com/Sourav-108/your-bazar.git
cd your-bazar
# Option 1: open index.html in your browser
# Option 2: run a local server
npx serve .
```

An internet connection is required for three.js and Google Fonts.

## Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. Save. The site will be live at `https://sourav-108.github.io/<repository>/`.

## Try the Demo

1. Click **Login**, then **Sign up** and create an account.
2. Add products to the cart and apply the coupon `SAVE10`.
3. Complete checkout with any valid details (for example, mobile `01712345678`).
4. Open your name in the header to see total spend and order history.
5. Click a product to read reviews and write your own.

## Limitations

- Accounts, orders and reviews live in localStorage, so they are per-browser and can be cleared by the user.
- Payments are not processed. The payment options are for interface demonstration only.
- Client-side authentication is not secure for real customers.

## Roadmap

- [ ] Backend API (Node.js / Laravel) with a database
- [ ] Secure authentication (JWT or sessions) and OTP login
- [ ] Payment gateway integration (SSLCommerz, aamarPay, bKash)
- [ ] Admin dashboard (products, orders, inventory, reports)
- [ ] Courier integration (Pathao, Steadfast, RedX)
- [ ] Order tracking, wishlist and email/SMS notifications
- [ ] SEO improvements and analytics

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Released under the MIT License. Copyright (c) 2026 Sourav Tarafder. See the `LICENSE` file for details.

## Author

**Sourav Tarafder**  
Founder and Developer, YOUR BAZAR · Dhaka, Bangladesh  
GitHub: https://github.com/Sourav-108  
Email: angandurjoy@gmail.com
