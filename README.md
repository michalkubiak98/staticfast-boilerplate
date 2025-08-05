# StaticFast Boilerplate 🚀

**The fastest way to deploy professional business websites using Claude Code and AWS.**

Perfect for developers who want to build client websites without the complexity. Just copy, configure, and deploy.

## What You Get

✅ **Professional Next.js website** with responsive design  
✅ **AWS hosting** (S3 + CloudFront + Route53) via CDK  
✅ **GitHub Actions** for automatic deployments  
✅ **Environment-driven** - everything configurable via `.env`  
✅ **Custom domains** with SSL certificates  
✅ **Claude Code integration** - AI handles the technical work  

**Total monthly cost: ~$2-3** • **Setup time: ~30 minutes**

## Live Demo

🌐 **[View Live Demo](https://your-demo-url.cloudfront.net)** (Built with this boilerplate)

## Quick Preview

```bash
# See what it looks like locally
git clone https://github.com/your-username/staticfast-boilerplate
cd staticfast-boilerplate
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the professional website template.

## 🎯 Perfect For

- **Web agencies** building client websites
- **Freelance developers** who want fast deployment
- **Small businesses** needing professional websites
- **Consultants** building landing pages
- **Anyone** who wants AWS hosting without the complexity

## 📚 How to Use This Boilerplate

### Option 1: Read the Complete Guide Online
**👉 [View FIRST-STEPS.md in Live Markdown Viewer](https://markdownlivepreview.com/)** 

Copy the raw content from [FIRST-STEPS.md](./FIRST-STEPS.md) and paste it into the viewer for a beautifully formatted, easy-to-follow guide.

### Option 2: Quick Start (Experienced Developers)

1. **Prerequisites**: AWS CLI, GitHub CLI, Claude Code CLI all authenticated
2. **Copy this repo** to your new project directory
3. **Navigate to your project** and run `claude`
4. **Use this prompt with Claude Code**:
   ```
   Help me deploy this StaticFast boilerplate to AWS:
   1. Configure .env with my business details
   2. Test locally with npm run dev  
   3. Deploy CDK infrastructure to AWS
   4. Set up GitHub repository with auto-deployment
   
   My business: [YOUR BUSINESS NAME]
   AWS Account ID: [YOUR 12-DIGIT ID]
   Domain: [yourcompany.com or skip for now]
   ```

## 🏗️ What's Included

### Frontend
- **Modern design** - Clean, professional, mobile-first
- **Tailwind CSS** - Easy customization and styling
- **TypeScript** - Type safety and better development experience
- **Environment variables** - Brand colors, content, contact info all configurable

### Infrastructure (AWS)
- **S3 Bucket** - Secure static hosting
- **CloudFront CDN** - Global fast loading
- **Route53 DNS** - Custom domain support
- **SSL Certificate** - Automatic HTTPS
- **CDK Infrastructure** - Version-controlled infrastructure as code

### CI/CD
- **GitHub Actions** - Automatic deployment on git push
- **Environment secrets** - Secure handling of sensitive data
- **Build optimization** - Compressed assets, optimized images

## 💰 Transparent Pricing

| Service | Monthly Cost | What It Does |
|---------|--------------|--------------|
| AWS Route53 | $0.50 | DNS hosting |
| AWS CloudFront | $0-2.00 | Global CDN (1TB free) |
| AWS S3 | $0.02-0.10 | File storage |
| SSL Certificate | FREE | HTTPS security |
| **Total** | **$0.52-2.60/month** | |

Plus ~$12/year for domain registration.

## 🚀 Why This Boilerplate?

### ❌ Without StaticFast:
- Weeks of AWS configuration
- Complex CDK setup
- Manual CI/CD pipeline creation
- Security configuration headaches
- Domain and SSL setup frustration

### ✅ With StaticFast:
- **30 minutes** from zero to live website
- **Claude Code does the work** - just answer questions
- **Professional result** that impresses clients
- **Secure by default** - S3 private, HTTPS enforced
- **Maintenance-free** - automatic deployments and updates

## 📱 Responsive & Professional

The template includes:
- **Hero section** with compelling headlines
- **Services/pricing** showcase
- **Contact forms** and business information
- **Testimonials** and social proof
- **SEO optimization** built-in
- **Mobile-first design** that works everywhere

## 🛠️ Easy Customization

Everything is configurable via `.env`:

```bash
# Business branding
BUSINESS_NAME="Your Company"
PRIMARY_COLOR="#3b82f6"
HERO_TITLE_LINE1="Professional"
HERO_TITLE_LINE2="Websites That Convert"

# Contact info
PHONE="555-123-4567"
EMAIL="hello@yourcompany.com"
ADDRESS="123 Main St, City, State"

# Services
SERVICE_1_NAME="Starter Website"
SERVICE_1_PRICE="$997"
SERVICE_1_DESCRIPTION="Perfect for small businesses..."
```

Change colors, content, pricing, contact info - no coding required.

## 🎯 Claude Code Integration

This boilerplate is designed specifically for Claude Code:

- **Smart prompts** included in documentation
- **Step-by-step workflows** for common tasks
- **Error handling** guidance
- **Update procedures** for content changes

Claude Code will:
- Ask about your business and design preferences
- Configure everything based on your needs
- Deploy to AWS automatically
- Set up GitHub repository and deployments
- Handle technical issues and troubleshooting

## 📖 Documentation

| File | Purpose | When to Use |
|------|---------|-------------|
| **[FIRST-STEPS.md](./FIRST-STEPS.md)** | Complete beginner guide | Start here! Step-by-step from zero to live website |
| **[.env.example](./.env.example)** | All configuration options | See what you can customize |
| **[cleanup.sh](./cleanup.sh)** | Remove all AWS resources | When done testing or starting over |

## 🔍 File Structure

```
├── src/app/                    # Next.js 15 app directory
│   ├── page.tsx               # Homepage with dynamic content
│   ├── layout.tsx             # SEO metadata and global layout  
│   └── globals.css            # Tailwind CSS with custom properties
├── cdk/                       # AWS CDK infrastructure
│   ├── bin/app.ts            # CDK app entry point
│   └── lib/staticfast-stack.ts # S3, CloudFront, Route53 setup
├── .github/workflows/         # GitHub Actions CI/CD
│   └── deploy.yml            # Automatic deployment pipeline
├── .env.example              # All customizable environment variables
├── FIRST-STEPS.md           # Complete setup guide
└── cleanup.sh               # One-command cleanup script
```

## 🎨 Live Examples

Websites built with this boilerplate:

- **[Happy Paws Dog Daycare](https://example1.com)** - Local service business
- **[TechConsult Pro](https://example2.com)** - Consulting firm
- **[Artisan Bakery](https://example3.com)** - Local retail business

*Each took under 1 hour to deploy and customize.*

## 🆘 Support & Troubleshooting

**Having issues?** The documentation covers everything:

1. **[FIRST-STEPS.md](./FIRST-STEPS.md)** - Complete setup guide with troubleshooting
2. **Claude Code** - Just describe your problem and it will help fix it
3. **GitHub Issues** - Report bugs or request features

Common issues and solutions are documented with step-by-step fixes.

## 🚀 Ready to Get Started?

### 📋 Pre-flight Checklist:
- [ ] AWS account created
- [ ] GitHub account created  
- [ ] Claude Code access confirmed
- [ ] AWS CLI authenticated (`aws sts get-caller-identity` works)
- [ ] GitHub CLI authenticated (`gh auth status` shows logged in)

### 🎯 Next Steps:
1. **Read the guide**: [FIRST-STEPS.md](./FIRST-STEPS.md) or view it in [Live Markdown Viewer](https://markdownlivepreview.com/)
2. **Copy this boilerplate** to your project directory
3. **Run `claude`** and use the prompts from the guide
4. **Deploy your professional website** in ~30 minutes

## ⭐ Star This Repo

If this boilerplate saves you time, please star it! It helps other developers discover this tool.

## 📄 License

MIT License - Use freely for client projects and commercial work.

---

**Built with ❤️ for developers who want to focus on business results, not infrastructure complexity.**

[Get Started Now →](./FIRST-STEPS.md)