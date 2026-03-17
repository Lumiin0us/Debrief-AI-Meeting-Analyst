from fastapi import FastAPI, UploadFile
from debrief.backend.pipeline.transcriber import transcribeAudio
from fastapi.middleware.cors import CORSMiddleware
from debrief.api.database import Meeting, SessionLocal
import shutil
import os
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        os.getenv("FRONTEND_URL", "") 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/meetings")
def getAllMeetings():
    db = SessionLocal()
    meetings = db.query(Meeting).all()
    db.close()
    return {"All Meetings": [m.to_dict() for m in meetings]}

@app.get("/meetings/{meetingId}")
def getMeeting(meetingId: int):
    db = SessionLocal()
    meeting = db.query(Meeting).filter(Meeting.id == meetingId).first()
    db.close()
    if meeting is None:
        return {"error": "Meeting not found"}
    return {"meeting": meeting.to_dict()}

@app.post("/meetings/{meetingId}/send")
def sendMeeting(meetingId: int):
    return {"message": f"Posts {meetingId} meeting"}

@app.post("/meetings/upload")
async def uploadMeeting(file: UploadFile):
    with open("/tmp/temp_audio", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    try:
        transcript = transcribeAudio("temp_audio")
        db = SessionLocal()
        meeting = Meeting(
            summary=transcript['summary'],
            action_items=json.dumps(transcript['action_items']),
            decisions=json.dumps(transcript['decisions']),
            follow_up_questions=json.dumps(transcript['follow_up_questions'])
        )
        db.add(meeting)
        db.commit()
        db.refresh(meeting)
        result = meeting.to_dict()
        db.close()
        return {"Uploaded File": result}
    finally:
        os.remove("/tmp/temp_audio")