# Veronicah Wanjuu - Sales Professional Portfolio

A modern, responsive portfolio website showcasing Veronicah Wanjuu's expertise in sales, lead generation, and revenue growth.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with subtle animations
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML
- **Performance**: Optimized for fast loading and high Lighthouse scores
- **SEO Ready**: Structured data, meta tags, and sitemap included
- **Contact Forms**: Netlify Forms integration with mailto fallback

## 📁 Project Structure

```
/dist
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet with design tokens
│   ├── js/
│   │   └── main.js         # Interactive functionality
│   └── img/
│       ├── veronicah-profile.jpg  # Profile image (placeholder)
│       ├── icon-192.png    # App icon 192x192
│       └── icon-512.png    # App icon 512x512
├── favicon.png             # Favicon (PNG format)
├── site.webmanifest        # Web app manifest
├── robots.txt              # Search engine directives
├── sitemap.xml             # Site structure for search engines
├── 404.html                # Custom 404 error page
└── README.md               # This file
```

## 🎨 Design System

### Color Palette (Modern & Trustworthy)
- **Brand**: `#0057FF` (Confident blue)
- **Brand Contrast**: `#FFFFFF` (White)
- **Background**: `#F8F9FA` (Light gray)
- **Surface**: `#FFFFFF` (White)
- **Text**: `#212529` (Dark gray)

### Typography
- **Primary Font**: Inter (Headings)
- **Secondary Font**: Source Sans Pro (Body text)
- **Font Sizes**: Responsive scale from 12px to 60px

### Spacing Scale
- Based on 4px/8px grid system
- Consistent spacing tokens from 4px to 96px

## 📋 Content Mapping from PDF

The website faithfully represents all content from the original PDF:

### Sections Included:
1. **Hero/Introduction** - Main value proposition and contact info
2. **About/My Story** - Personal journey and approach
3. **Services** - How I Drive Revenue Growth (3 key areas)
4. **Track Record** - Revenue impact, performance, and expertise
5. **Experience** - Professional work history (3 positions)
6. **Projects** - 4 detailed case studies with results
7. **Skills** - Core competencies in 4 categories
8. **Technology Stack** - Tools and platforms used
9. **Contact** - Call to action and contact form

### Key Metrics Preserved:
- $2M+ in closed revenue
- $3M+ in qualified pipeline
- 300+ qualified meetings
- 100%+ quota attainment
- All specific project results and percentages

## 🚀 Local Development

### Prerequisites
- Modern web browser
- Local web server (optional but recommended)

### Running Locally

#### Option 1: Simple File Server
```bash
# Navigate to the dist folder
cd dist

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve .
```

#### Option 2: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 3: Direct File Access
Simply open `index.html` in your browser (some features may be limited)

## 🌐 Deployment

### GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your site** at: `https://yourusername.github.io/your-repo-name`

### Netlify

1. **Drag and drop** the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
2. **Or connect to Git**:
   - Sign up/login to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: (leave empty)
   - Set publish directory: `dist`
   - Click "Deploy site"
3. **Custom domain** (optional):
   - Go to Site settings > Domain management
   - Add custom domain

### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Deploy**:
   ```bash
   cd dist
   vercel
   ```
3. **Follow prompts** to complete deployment

## ✏️ Customization

### Updating Images
1. Replace placeholder images in `assets/img/` folder
2. Update image paths in HTML if needed
3. Optimize images for web (WebP format recommended)

### Updating Contact Form
The site includes two contact form implementations:

#### Netlify Forms (Recommended)
- Already configured in the HTML
- Works automatically when deployed to Netlify
- Form submissions appear in Netlify dashboard

#### Mailto Fallback
- Automatically used if Netlify Forms not available
- Opens user's email client with pre-filled information

### Updating SEO
1. **Meta tags**: Update in `<head>` section of `index.html`
2. **Structured data**: Modify JSON-LD script in `<head>`
3. **Sitemap**: Update URLs in `sitemap.xml`
4. **Domain**: Replace `veronicah-wanjuu.com` with your domain

### Color Customization
Update CSS custom properties in `styles.css`:
```css
:root {
  --brand: #0057FF;        /* Primary brand color */
  --brand-contrast: #FFFFFF; /* Text on brand color */
  --bg: #F8F9FA;           /* Page background */
  --surface: #FFFFFF;      /* Card backgrounds */
  --text: #212529;         /* Main text color */
}
```

## 📊 Performance & Accessibility

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Accessibility Features
- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Focus management
- Color contrast compliance (4.5:1 ratio)
- Screen reader compatibility
- Skip-to-content link
- Reduced motion support

### Performance Optimizations
- Optimized images with proper sizing
- Efficient CSS with minimal unused styles
- JavaScript performance optimizations
- Lazy loading for non-critical images
- Proper caching headers (when deployed)

## 🔧 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Graceful degradation**: Basic functionality in older browsers

## 📝 Analytics Setup

To add analytics, uncomment and configure the analytics section in `index.html`:

### Plausible Analytics
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Google Analytics 4
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**:
   - Check file paths are correct
   - Ensure images are in the `assets/img/` folder
   - Verify image file extensions match HTML references

2. **Contact form not working**:
   - For Netlify: Ensure deployed to Netlify with forms enabled
   - For mailto: Check if email client is configured

3. **Styles not applying**:
   - Clear browser cache
   - Check CSS file path in HTML
   - Verify no syntax errors in CSS

4. **Mobile menu not working**:
   - Check JavaScript file is loading
   - Verify no JavaScript errors in console

## 📞 Support

For technical issues or customization help:
- Email: vwanjuu@gmail.com
- LinkedIn: [linkedin.com/in/veronicah-wanjuu](https://linkedin.com/in/veronicah-wanjuu)

## 📄 License

This portfolio website is created for Veronicah Wanjuu. All content and design elements are proprietary.

---

**Built with ❤️ using modern web technologies**

