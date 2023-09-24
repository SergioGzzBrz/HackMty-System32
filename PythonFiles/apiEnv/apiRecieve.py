import requests
import io

resp = requests.get('http://127.0.0.1:8000/process-text-api?text=this is the best. best! my best?!')
# text = io.BytesIO(resp.content)
print(resp.text)