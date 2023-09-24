# from flask import Flask, request

# app = Flask(__name__)

# @app.route('/form', methods=['POST'])
# def form():
#     username = request.form['username']
#     password = request.form['password']
#     return f'Hello {username}, your password is {password}'

from flask import Flask, request, Response
from flask_cors import CORS
import json
import chatgpt
import getKeyWords
import getLinks
import getSummary
import getTextFromPdf
import getTextFromPdf
import getTranscript
import getTextFromPage

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



@app.route('/query-example')
def query_example(): 
    # if key doesn't exist, returns None
    language = request.args.get('language')
    # language = "#"

    # if key doesn't exist, returns a 400, bad request error
    # framework = request.args['framework']
    framework = "gjos"

    # if key doesn't exist, returns None
    # website = request.args.get('website')
    website = "fasd"

    return '''
            <h1>The language value is: {}</h1>
            <h1>The framework value is: {}</h1>
            <h1>The website value is: {}'''.format(language, framework, website)


# Funcion para paginas
@app.route('/webpage-api', methods=['POST'])
def webpage_api():
    request_data = request.get_json()

    link = None

    if request_data:
        if 'link' in request_data:
            link = request_data['link']

    text = getTextFromPage.getTheText(link) 
    summary = chatgpt.summary(text)
    keywords = getKeyWords.getKeyWords(text) #! not done
    topics = chatgpt.topics(text)
    search = chatgpt.search(summary) #! not done
    links = getLinks.getTheLinks(search)
    title = chatgpt.getTitle(summary) #! not done

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
    summary = chatgpt.summary(text)
    keywords = getKeyWords.getKeyWords(text) #! not done
    topics = chatgpt.topics(text)
    search = chatgpt.search(summary) #! not done
    links = getLinks.getTheLinks(search)
    title = chatgpt.getTitle(summary) #! not done

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

    google_search = None

    if request_data:
        if 'google_search' in request_data:
            google_search = request_data['google_search']

    links = getLinks.getTheLinks(google_search)
    text = getTextFromPage.getTheText(links[0])
    summary = chatgpt.summary(text)
    keywords = getKeyWords.getKeyWords(text) #! not done
    topics = chatgpt.topics(text)
    title = chatgpt.getTitle(summary) #! not done

    links.pop(0)

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

    text = None

    if request_data:
        if 'text' in request_data:
            text = request_data['text']

    summary = chatgpt.summary(text)
    keywords = getKeyWords.getKeyWords(text) #! not done
    topics = chatgpt.topics(text)
    search = chatgpt.search(summary) #! not done
    links = getLinks.getTheLinks(search)
    title = chatgpt.getTitle(summary) #! not done

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

    answer = chatgpt.call_inform(question)

    return Response(
        response=json.dumps({
            "answer" : answer,
        }),
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)

