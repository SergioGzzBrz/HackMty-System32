import chatgpt
import getKeyWords
import getLinks
import getSummary
import getTextFromPdf
import getTextFromPdf
import getTranscript
import getTextFromPage


def webPage(link):
    text = getTextFromPage.getTheText(link)
    answer = chatgpt.summary(text)
    keyWords = getKeyWords.keyWords(text)

def googleSearch(search):
    links = getLinks.getTheLinks(search)


def normalText(text):
    answer = chatgpt.summary(text)


def youtubeVideo(link):
    text = getTranscript.getTrans(link)
    answer = chatgpt.summary(text)
    keyWords = getKeyWords.keyWords(text)
