# AyurSetu Backend - Deployment Guide

## Local Development

```bash
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

## Production Deployment

### Option 1: Deploy to Render.com (Recommended - Free)

#### Steps:

1. **Push code to GitHub** (already done)

2. **Go to [render.com](https://render.com)** and sign up with GitHub

3. **Create New Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

4. **Configure Service:**

   | Setting | Value |
   |---------|-------|
   | Name | `ayursetu-backend` |
   | Root Directory | `backend` |
   | Runtime | `Node` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Plan | `Free` |

5. **Environment Variables:**
   - Click "Environment"
   - Add variables:
     ```
     NODE_ENV=production
     PORT=5000
     ```

6. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the URL (you'll need this for the frontend)

#### Get Your Backend URL:
Once deployed, Render will give you a URL like:
```
https://ayursetu-backend.onrender.com
```

---

### Option 2: Deploy to Railway.app (Alternative - Free)

1. **Go to [railway.app](https://railway.app)**
2. **Login with GitHub**
3. **Create New Project** → Select your repository
4. **Select `backend` folder**
5. **Add Environment Variables:**
   - `NODE_ENV=production`
   - `PORT=5000`
6. **Deploy** - Railway handles it automatically

Your Railway URL will be something like:
```
https://ayursetu-backend-production.up.railway.app
```

---

## Update Frontend API URL

After deploying the backend, you need to tell Vercel where your backend is:

### On Vercel Dashboard:

1. Go to your **Frontend Project** in Vercel
2. Settings → **Environment Variables**
3. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.com/api` (from Render or Railway)
4. Click **Redeploy** to apply changes

**Example:**
```
VITE_API_URL=https://ayursetu-backend.onrender.com/api
```

---

## API Endpoints

Once running, test the backend health check:

```bash
curl https://your-backend-url.com/healthz
```

Should respond with:
```json
{"status": "ok"}
```

All API routes are prefixed with `/api`:
- `GET /api/doctors` - Get all doctors
- `POST /api/appointments` - Create appointment
- `GET /api/patients` - Get patients
- `POST /api/auth/login` - User login
- `GET /api/analytics` - Analytics data

---

## Troubleshooting

### Backend not connecting from frontend:
1. Check VITE_API_URL environment variable is set correctly
2. Redeploy frontend after setting env var
3. Check browser console for errors

### CORS errors:
- Backend is configured with CORS for all origins (*), should work from any frontend

### Backend sleeping (Render free tier):
- Free Render instances spin down after 15 min of inactivity
- Paid plans keep them running

---

## Environment Variables Reference

### Frontend (.env in frontend folder)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env in backend folder)
```
PORT=5000
NODE_ENV=production
```

---

## Development vs Production

**Development:**
- Frontend: runs on `http://localhost:3000`
- Backend: runs on `http://localhost:5000`
- API URL: `http://localhost:5000/api`

**Production:**
- Frontend: deployed to Vercel
- Backend: deployed to Render/Railway
- API URL: Set via environment variable

