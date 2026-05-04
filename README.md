# GymLink

GymLink is a gym partner and personal trainer platform helping users find verified gym partners, discover trainers, join bootcamps and group workouts, and track progress with Make It Count.

## Features

**Gym Member**
- GymLink for today — find a gym partner right now
- GymLink for future date — plan ahead with a calendar picker
- Long-term partner discovery — match by weekly availability
- Browse trainers, bootcamps, and group workouts
- Make It Count — personal record tracker
- Session-separated matching (today vs future vs long-term)
- Booking overlap protection

**Personal Trainer**
- Dashboard with revenue, clients, upcoming sessions
- Post and manage bootcamps (park/outdoor locations)
- Post and manage group workouts (gym-based)
- Accept 1-to-1 PT enquiries
- View attendees, message individuals or groups
- Confirm sessions and move to dashboard
- Close/re-open joining for sessions
- Photo & video media showcase (up to 9 photos, 3 videos)

**Shared**
- Mandatory ID + selfie verification (integration-ready)
- In-app messaging and group chat
- Safety policy with mandatory acceptance
- Gym search by postcode (Google Maps integration-ready)
- Session-keyed request system
- Reliability scoring

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Deploy

## Environment Variables

Copy `.env.example` to `.env.local` and add your API keys when ready:

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_VERIFICATION_PROVIDER_KEY=your_key_here
```

Google Maps and ID verification currently use mock data with TODO comments marking where real API calls should be connected.

## Tech Stack

- React 18
- Vite 5
- Lucide React (icons)
- Inline CSS-in-JS styling
- No external UI framework

## License

Private — all rights reserved.
