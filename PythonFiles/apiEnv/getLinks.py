import requests
from bs4 import BeautifulSoup

final_urls = []
textToSearch = ""

def get_post_links(response_text):
    global final_urls
    soup = BeautifulSoup(response_text, 'html.parser')
    links = [a['href'] for a in soup.find_all('a', href=True)]
    final_urls = links

def getTheLinks(text):
    global textToSearch
    global final_urls
    textToSearch = text.replace(" ", "+")
    google_url = "https://www.google.com/search?q=" + textToSearch
    response = requests.get(google_url)
    if response.status_code == 200:
        get_post_links(response.text)
        links = final_urls
        filtered_links = [link for link in links if link.startswith("/url?q=")]
        extracted_urls = [link.split('=')[1].split('&')[0] for link in filtered_links]
        return extracted_urls[:5]
    else:
        print("Error: Unable to fetch data from Google.")
        return []

if __name__ == "__main__":
    extracted = getTheLinks("Quien es donald trump")
    for i in range(5):
        print(extracted[i])
