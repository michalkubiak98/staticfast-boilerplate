# 🚀 StaticFast - Complete Guide to Your Professional Website

**Welcome!** This guide will take you from zero to a live professional website. We'll be thorough and detailed so you understand each step and avoid problems.

## 📋 What You'll Get

- ✅ **Professional responsive website** (mobile-friendly)
- ✅ **Lightning-fast loading** (hosted on AWS CloudFront CDN)
- ✅ **Your own domain** (like yourcompany.com)
- ✅ **SSL certificate** (secure HTTPS)
- ✅ **Automatic deployments** (updates go live instantly)
- ✅ **Cost-effective** (~$2-3/month total)

## ⚠️ IMPORTANT: Read This First

**This guide assumes you have basic command line knowledge.** You'll need to:
- Open Terminal (Mac/Linux) or Command Prompt (Windows)
- Navigate to directories with `cd`
- Run commands like `npm install`

**Claude Code will help, but it can't do everything automatically.** You'll need to:
- Set up CLI authentication yourself (AWS and GitHub)
- Approve commands that Claude Code suggests
- Provide information when Claude Code asks questions

---

## 🛠️ Prerequisites - Set These Up First

### 1. Install Required Tools

**Node.js 18+ (Required)**
- Download from [nodejs.org](https://nodejs.org/)
- Verify: `node --version` (should show v18 or higher)

**AWS CLI (Required)**
- Install: [docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Verify: `aws --version`

**GitHub CLI (Required)**
- Install: [cli.github.com](https://cli.github.com/)
- Verify: `gh --version`

**Claude Code CLI (Required)**
- Install: Follow instructions at [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
- Verify: `claude --version`

### 2. Create Required Accounts

**AWS Account**
- Sign up at [aws.amazon.com](https://aws.amazon.com)
- You'll need a credit card (for identity verification)
- Free tier covers small websites (~$0-2/month)

**GitHub Account**
- Sign up at [github.com](https://github.com)
- Free for personal/small business use

**Anthropic Account with Claude Code Access**
- You need Pro/Max subscription OR Console billing
- Sign in at [console.anthropic.com](https://console.anthropic.com)

### 3. Get Your AWS Account ID

You'll need this for Claude Code. Here's how to find it:

1. Log into [AWS Console](https://console.aws.amazon.com)
2. Click your name in the top-right corner
3. Your Account ID is the 12-digit number shown
4. **Write this down** - you'll need it later

---

## 🔑 CRITICAL STEP: CLI Authentication

**⚠️ You MUST do this before using Claude Code, or nothing will work!**

### Authenticate AWS CLI

Open Terminal/Command Prompt and run:

```bash
aws configure
```

You'll be prompted for:
- **AWS Access Key ID**: Get this from AWS Console → IAM → Users → Your User → Security Credentials
- **AWS Secret Access Key**: Get this with the Access Key (shown only once)
- **Default region name**: Use `us-east-1` (recommended for this guide)
- **Default output format**: Use `json`

**Alternative: Use AWS SSO (if your company uses it)**
```bash
aws configure sso
```

**Verify it works:**
```bash
aws sts get-caller-identity
```
Should show your account info.

**📚 Detailed AWS CLI Setup Guide:**
[docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)

### Authenticate GitHub CLI

```bash
gh auth login
```

Follow the prompts:
1. Choose **GitHub.com** (unless you use Enterprise)
2. Choose **HTTPS** or **SSH** (HTTPS is easier for beginners)
3. Choose **Login with a web browser**
4. Copy the one-time code shown
5. Press Enter to open browser
6. Paste the code and authenticate

**Verify it works:**
```bash
gh auth status
```
Should show you're logged in.

**📚 Detailed GitHub CLI Setup Guide:**
[cli.github.com/manual/gh_auth_login](https://cli.github.com/manual/gh_auth_login)

---

## 🌐 PHASE 1: Deploy Your Website

### Step 1: Navigate to Your Project Directory

**Important:** Claude Code works in your current directory. Navigate to where you have the StaticFast boilerplate:

```bash
cd /path/to/staticfast-boilerplate
```

### Step 2: Start Claude Code

```bash
claude
```

This opens an interactive session with Claude Code.

### Step 3: Use This Detailed Prompt

**Copy and paste this EXACTLY, but replace the bracketed values with your information:**

```
I want to create a professional business website using this StaticFast boilerplate. I need you to guide me through each step carefully and ask for my approval before running any commands I might not understand.

Here's what I want you to help me do:

1. First, ask me detailed questions about my business and website design preferences:
   - Show me examples of color schemes and ask what I prefer
   - Ask about my business type and target audience
   - Help me choose appropriate content and imagery
   - Ask about layout preferences and any specific features I need

2. Copy this boilerplate to a new directory called "my-website"

3. Configure the .env file with my business details (I'll provide them)

4. Help me test the website locally with npm run dev so I can see how it looks

5. Only after I'm satisfied with the local version, deploy the infrastructure to AWS

6. Build and upload the website to S3

7. Set up a GitHub repository with automatic deployments

8. Add all environment variables as GitHub Secrets

IMPORTANT: 
- Ask me to approve each command before you run it
- Explain what each step does and why it's necessary
- Stop and let me review the website locally before deploying to AWS
- Walk me through any errors if they occur

My basic details to start with:
- Business Name: [YOUR BUSINESS NAME]
- Business Type: [e.g., Restaurant, Consulting, Retail, etc.]
- Target Audience: [Who are your customers?]
- Phone: [YOUR PHONE]
- Email: [YOUR EMAIL]
- Address: [YOUR ADDRESS OR CITY/STATE]

AWS details:
- Account ID: [YOUR 12-DIGIT AWS ACCOUNT ID]
- Region: us-east-1
- Project name: [unique-project-name-no-spaces]

GitHub username: [YOUR GITHUB USERNAME]

Please start by asking me questions about my business and design preferences, and show me some examples to choose from.
```

### What Happens Next

Claude Code will:

1. **Ask you detailed questions** about your business, design preferences, colors, content, etc.
2. **Show you examples** and help you make design decisions
3. **Create your project** in a new directory
4. **Set up the environment** with your business details
5. **Start the local development server** so you can see your website
6. **Ask for your approval** before each major step
7. **Deploy to AWS** only after you're happy with the local version
8. **Set up GitHub** for automatic deployments

### IMPORTANT: You Must Approve Commands

Claude Code will show you commands like:
```bash
npm install
aws cdk deploy
gh repo create
```

**You need to approve these!** Claude Code will explain:
- What each command does
- Why it's necessary
- What to expect

If you don't understand something, ask Claude Code to explain further.

---

## 🎨 Design and Content Process

Claude Code will help you with:

**Content Strategy:**
- Headlines that convert visitors
- Service descriptions that sell
- Pricing that makes sense
- Contact information that builds trust

**Design Choices:**
- Color schemes that match your industry
- Typography that's professional and readable
- Layout that guides visitors to take action
- Images that represent your business

**Examples Claude Code might show:**
- "Here are 5 color schemes popular for restaurants..."
- "These headlines work well for consulting businesses..."
- "Here's how your pricing section will look..."

**Take your time with this part!** The website design and content are crucial for your business success.

---

## 🌍 PHASE 2: Custom Domain Setup

### Option A: Buy Domain Through AWS Route53

**After your website is live, use this prompt:**

```
My website is working on the CloudFront URL. Now I want to add a custom domain. Please help me:

1. Search for available domains in Route53 that match my business
2. Show me pricing for different domain extensions (.com, .org, .net, etc.)
3. Help me purchase the domain I choose
4. Update my CDK infrastructure to use the custom domain
5. Deploy the changes and verify everything works

I want to search for domains related to: [your business name/keywords]
```

**Manual Steps (if you prefer):**
1. Go to [AWS Route53 Console](https://console.aws.amazon.com/route53/)
2. Click "Register Domain"
3. Search for your desired domain
4. Complete purchase (~$12/year for .com)
5. Domain will be ready in 5-15 minutes

### Option B: Use Existing Domain (Manual Setup)

If you already own a domain from GoDaddy, Namecheap, etc.:

**What you'll need from your current registrar:**
- Domain authorization code (EPP code)
- Unlock domain for transfer
- Disable privacy protection temporarily

**Transfer process:**
1. Get authorization code from your current registrar
2. Unlock domain in your registrar's control panel
3. Use Claude Code to help transfer to Route53

**OR keep domain at current registrar and just update DNS:**
1. Get the CloudFront distribution URL from AWS
2. Update DNS records at your current registrar:
   - Create CNAME record: `www` → `your-cloudfront-url`
   - Create A record redirect: `@` → `www.yourdomain.com`

---

## 💰 Complete Cost Breakdown (2025)

### AWS Hosting Costs (Monthly)
| Service | Cost | What It Does |
|---------|------|--------------|
| Route53 Hosted Zone | $0.50 | DNS management |
| CloudFront Distribution | $0-2.00 | Global CDN (first 1TB free) |
| S3 Storage | $0.02-0.10 | File hosting |
| SSL Certificate | FREE | HTTPS security |
| **Total Monthly** | **$0.52-2.60** | |

### One-Time & Annual Costs
| Item | Cost | Frequency |
|------|------|-----------|
| Domain registration (.com) | ~$12 | Annual |
| Domain transfer (if applicable) | ~$12 | One-time |

### GitHub & Claude Code
- GitHub: FREE for personal use
- Claude Code: Part of your Anthropic subscription

**Total cost to run a professional website: ~$12-24/year + $6-31/year AWS**

---

## 🔄 Making Changes to Your Website

### Start Claude Code in Your Project Directory

**IMPORTANT:** Always navigate to your website directory first:

```bash
cd my-website  # or whatever you named your project directory
claude
```

### Simple Text/Content Changes

```
I want to update my website content:

Change: [SPECIFIC THING] 
To: [NEW VALUE]

For example:
- Change phone number from 555-1234 to 555-5678
- Update service price from $100 to $150
- Change business address
- Update business hours

Please make the change, test it locally, and deploy to production.
```

### Design Changes

```
I want to modify my website design:

1. [DESCRIBE CHANGE 1 - e.g., "Change color scheme to green and gold"]
2. [DESCRIBE CHANGE 2 - e.g., "Add a testimonials section"]
3. [DESCRIBE CHANGE 3 - e.g., "Reorganize the services section"]

Please:
- Show me examples or options for each change
- Make the modifications
- Let me review locally with npm run dev
- Deploy once I approve

Please start by asking me questions about exactly what I want.
```

### Adding New Content

```
I want to add new content to my website:

New content: [DESCRIBE WHAT YOU WANT TO ADD]

Examples:
- Add a photo gallery
- Add a blog section
- Add a team/about us page
- Add customer testimonials
- Add a FAQ section
- Add a contact form

Please guide me through the options and help me implement this.
```

---

## 🧹 Cleanup (Remove Everything)

### When You Want to Remove Everything

**Navigate to your project directory:**
```bash
cd my-website  # your project directory
```

**Run the cleanup script:**
```bash
./cleanup.sh
```

**What happens:**
1. Script asks for confirmation (type 'yes')
2. Deletes S3 bucket and all files
3. Removes CloudFront distribution
4. Deletes SSL certificates
5. Removes Route53 records
6. Cleans up CDK stack

**Cost after cleanup: $0** ✅

**Domain note:** Your domain registration is separate - it won't be deleted. You can:
- Keep the domain for future use
- Transfer it elsewhere
- Let it expire (you'll get renewal notices)

---

## 🆘 Troubleshooting

### Starting Claude Code Troubleshooting

**Navigate to your project directory first:**
```bash
cd my-website
claude
```

**Then use this prompt:**
```
My website has a problem. Please help me diagnose and fix it:

Problem: [DESCRIBE WHAT'S NOT WORKING]

Error message (if any): [PASTE FULL ERROR MESSAGE HERE]

What I was trying to do: [DESCRIBE WHAT YOU WERE DOING WHEN IT BROKE]

Please:
1. Help me understand what went wrong
2. Check relevant logs and configuration
3. Fix the issue step by step
4. Test that everything works again
5. Explain how to prevent this in the future
```

### Common Issues and Solutions

**"Command not found" errors:**
- Make sure you installed all the prerequisites
- Restart your terminal after installing tools
- Check your PATH environment variable

**"Authentication failed" errors:**
- Re-run `aws configure` and `gh auth login`
- Verify your credentials are correct
- Check that your AWS account has necessary permissions

**Website not loading:**
- Check CloudFront distribution status in AWS Console
- Verify S3 bucket contains your files
- DNS propagation can take up to 48 hours for new domains

**Build/deployment failures:**
- Check GitHub Actions logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure AWS credentials have sufficient permissions

**Local development issues:**
- Make sure you're in the correct directory (`cd my-website`)
- Verify `.env` file exists and has correct values
- Try deleting `node_modules` and running `npm install` again

---

## 📚 Additional Resources

### Official Documentation
- **AWS CLI Setup**: [docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)
- **GitHub CLI Setup**: [cli.github.com/manual/gh_auth_login](https://cli.github.com/manual/gh_auth_login)
- **Claude Code Documentation**: [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
- **AWS Route53 Domain Registration**: [docs.aws.amazon.com/route53/latest/developerguide/domain-register.html](https://docs.aws.amazon.com/route53/latest/developerguide/domain-register.html)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

### Understanding the Technology Stack
- **Next.js**: React framework for building websites
- **Tailwind CSS**: Utility-first CSS framework for styling
- **AWS S3**: Cloud storage for your website files
- **AWS CloudFront**: Content delivery network (CDN) for fast loading
- **AWS Route53**: DNS service for your domain
- **GitHub Actions**: Automated deployment pipeline

---

## ❓ Frequently Asked Questions

### Q: How long does this whole process take?
**A:** 
- **Setup and prerequisites**: 30-60 minutes (one-time)
- **Phase 1 (temporary domain)**: 20-40 minutes
- **Phase 2 (custom domain)**: 10-30 minutes
- **Total first-time setup**: 1-2 hours

### Q: What if I make a mistake?
**A:** No problem! You can:
- Run `./cleanup.sh` to remove everything and start over
- Use Claude Code to fix specific issues
- The AWS free tier protects you from large bills

### Q: Can I use this for multiple clients?
**A:** Yes! Just:
- Create separate directories for each client
- Use different project names in AWS
- Keep separate GitHub repositories

### Q: What if I don't like the design?
**A:** Claude Code can completely redesign the website:
```
I want to completely redesign my website. Please help me:
1. Show me different design styles and layouts
2. Help me choose colors, fonts, and overall aesthetic
3. Rebuild the website with the new design
4. Test and deploy the changes
```

### Q: Can I add a blog or more pages?
**A:** Yes, but with some limitations:
- **Static pages**: Easy to add (About, Services, Contact, etc.)
- **Blog**: Possible with external CMS (Contentful, Strapi, etc.)
- **Dynamic features**: Limited - this is a static site

### Q: What about SEO (search engine optimization)?
**A:** The boilerplate includes:
- Proper meta tags and titles
- Responsive design (mobile-friendly)
- Fast loading times
- SSL certificate
- Sitemap generation

Claude Code can help you optimize further for search engines.

### Q: Is my website secure?
**A:** Yes:
- HTTPS enforced everywhere
- S3 bucket is private (not publicly accessible)
- No server to hack (static files only)
- Regular AWS security updates

### Q: What if AWS changes their pricing?
**A:** 
- AWS rarely increases prices (usually decreases)
- You'll get 30+ days notice of any changes
- Your monthly costs are minimal anyway
- You can always migrate elsewhere if needed

---

## 🚀 Ready to Start?

### Checklist Before You Begin:
- [ ] AWS account created and verified
- [ ] GitHub account created
- [ ] Claude Code access confirmed
- [ ] Node.js 18+ installed
- [ ] AWS CLI installed and configured (`aws sts get-caller-identity` works)
- [ ] GitHub CLI installed and authenticated (`gh auth status` shows logged in)
- [ ] Claude Code CLI installed and working
- [ ] You have your AWS Account ID written down

### If Everything Above is Checked:
1. Navigate to your StaticFast boilerplate directory
2. Run `claude` to start an interactive session
3. Use the detailed prompt from Phase 1
4. Let Claude Code guide you through the process

**Remember:** Claude Code will ask for your approval before running commands, and you can ask questions at any time. Take your time to understand each step!

---

## 🎯 What This Boilerplate IS and ISN'T

### ✅ Perfect For:
- Business websites (restaurants, consulting, retail, etc.)
- Professional portfolios
- Landing pages for marketing campaigns
- Company information sites
- Service-based business websites
- Local business websites

### ⚠️ Has Limitations For:
- User accounts/login systems
- Real-time features (chat, live updates)
- Large e-commerce stores (though simple product catalogs work)
- Complex databases
- Server-side processing

### ❌ NOT Suitable For:
- Social media platforms
- Complex web applications
- Sites requiring user-generated content
- Real-time collaboration tools
- Sites with thousands of products

---

**Questions?** Start Claude Code in your project directory and ask! It knows everything about this boilerplate and can help with any issues.

**Let's build something amazing!** 🎉