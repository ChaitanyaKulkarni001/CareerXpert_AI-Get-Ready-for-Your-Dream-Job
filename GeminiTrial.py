apikey = "AIzaSyAnpEybMeLXj5UZ3KGAMiG-9d_cxpdhto8"

import google.generativeai as genai

genai.configure(api_key=apikey)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("How to make a cake")
print(f"Response type: {type(response)}")

# If the response contains candidates, extract the text
if response and hasattr(response, 'candidates') and response.candidates:
    text_response = response.candidates[0].content.parts[0].text
    print(f"Extracted text: {text_response}")
else:
    print("No response from the model.")
print(response.text)


