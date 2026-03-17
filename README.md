# Debrief — AI Meeting Analyst

Debrief is a full-stack AI application that transforms meeting recordings into structured, actionable intelligence. Upload an audio or video file and Debrief automatically transcribes the conversation and stores everything for future reference.

## Live Demo
[Try Debrief](https://debrief-ai-meeting-analyst.vercel.app/)

---

## How It Works

Debrief runs a three-stage AI pipeline on every uploaded meeting:

**Transcription** — OpenAI Whisper converts the audio file into clean text.

**Extraction** — The transcript is sent to a Groq-hosted LLM which analyzes the conversation and extracts structured information: a concise summary, action items with owners and deadlines, decisions made, and unresolved follow-up questions.

**Storage** — The extracted data is stored in a SQLite database via SQLAlchemy, making every meeting retrievable across sessions.

---

## Tech Stack

OpenAI Whisper
Groq API (llama-3.3-70b-versatile)
FastAPI
SQLite
SQLAlchemy
ReactJS
Tailwind CSS
Vercel (frontend)
Railway (backend)

---

## Project Structure
```
Debrief/
├── debrief/
│   ├── api/
│   │   ├── main.py              ← FastAPI endpoints
│   │   └── database.py          ← SQLAlchemy models + SQLite
│   ├── backend/
│   │   └── pipeline/
│   │       ├── transcriber.py   ← Whisper transcription
│   │       └── extractor.py     ← Groq LLM extraction
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── MeetingPage.jsx
│   │   └── App.jsx
│   └── package.json
├── .gitignore
└── README.md
```

---

## API Endpoints
```
GET  /health                  → health check
POST /meetings/upload         → upload audio
GET  /meetings                → retrieve all past meetings
GET  /meetings/{id}           → retrieve a specific meeting
POST /meetings/{id}/send      → email summary to attendees
```

---

## Pipeline
```
User uploads audio file
        ↓
FastAPI receives file → saves temporarily to /tmp
        ↓
Whisper transcribes audio 
        ↓
Groq LLM extracts structured data:
   • Summary
   • Action items (task, owner, deadline)
   • Decisions made
   • Follow-up questions
        ↓
Result stored in SQLite via SQLAlchemy
        ↓
Temp file deleted
        ↓
Structured JSON returned to React frontend
```

---

## Supported Audio Formats

mp3, mp4, wav, m4a, ogg, flac, webm, mov

---

## Debrief UI

<img width="504" height="607" alt="Screenshot 2026-03-16 at 1 07 00 AM" src="https://github.com/user-attachments/assets/64f64b3b-2dbc-4dee-8a98-adaaf26baa57" />
<img width="1440" height="722" alt="Screenshot 2026-03-16 at 1 06 53 AM" src="https://github.com/user-attachments/assets/6c46733b-aaa0-4d45-928a-4e299b02a25e" />
<img width="1439" height="724" alt="Screenshot 2026-03-16 at 1 06 39 AM" src="https://github.com/user-attachments/assets/6827aec1-1dcc-4522-b0a1-14da31ee228e" />
