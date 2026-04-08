# NexLearn - Premium MCQ Exam Platform

NexLearn is a state-of-the-art web application designed for a premium exam-taking experience. It features a robust multi-step authentication flow and a highly interactive exam interface with real-time status tracking and automated evaluation.

##  Features

### Advanced Authentication
- **Multi-Step Flow**: Seamless transition from Phone Verification → OTP → Profile Creation.
- **Dynamic Country Selection**: Support for multiple country codes with visual flag indicators (India by default).
- **Secure Token Management**: Built-in persistence for access and refresh tokens with automatic request interception.

###  Exam Module
- **Rich Instruction Rendering**: Supports complex HTML instructions for comprehensive paragraphs.
- **Interactive MCQ Interface**: Modern, responsive layout for questions and options.
- **Status Sheet**: Real-time tracking of questions (Answered, Not Attended, Marked for Review).
- **Automatic Test Submission**: Built-in timer that auto-submits your test when time runs out.
- **Manual Review**: Question sheet allows jumping between questions and marking items for later review.

### Results Dashboard
- **Instant Evaluation**: Real-time scoring upon submission.
- **Visual Analytics**: Beautifully designed scorecards with color-coded statistics (Correct, Wrong, Not Attended).
- **History Integration**: Prepared for persistent exam history tracking.

##  Tech Stack
- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 
- **State Management**: Redux Toolkit
- **API Client**: Axios with Interceptors
- **Notifications**: React Toastify
- **Icons**: React Icons (Pi, Hi, etc.)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd nex-learn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Update `src/services/config.ts` with API base URL:
   ```typescript
   export const API_BASE_URL = "https://nexlearn.noviindusdemosites.in/";
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app`: Next.js pages and layouts.
- `src/components`: Reusable UI components and business sections.
- `src/features`: Redux slices and API logic organized by domain (auth, exam).
- `src/services`: Axios configuration and global constants.
- `src/store`: Centralized Redux store configuration.

## Design System
NexLearn uses a curate color palette and premium typography:
- **Brand Colors**: 
  - Primary Teal: `#177A9C`
  - Deep Navy: `#1c2d3a` / `#1a2b3c`
  - Success Green: `#4CAF50`
  - Error Red: `#EE3535`
- **Typography**: Inter & Poppins for a modern, professional look.

## License
Privately developed for NexLearn. All rights reserved.
