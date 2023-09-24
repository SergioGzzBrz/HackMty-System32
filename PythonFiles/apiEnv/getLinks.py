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
        textToSearch = textToSearch.replace(" ", "+")
        urls = ["https://www.google.com/search?q=" + str(textToSearch)]
        # print("Started")
        for url in urls:
            yield scrapy.Request(url=url, callback=self.get_post_links)
        # print("Ended")

    def get_post_links(self, response):
        global final_urls
        urls = response.xpath('//a/@href').extract()
        final_urls = urls


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
    return extracted_urls[:min(5, len(extracted_urls))]


if __name__ == "__main__":
    extracted = getTheLinks("Quien es donald trump")
    for i in range(5):
        print(extracted[i])

