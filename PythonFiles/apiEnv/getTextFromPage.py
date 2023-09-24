'''
import scrapy
from scrapy.crawler import CrawlerProcess
from bs4 import BeautifulSoup
final_links = []
final_titles = []
final_text = ""
final_urls = []
textToSearch = ""
text2 = ""
paragraphs = []
long_paragraphs = []
class RedditSpider(scrapy.Spider):
    name = "RedditSpider"

    def start_requests(self):
        global textToSearch
        urls = [textToSearch]
        # print("Started")
        for url in urls:
            yield scrapy.Request(url=url, callback=self.get_post_links)
        # print("Ended")

    def get_post_links(self, response):
        print("Begun")
        global final_text
        global paragraphs
        global long_paragraphs
        final_text = response.xpath('string(//body)').get()
        soup = BeautifulSoup(final_text, 'html.parser')

        # Extract the text from the parsed HTML
        final_text = soup.get_text()
        # final_text = final_text.remove_tags().get()
       # final_text = response.xpath('string(//body)').innerText
       # final_text = response.xpath('//body').innerText()
        print("Texto final")
        print("texto final",len(final_text))
        # print(final_text)
        paragraphs = final_text.split('\n')
        print("tamano parrafos", len(paragraphs))
        # print("parrafo ",paragraphs[1])
       # for i in range(paragraphs):
        #    print(paragraphs[i])

        print("tamano final_text", len(final_text))
        # final_text = response.xpath('string(//p)').get()

        # paragraphs = response.xpath('//body/p').getall()

        # Filter paragraphs with more than 100 letters
        final_text = ""
        long_paragraphs = [p for p in paragraphs if len(p) > 100]
        for i in range(long_paragraphs):
            final_text += long_paragraphs[i] + ' '


def getTheText(text):
    global textToSearch
    global final_text
    textToSearch = text
    process = CrawlerProcess()
    process.crawl(RedditSpider)
    process.start()
    final_text = ""
    for i in range(len(long_paragraphs)):
        # final_text += long_paragraphs[i] + ' '
        final_text += long_paragraphs[i]
         # print(long_paragraphs[i])

   # print(len(final_text))
   # print(final_text)
    final= final_text.replace('\n', '') 
    return final[300:min(5000, len(final) - 1)]


if _name_ == "_main_":
    extracted = getTheText("https://es.wikipedia.org/wiki/Donald_Trump")
    print(extracted)
'''

import requests
from bs4 import BeautifulSoup

final_text = ""
long_paragraphs = []

def get_post_text(url):
    global final_text
    global long_paragraphs
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')
        for paragraph in paragraphs:
            text = paragraph.get_text()
            if len(text) > 100:
                long_paragraphs.append(text)
        final_text = " ".join(long_paragraphs)
    else:
        print("Error: Unable to fetch data from the provided URL.")

def getTheText(url):
    global final_text
    get_post_text(url)
    return final_text[300:min(5000, len(final_text) - 1)]

if __name__ == "__main__":
    extracted = getTheText("https://es.wikipedia.org/wiki/Donald_Trump")
    print(extracted)
