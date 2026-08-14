# KUYAKHANYA FM Website

> **We Shine Brighter Together**

The official website for **KUYAKHANYA FM**, a community-focused radio station serving and bringing light to **Thembalethu** through quality broadcasting, community engagement, information, entertainment, and inspirational programming.

## 🌐 Live Website

**https://kuyakhanyafm.web.app**

The website is hosted and deployed using **Firebase Hosting**.

## 📻 About KUYAKHANYA FM

KUYAKHANYA FM is built around the vision of bringing people together through radio and community-focused broadcasting.

The website provides information about the station, its vision and mission, objectives, programming, team, and contact channels.

The station's branding uses a distinctive **purple and gold** visual identity, with the slogan:

> **We Shine Brighter Together**

## ✨ Website Features

- KUYAKHANYA FM landing page
- Station introduction
- About Us section
- Vision & Mission
- Aims & Objectives
- Our Team page
- Management team profiles
- Presenter profiles
- Community-focused programming information
- Contact information
- Listen Live / podcast section
- Responsive navigation
- Mobile sidebar navigation
- Responsive design for desktop, tablet, and mobile
- Smart TV / large-screen optimizations
- Accessibility-focused keyboard navigation
- Reduced-motion support
- High-contrast mode support
- Firebase Hosting deployment

## 🛠️ Technologies

This is a lightweight static website built with:

- **HTML5**
- **CSS3**
- **JavaScript**
- **SVG**
- **Font Awesome**
- **Firebase Hosting**

## 🎨 Design System

### Primary Colours

| Colour | Purpose |
|---|---|
| Purple `#6a0dad` | Primary brand colour |
| Light Purple `#8a2be2` | Accent / gradient |
| Dark Purple `#4b0082` | Dark backgrounds |
| Gold `#ffd700` | Accent / buttons / highlights |
| Light Gold `#ffec8b` | Hover states |
| White `#ffffff` | Text and backgrounds |

The website uses purple gradients with gold accents for navigation, buttons, headings, and highlights.

## 📁 Project Structure

```text
kuyakhanya-fm/
│
├── index.html
├── our-team.html
├── firebase.json
├── .firebaserc
├── README.md
│
├── images/
│   ├── Kuyakhanya FM Icon.png
│   ├── team_image.jpg
│   ├── team1.jpg
│   ├── team2.jpg
│   ├── team3.jpg
│   └── ...
│
└── other website assets/
```

## 🚀 Firebase Hosting

### Prerequisites

Install **Node.js** and the Firebase CLI:

```bash
npm install -g firebase-tools
```

Check the installation:

```bash
firebase --version
```

### Login

```bash
firebase login
```

### Initialize Firebase Hosting

From the project root:

```bash
firebase init hosting
```

Select the Firebase project associated with:

```text
kuyakhanyafm.web.app
```

For a static HTML website, select the directory containing `index.html` as the Firebase Hosting public directory.

### Deploy

Deploy Hosting only:

```bash
firebase deploy --only hosting
```

Or deploy all configured Firebase services:

```bash
firebase deploy
```

The live website is:

```text
https://kuyakhanyafm.web.app
```

## 🧪 Local Development

Preview the site locally using the Firebase Hosting emulator:

```bash
firebase emulators:start --only hosting
```

Use this to test navigation, images, responsive layouts, JavaScript interactions, links, and the mobile menu before deployment.

## 📱 Responsive Design

The website is designed for:

- Desktop computers
- Laptops
- Tablets
- Mobile phones
- Large displays / Smart TVs

The navigation changes to a mobile sidebar on smaller screens, while larger displays receive expanded typography and content layouts.

## ♿ Accessibility

Accessibility considerations include:

- Keyboard focus indicators
- Reduced-motion support
- High-contrast mode support
- Semantic HTML structure
- Descriptive image `alt` attributes
- Responsive navigation

## 👥 Our Team

The website contains a dedicated **Our Team** page featuring the station's management, technical team, and presenters.

The team structure includes:

### Management

### Technical Team

### Presenters

## 🔗 Navigation

The main website navigation includes:

- Introduction
- About Us
- Vision & Mission
- Aims & Objectives
- Our Team
- Contact Us
- Listen Live

## 📞 Contact

For current station contact information, visit the official website:

**https://kuyakhanyafm.web.app**

## 🔒 Security

Do **not** place sensitive information in the Firebase Hosting public directory.

Never commit:

```text
.env
service-account.json
firebase-adminsdk-*.json
private keys
passwords
API secrets
database credentials
```

Anything deployed to the Firebase Hosting public directory should be considered publicly accessible.

## 📝 Updating the Website

1. Edit the HTML, CSS, JavaScript, or image files.
2. Test the changes locally.
3. Commit the changes to Git.
4. Deploy to Firebase Hosting.

Example:

```bash
git add .
git commit -m "Update KUYAKHANYA FM website"
git push
firebase deploy --only hosting
```

## 🐛 Troubleshooting

### Images are not loading

Check that:

- The filename matches exactly.
- The image exists inside the deployed directory.
- Relative paths are correct.
- Capital letters, spaces, and special characters in filenames are handled correctly.

### Page returns 404

Check `firebase.json` and verify that the configured Hosting `public` directory contains `index.html`.

Also verify that internal links point to the correct files, for example:

```html
<a href="our-team.html">Our Team</a>
```

### Deployment fails

Try:

```bash
firebase login
firebase projects:list
firebase use
firebase deploy --only hosting
```

## 📄 License

Copyright © 2026 **KUYAKHANYA FM**.

Unless otherwise stated, the station's branding, logo, photographs, written content, and other original media should not be reproduced or redistributed without permission.

## 👨🏾‍💻 Website Development

Website design and development support:

**Simthandile Mthwesi**

Media Manager / Digital & Technology Support

---

## 📊 Project Information

| Item | Details |
|---|---|
| Project | KUYAKHANYA FM Website |
| Website | https://kuyakhanyafm.web.app |
| Hosting | Firebase Hosting |
| Project Type | Static Radio Station Website |
| Frontend | HTML5 / CSS3 / JavaScript |
| Responsive | Yes |
| Mobile Navigation | Yes |
| Accessibility Features | Yes |
| Status | Active |

---

**KUYAKHANYA FM — We Shine Brighter Together.** 📻
