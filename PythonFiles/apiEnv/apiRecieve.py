import requests
import io

resp = requests.get('http://127.0.0.1:8000/my-first-api')
# text = io.BytesIO(resp.content)
print(resp.text)
print("test")