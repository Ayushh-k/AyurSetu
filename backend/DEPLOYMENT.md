# AyurSetu Backend - Deployment Guide

## Local Development

```bash
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

## Production Deployment

### Option 1: Deploy to Render.com (Recommended - Free)

#### Complete Step-by-Step Guide:

**Step 1: Prepare GitHub Repository** ✅ (Already Done)
- Backend code is in `/backend` folder
- `render.yaml` is configured
- `package.json` has `"start": "node server.js"`

**Step 2: Connect to Render**
1. Go to [render.com](https://render.com)
2. Click **Sign up** → Choose **GitHub**
3. Authorize Render to access your GitHub account
4. You'll be redirected to Render dashboard

**Step 3: Create Web Service**
1. Click **New +** button in top right
2. Select **Web Service**
3. Click **Connect Repository**
4. Search for and select `AyurSetu` repository
5. Click **Connect**

**Step 4: Configure Service**

Fill in these exact fields:

| Field | Value |
|-------|-------|
| **Name** | `ayursetu-backend` |
| **Environment** | `Node` |
| **Region** | `Oregon (US West)` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

**Important:** In the "Root Directory" field, make sure it auto-detects as blank (Render will use the render.yaml)

**Step 5: Add Environment Variables**
1. Scroll down to **Environment** section
2. Click **Add Environment Variable**
3. Add these variables:

```
NODE_ENV = production
PORT = 5000
```

**Step 6: Deploy**
1. Click **Create Web Service** button
2. Render will start building automatically
3. Wait for the build to complete (2-3 minutes)
4. Look for green ✓ and URL like: `https://ayursetu-backend.onrender.com`

**Your backend URL:** Copy this URL - you'll need it in the next step!

---

### Option 2: Deploy to Railway.app (Alternative - Free)

1. **Go to** [railway.app](https://railway.app)
2. **Login** with GitHub
3. **Create New Project** → Select your repository
4. **Point to `/backend` folder**
5. **Add Environment Variables:**
   - `NODE_ENV=production`
   - `PORT=5000`
6. Railway auto-deploys

Your Railway URL will be something like:
```
https://ayursetu-backend-production.up.railway.app
```

---

## Connect Frontend to Backend

**CRITICAL STEP:** After backend is deployed, the frontend needs to know where to find it.

### On Vercel Dashboard:

1. **Open Vercel** and go to your **Frontend Project**
2. Click **Settings** (in the navigation bar)
3. Scroll to **Environment Variables**
4. Click **Add New Environment Variable**

Fill in:
```
Name:  VITE_API_URL
Value: https://your-backend-url.com/api
```

**Example:**
```
VITE_API_URL=https://ayursetu-backend.onrender.com/api
```

5. Click **Save**
6. Click **Deployments** tab
7. Find the latest deployment and click **Redeploy**

**Wait 2-3 minutes for redeploy to complete**

---

## Test Your Deployment

### Test Backend is Running:
```bash
curl https://your-backend-url.com/healthz
```

Should respond with:
```json
{"status": "ok"}
```

### Test Frontend-Backend Connection:
1. Open your frontend URL in browser
2. Open browser **DevTools** (F12)
3. Go to **Console** tab
4. If no errors about API, it's working! ✅

---

## API Endpoints

Once running, test these endpoints:

```bash
# Health check
curl https://your-backend-url.com/healthz

# Get all doctors
curl https://your-backend-url.com/api/doctors

# Get appointments
curl https://your-backend-url.com/api/appointments
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
1. ✅ Check VITE_API_URL is correct on Vercel
2. ✅ Make sure you got the URL from your deployed backend (Render/Railway)
3. ✅ URL should include `/api` at the end
4. ✅ Redeploy frontend after setting env var
5. ✅ Check browser console for errors

### "Application Error" on Render:
1. Click the deployment in Render
2. Go to **Logs** tab to see error messages
3. Common issues:
   - Missing dependencies: `npm install` should fix it
   - Port already in use: Should be freed automatically
   - Check server.js for syntax errors

### CORS errors in browser:
- Backend is configured with CORS for all origins (*)
- If still getting CORS errors, check browser console for exact error

### Backend keeps spinning down (Free tier):
- Free Render instances sleep after 15 min of inactivity
- Cold start takes 30-60 seconds when woken
- Upgrade to Paid plan to keep it always running
- Or keep frontend making requests to keep it alive

---

## Environment Variables Reference

### Frontend (Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env file in backend folder)
```
PORT=5000
NODE_ENV=production
```

---

## Development vs Production Quick Reference

| Aspect | Development | Production |
|--------|-------------|------------|
| Frontend URL | `http://localhost:3000` | Vercel URL |
| Backend URL | `http://localhost:5000` | Render/Railway URL |
| API Base | `http://localhost:5000/api` | Render/Railway URL + `/api` |
| Env Vars | Local `.env` file | Vercel/Render dashboard |

---

## Quick Deploy Checklist

- [ ] Backend code pushed to GitHub
- [ ] Created Render.com account and connected GitHub
- [ ] Deployed backend to Render (have the URL ready)
- [ ] Added `VITE_API_URL` env var to Vercel
- [ ] Redeployed frontend on Vercel
- [ ] Tested `/healthz` endpoint
- [ ] Tested API call from frontend works

---

## Need Help?

- **Can't find Build/Start commands:** Use the render.yaml file (already configured)
- **URL not working:** Wait 2-3 min after deploy, cold start takes time
- **API returning 500:** Check Render logs for server errors
- **CORS errors:** Already configured to allow all origins

