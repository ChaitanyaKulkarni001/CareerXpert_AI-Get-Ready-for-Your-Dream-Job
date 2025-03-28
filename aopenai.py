site = 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/23/17/20250123172250-ZHL632WN.json'
res = 'hi'

import requests

# Assuming the chatbot API has a POST endpoint for sending messages
url = site  # Replace with the actual API endpoint URL
headers = {
    'Content-Type': 'application/json'
}

# Your message
data = {
    'message': 'hi'
}

# Send the request
response = requests.post(url, json=data, headers=headers)

# Get the chatbot's response
if response.status_code == 200:
    chatbot_response = response.json()  # Or response.text, depending on the response format
    print('Chatbot says:', chatbot_response)
else:
    print('Error:', response.text)
