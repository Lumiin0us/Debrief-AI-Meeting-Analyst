from langchain_groq import ChatGroq
import json

llm = ChatGroq(model="llama-3.3-70b-versatile")

def cleanText(text):
    if text.startswith('{') and text.endswith('}'):
        return text
    startIndex = text.index('{')
    endIndex = text.rindex('}')
    return text[startIndex: endIndex + 1]

def extractText(transcript):
    message = f'''
    You are a meeting analyst. Analyze the following meeting transcript and extract structured information.

    Transcript:
    {transcript}

    Return ONLY a valid JSON object with exactly these fields:
    {{
        "summary": "2-3 sentence summary of the meeting. If the transcript 
                    is too short or unclear, summarize what you can.",
        
        "action_items": [
            {{
                "task": "what needs to be done",
                "owner": "person responsible, or null if not mentioned",
                "deadline": "when it's due, or null if not mentioned"
            }}
        ],
        
        "decisions": [
            "decision 1",
            "decision 2"
        ],
        
        "follow_up_questions": [
            "unresolved question 1"
        ]
    }}

    Rules:
    - If there are no action items, return an empty list for action_items
    - If no decisions were made, return an empty list for decisions
    - If there are no follow up questions, return an empty list
    - If a field is unknown or not mentioned, use null
    - Return ONLY the JSON. No explanation, no markdown backticks, 
    no extra text. Just the raw JSON object.
    '''
    response = llm.invoke(input=message)

    try:
        jsonResponse = json.loads(cleanText(response.content))
        return jsonResponse
    except json.JSONDecodeError:
        print("Invalid JSON Reponse From Groq")
        return None 


    