
# Sivenbrak Technologies Deployment Guide

This project is production-ready and can be hosted on any modern static hosting platform.

## Option 1: Vercel (Recommended)
1. Push this code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. In **Environment Variables**, add:
   - Key: `API_KEY`
   - Value: `YOUR_GEMINI_API_KEY`
5. Click **Deploy**. Your site will be live on a `vercel.app` domain (or your own custom domain).

## Option 2: Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add a new site"**.
2. Connect your GitHub repository.
3. Under **Build settings**, use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Under **Site configuration > Environment variables**, add your `API_KEY`.
5. Deploy the site.

## Option 3: Local Development
If you want to run this on your machine:
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Run `npm install`.
3. Create a `.env` file in the root and add `API_KEY=your_key_here`.
4. Run `npm run dev`.
