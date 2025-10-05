# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Jatin Garg's Game Developer Portfolio website.

## Current Frontend State
- Frontend uses mock data from `/src/components/mock.js`
- Static portfolio display with personal info, experience, projects, skills
- Contact section with email and LinkedIn links
- No dynamic functionality currently implemented

## Backend Requirements

### 1. Contact Form API
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions and send emails

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": boolean,
  "message": "string"
}
```

### 2. Portfolio Data API (Optional Enhancement)
**Endpoint:** `GET /api/portfolio`
**Purpose:** Serve portfolio data dynamically instead of mock data

**Response:** Portfolio data structure matching current mock.js format

### 3. Analytics API (Future Enhancement)
**Endpoint:** `POST /api/analytics/visit`
**Purpose:** Track portfolio visits and interactions

## Mock Data to Backend Migration

### Current Mock Data Location
- File: `/src/components/mock.js`
- Contains: Personal info, skills, experience, projects, education, leadership

### Backend Implementation Plan
1. **Phase 1:** Implement contact form functionality
   - Add contact form component to frontend
   - Create email service in backend
   - Handle form submissions

2. **Phase 2:** (Optional) Move static data to database
   - Create models for portfolio sections
   - Implement CRUD APIs
   - Update frontend to use API data

## Frontend Integration Points

### Contact Form Integration
- Add contact form component in contact section
- Replace static contact cards with functional form
- Add form validation and success/error handling

### Email Configuration Required
- SMTP settings for sending contact emails
- Email templates for contact notifications

## Database Schema (If implementing Phase 2)

### Portfolio Collection
```javascript
{
  _id: ObjectId,
  personal: {
    name: String,
    title: String,
    email: String,
    // ... other personal fields
  },
  experience: [/* experience objects */],
  projects: [/* project objects */],
  skills: {/* skills object */},
  // ... other sections
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: Date,
  status: String // 'new', 'read', 'replied'
}
```

## Implementation Priority
1. **High Priority:** Contact form functionality
2. **Medium Priority:** Portfolio data API
3. **Low Priority:** Analytics and admin features

## Notes
- Keep current frontend design and styling intact
- Ensure mobile responsiveness is maintained
- Add proper error handling and loading states
- Consider rate limiting for contact form submissions