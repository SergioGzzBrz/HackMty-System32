import scrapy
from scrapy.crawler import CrawlerProcess
final_links = []
final_titles = []
final_text = []
final_urls = []
textToSearch = ""

class RedditSpider(scrapy.Spider):
    name = "RedditSpider"

    def start_requests(self):
        global textToSearch
        textToSearch.replace(" ", "+")
        urls = ["https://www.google.com/search?q=" + textToSearch]
        # print("Started")
        for url in urls:
            yield scrapy.Request(url=url, callback=self.get_post_links)
        # print("Ended")

    def get_post_links(self, response):
        global final_urls
        # print("Entered get_post_links")
        # web scraping the url of every single post
        urls = response.xpath('//a/@href').extract()
        final_urls = urls
        # Sending every post to be web scraped
        print("this is the size of urls", len(urls))
        '''for url in urls:
            print(url)
        '''


def getTheLinks(text):
    global textToSearch
    textToSearch = text
    process = CrawlerProcess()
    process.crawl(RedditSpider)
    process.start()
    # print("hello")
    # print(final_urls[1])
    links = final_urls
    filtered_links = [link for link in links if link.startswith("/url?q=")]
    extracted_urls = [link.split('=')[1].split('&')[0] for link in filtered_links]
    return extracted_urls
    # for i in range(len(extracted_urls)):
     #   print(i, extracted_urls[i])

# print(final_text)
   # return final_text


if __name__ == "__main__":
    extracted = getTheLinks("opinion inteligencia artificial")
    for i in range(5):
        print(extracted[i])

