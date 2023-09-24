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
    return final_text[300:min(5000, len(final_text) - 1)]


if __name__ == "__main__":
    extracted = getTheText("https://es.wikipedia.org/wiki/Donald_Trump")
    # https://www.genbeta.com/actualidad/proyecto-gutenberg-tiene-5-000-audiolibros-nuevos-que-puedes-escuchar-gratis-ha-hecho-inteligencia-artificial
    # extracted = getTheText("https://www.genbeta.com/actualidad/proyecto-gutenberg-tiene-5-000-audiolibros-nuevos-que-puedes-escuchar-gratis-ha-hecho-inteligencia-artificial")
    print(extracted)
    print(len(extracted))
    '''print("tamano final de extracted", len(extracted))
    # print(paragraphs[0])
    print("tamano de parrafos ddd final",len(paragraphs))'''
    '''for i in range(len(paragraphs)):
        print(len(paragraphs[i]))'''

    '''
    print("tamano de parrafos ddd final 2", len(long_paragraphs))

    for i in range(len(long_paragraphs)):
        print(long_paragraphs[i])

    # print(paragraphs[2])'''

