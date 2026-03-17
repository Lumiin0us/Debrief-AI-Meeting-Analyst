import whisper
from debrief.backend.pipeline.extractor import extractText

def transcribeAudio(audioFile):
    model = whisper.load_model("base")
    transcript = model.transcribe(audioFile)
    jsonTranscript = extractText(transcript['text'])
    return jsonTranscript