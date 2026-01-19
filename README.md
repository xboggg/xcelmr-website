# XcelMR Services Ltd - Website

Professional Recruitment, Staffing Solutions & Accommodation Services in Ghana.

**Website:** www.xcelservices.com.gh

## Project Structure

```
xcelmr/
├── index.html              # Homepage
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── images/
│   ├── favicon.svg        # Site favicon
│   ├── hero-team.svg      # Hero section illustration
│   ├── team-meeting.svg   # Team meeting illustration
│   ├── about-team.svg     # About page illustration
│   ├── recruitment.svg    # Recruitment service illustration
│   ├── staffing.svg       # Staffing service illustration
│   └── accommodation.svg  # Accommodation service illustration
└── pages/
    ├── about.html         # About Us page
    ├── services.html      # Services overview
    ├── recruitment.html   # Recruitment services
    ├── staffing.html      # Staffing solutions
    ├── accommodation.html # Hosting & Accommodation
    ├── careers.html       # Job listings
    └── contact.html       # Contact page
```

## Features

- Responsive design (mobile, tablet, desktop)
- Modern animations with AOS (Animate On Scroll)
- Hero slider with 3 banners
- Parallax effects
- Interactive elements (hover effects, transitions)
- WhatsApp integration
- Contact forms
- SEO optimized

## Free Hosting Options

### Option 1: GitHub Pages + Netlify (Recommended)

This gives you version control (GitHub) + free hosting with forms (Netlify).

#### Step 1: Push to GitHub

1. Create a GitHub account at https://github.com
2. Create a new repository named `xcelmr-website`
3. Open terminal/command prompt in the `xcelmr` folder
4. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit - XcelMR website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/xcelmr-website.git
git push -u origin main
```

#### Step 2: Deploy on Netlify

1. Go to https://netlify.com and sign up (use GitHub login)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and select your `xcelmr-website` repository
4. Click "Deploy site"
5. Your site will be live at: `https://random-name.netlify.app`

#### Step 3: Custom Domain (Optional)

1. In Netlify, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `xcelservices.com.gh`
4. Update your domain's DNS settings:
   - Add a CNAME record pointing to your Netlify URL
   - Or use Netlify DNS

### Option 2: GitHub Pages Only

1. Push code to GitHub (see Step 1 above)
2. Go to repository Settings → Pages
3. Select "main" branch and save
4. Site will be live at: `https://YOUR_USERNAME.github.io/xcelmr-website`

### Option 3: Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Deploy automatically

### Option 4: Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Connect GitHub account
3. Select repository and deploy
4. Free SSL and unlimited bandwidth

## Local Development

To view the website locally:

1. Open the `xcelmr` folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Website opens in browser at `http://localhost:5500`

## Customization

### Update Contact Information

Search and replace these placeholders in all HTML files:

- `+233 XX XXX XXXX` → Actual phone number
- `233XXXXXXXXX` → WhatsApp number (no + or spaces)
- `info@xcelservices.com.gh` → Actual email
- `Accra, Ghana` → Full address

### Update Social Media Links

In the footer section of each HTML file, replace `#` with actual social media URLs.

### Add Google Maps

In `contact.html`, replace the map placeholder with an embedded Google Map:

```html
<iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
    width="100%"
    height="400"
    style="border:0;"
    allowfullscreen=""
    loading="lazy">
</iframe>
```

### Enable Contact Form

For Netlify hosting, the contact form works automatically. For other hosts:

1. Use Formspree (https://formspree.io)
2. Update form action to: `https://formspree.io/f/YOUR_FORM_ID`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Credits

- **Design & Development:** Credly Consult
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Inter)
- **Animations:** AOS Library

## License

© 2025 XcelMR Services Ltd. All Rights Reserved.

---

**Need Help?**

Contact the developer or visit the Netlify/GitHub documentation for deployment assistance.
