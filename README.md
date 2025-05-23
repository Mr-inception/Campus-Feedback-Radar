# Campus Feedback Radar

A full-stack application for collecting and analyzing campus event feedback.

## Project Structure
```
campus-feedback-radar/
├── server/           # Backend (Node.js/Express)
└── campus-feedback-radar-main/  # Frontend (React/Vite)
```

## Backend Setup (Railway Deployment)

1. **Prepare Backend Code**
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository named `campus-feedback-backend`
   - Don't initialize with README

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/campus-feedback-backend.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Railway**
   - Go to [Railway.app](https://railway.app/)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `campus-feedback-backend` repository
   - Railway will automatically deploy your backend
   - Save the deployment URL (e.g., `https://your-app.railway.app`)

## Frontend Setup (Netlify Deployment)

1. **Update API URL**
   - Open `campus-feedback-radar-main/src/lib/api.ts`
   - Update `API_BASE_URL` to your Railway backend URL:
   ```typescript
   const API_BASE_URL = 'https://your-app.railway.app/api';
   ```

2. **Prepare Frontend Code**
   ```bash
   cd campus-feedback-radar-main
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository named `campus-feedback-frontend`
   - Don't initialize with README

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/campus-feedback-frontend.git
   git branch -M main
   git push -u origin main
   ```

5. **Deploy on Netlify**
   - Go to [Netlify.com](https://www.netlify.com/)
   - Sign up/Login with GitHub
   - Click "New site from Git" → "GitHub"
   - Select your `campus-feedback-frontend` repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

## Environment Variables

### Backend (Railway)
Add these environment variables in Railway:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: 5000 (or let Railway assign one)
- `CORS_ORIGIN`: Your Netlify frontend URL

### Frontend (Netlify)
Add these environment variables in Netlify:
- `VITE_API_URL`: Your Railway backend URL

## Testing the Deployment

1. Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
2. Try submitting feedback
3. Check if the feedback appears in the dashboard

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure your backend has the correct CORS configuration:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://your-site.netlify.app'
}));
```

### Database Connection
If the backend can't connect to MongoDB:
1. Check if your MongoDB URI is correct in Railway environment variables
2. Ensure your IP is whitelisted in MongoDB Atlas

### API Connection
If the frontend can't connect to the backend:
1. Verify the API URL in your frontend code
2. Check if the backend is running on Railway
3. Test the API endpoint using Postman or curl

## Support

If you encounter any issues:
1. Check the deployment logs in Railway and Netlify
2. Verify all environment variables are set correctly
3. Ensure all dependencies are properly installed

## License

MIT License #   C a m p u s - F e e d b a c k - R a d a r  
 