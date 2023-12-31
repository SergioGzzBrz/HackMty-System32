from flask import Flask, request, Response
from flask_cors import CORS
import json
import chatgpt
import getKeyWords
from getLinks import getTheLinks
import getTranscript
from getTextFromPage import getTheText
# import getTextFromPage

app = Flask(__name__)
CORS(app)


# GET requests will be blocked
@app.route('/json-example', methods=['POST'])
def json_example():
    request_data = request.get_json()

    language = None
    framework = None
    python_version = None
    example = None
    boolean_test = None

    if request_data:
        if 'language' in request_data:
            language = request_data['language']

        if 'framework' in request_data:
            framework = request_data['framework']

        if 'version_info' in request_data:
            if 'python' in request_data['version_info']:
                python_version = request_data['version_info']['python']

        if 'examples' in request_data:
            if (type(request_data['examples']) == list) and (len(request_data['examples']) > 0):
                example = request_data['examples'][0]

        if 'boolean_test' in request_data:
            boolean_test = request_data['boolean_test']

    return Response(
        response=json.dumps({
            "data": {
                "import_id": 12
            }
        }),
    )


# Funcion para paginas
@app.route('/webpage-api', methods=['POST'])
def webpage_api():
    request_data = request.get_json()

    link = None

    if request_data:
        if 'link' in request_data:
            link = request_data['link']

    text = getTheText(link) 
    # print(text)
    summary = chatgpt.summarize(text)
    keywords = getKeyWords.getKeyWords(text)
    topics = chatgpt.topics(text)
    title = chatgpt.search(summary) 
    links = getTheLinks(title)
    
    # topics.replace("\n\n", "\n")
    # topics = topics.split("\n")

    # cont = 1
    # for topic in topics :
    #     if topic == '': 
    #         continue
    #     pair = topic.split(": ")
    #     if len(pair) == 1:
    #         topics_dict["topic " + str(cont)] = pair
    #     else :
    #         topics_dict[pair[0]] = pair[1]
    #     cont += 1


    return Response(
        response=json.dumps({
            "title": title,
            "summary" : summary,
            "keywords" : keywords,
            "topics" : topics, # Arreglo de diccionarios
            "links" : links,
        }),
    )


# Funcion para links de youtube 
@app.route('/youtube-api', methods=['POST'])
def youtube_api():
    request_data = request.get_json()

    link = None

    if request_data:
        if 'link' in request_data:
            link = request_data['link']

    text = getTranscript.getTrans(link) 
    summary = chatgpt.summarize(text)
    keywords = getKeyWords.getKeyWords(text)
    topics = chatgpt.topics(text)
    title = chatgpt.search(summary) 
    # title = title.replace("\n", "")
    links = getTheLinks(title)
    # Splitting topics into dicts
    topics_dict = dict()
    
    # topics.replace("\n\n", "\n")
    # topics = topics.split("\n")

    # cont = 1
    # for topic in topics :
    #     if topic == '': 
    #         continue
    #     pair = topic.split(": ")
    #     if len(pair) == 1:
    #         topics_dict["topic " + str(cont)] = pair
    #     else :
    #         topics_dict[pair[0]] = pair[1]
    #     cont += 1

    return Response(
        response=json.dumps({
            "title": title,
            "summary" : summary,
            "keywords" : keywords,
            "topics" : topics, # Arreglo de diccionarios
            "links" : links,
        }),
    )


@app.route('/google-search-api', methods=['POST'])
def google_search_api():
    request_data = request.get_json()

    google_search = ""
    if request_data:
        if 'google_search' in request_data:
            google_search = request_data['google_search']
    google_search = google_search.replace("\n", "")
    links = getTheLinks(google_search)
    text=''

    text = getTheText(links[0])
    print("Este es el link 0: ")
    print(links[0])
    print(text)
    summary = chatgpt.summarize(text)
    keywords = getKeyWords.getKeyWords(text)
    topics = chatgpt.topics(text)
    title = chatgpt.search(summary) 

    # links.pop(0)

    # Splitting topics into dicts
    topics_dict = dict()
    
    # topics.replace("\n\n", "\n")
    # topics = topics.split("\n")

    # cont = 1
    # for topic in topics :
    #     if topic == '': 
    #         continue
    #     pair = topic.split(": ")
    #     if len(pair) == 1:
    #         topics_dict["topic " + str(cont)] = pair
    #     else :
    #         topics_dict[pair[0]] = pair[1]
    #     cont += 1


    return Response(
        response=json.dumps({
            "title": title,
            "summary" : summary,
            "keywords" : keywords,
            "topics" : topics, # Arreglo de diccionarios
            "links" : links,
        }),
    )


@app.route('/text-api', methods=['POST'])
def text_api():
    request_data = request.get_json()

    text = ""

    if request_data:
        if 'text' in request_data:
            text = request_data['text']

    summary = chatgpt.summarize(text)
    keywords = getKeyWords.getKeyWords(text)
    topics = chatgpt.topics(text)
    title = chatgpt.search(summary) 
    title = title.replace("\n", "")
    links = getTheLinks(title)

    # Splitting topics into dicts
    topics_dict = dict()

    # topics.replace("\n\n", "\n")
    # topics = topics.split("\n")

    # cont = 1
    # for topic in topics :
    #     if topic == '': 
    #         continue
    #     pair = topic.split(": ")
    #     if len(pair) == 1:
    #         topics_dict["topic " + str(cont)] = pair
    #     else :
    #         topics_dict[pair[0]] = pair[1]
    #     cont += 1


    return Response(
        response=json.dumps({
            "title": title,
            "summary" : summary,
            "keywords" : keywords,
            "topics" : topics, # Arreglo de diccionarios
            "links" : links,
        }),
    )


@app.route('/question-api', methods=['POST'])
def question_api():
    request_data = request.get_json()

    question = None

    if request_data:
        if 'question' in request_data:
            question = request_data['question']

    answer = chatgpt.inform(question)

    return Response(
        response=json.dumps({
            "answer" : answer,
        }),
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)


