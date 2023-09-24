import getTranscript
import getTextFromPage

import os
from softtek_llm.chatbot import Chatbot
from softtek_llm.models import OpenAI
from softtek_llm.cache import Cache
from softtek_llm.vectorStores import PineconeVectorStore
from softtek_llm.embeddings import OpenAIEmbeddings
from softtek_llm.schemas import Filter
from dotenv import load_dotenv
import json

all_responses = []


load_dotenv()
OPENAI_API_KEY = "6b25369971534252bbcee5e488ce59f1"
if OPENAI_API_KEY is None:
    raise ValueError("OPENAI_API_KEY not found in .env file")

OPENAI_API_BASE = "https://openaistkinno.openai.azure.com/"
if OPENAI_API_BASE is None:
    raise ValueError("OPENAI_API_BASE not found in .env file")

OPENAI_EMBEDDINGS_MODEL_NAME = "OpenAIEmbeddings"
if OPENAI_EMBEDDINGS_MODEL_NAME is None:
    raise ValueError("OPENAI_EMBEDDINGS_MODEL_NAME not found in .env file")

OPENAI_CHAT_MODEL_NAME = "InnovationGPT2"
if OPENAI_CHAT_MODEL_NAME is None:
    raise ValueError("OPENAI_CHAT_MODEL_NAME not found in .env file")
PINECONE_API_KEY = "1b119593-845e-4207-a077-f179d5c256e1"
if PINECONE_API_KEY is None:
    raise ValueError("PINECONE_API_KEY not found in .env file")

PINECONE_ENVIRONMENT = 'gcp-starter' 
if PINECONE_ENVIRONMENT is None:
    raise ValueError("PINECONE_ENVIRONMENT not found in .env file")

PINECONE_INDEX_NAME ='hack'
if PINECONE_INDEX_NAME is None:
    raise ValueError("PINECONE_INDEX_NAME not found in .env file")

vector_store = PineconeVectorStore(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENVIRONMENT,
    index_name=PINECONE_INDEX_NAME,
)
embeddings_model = OpenAIEmbeddings(
    api_key=OPENAI_API_KEY,
    model_name=OPENAI_EMBEDDINGS_MODEL_NAME,
    api_type="azure",
    api_base=OPENAI_API_BASE,
)
cache = Cache(
    vector_store=vector_store,
    embeddings_model=embeddings_model,
)
model = OpenAI(
    api_key=OPENAI_API_KEY,
    model_name=OPENAI_CHAT_MODEL_NAME,
    api_type="azure",
    api_base=OPENAI_API_BASE,
    verbose=True,
)

chatbot_inform = Chatbot(
    model=model,
    description="You are a nice and helpful tool made to inform about any subject asked in a short yet complete way. Give less than 200 words please.",
    cache=cache,
    verbose=False,
    cache_probability=0.5
    )
chatbot_topic = Chatbot(
    model=model,
    description="You are a nice and helpful tool made to give the 3 most important topics of a given text. Tell only the 3 topics and their definition, ordering by importance in the original subject.",
    cache=cache,
    verbose=False,
    cache_probability=0.5
    )

chatbot_summarize = Chatbot(
    model=model,
    description="You are a nice and helpful tool made to summarize information when given text. Try to reduce by half the size of text, BUT if there are over 3000 words on the text, give AT MOST 1000 words. Make sure to REDUCE the quantity of words.  ",
    cache=cache,
    verbose=False,
    )

def summarize(input_text):
    response = chatbot_summarize.chat(
        input_text,
        print_cache_score=False,
    )
    print("\n\n")
    content=response.message.content
    print(content)
    all_responses.append(response.message.content)
    return(content)
    
    
def topics(input_text):
    response = chatbot_topic.chat(
        input_text,
        print_cache_score=False,
    )
    print("\n\n")
    content=response.message.content
    print(content)
    all_responses.append(response.message.content)
    return(content)

    
def inform(input):
    response = chatbot_inform.chat(
    input,
    print_cache_score=False,
    )
    content=response.message.content
    print(content)
    all_responses.append(response.message.content)
    return(content)

def video(link):
    input_text= getTranscript.getTrans(link)
    return summarize(input_text)

def page(link):
    input_text=getTextFromPage.getTheText(link)
    return summarize(input_text)

# input_text = input("give me something to summarize \n")
# text = input_text.replace('\n', '') 
txt="""El avión roquero (Ptyonoprogne rupestris) es una especie de ave que pertenece a la familia de los aviones y golondrinas. Mide alrededor de 14 cm de largo y tiene un plumaje de color marrón ceniza en la parte superior y más claro en la parte inferior. Su cola es corta y cuadrada, con manchas blancas en las plumas. Esta especie habita en las montañas del sur de Europa, el noroeste de África y el sur de Asia. Aunque se pueden confundir con otras especies similares, el avión roquero es de mayor tamaño, tiene manchas más notorias en la cola y su plumaje es de tono diferente.  La mayoría de los ejemplares en Europa son residentes, pero las poblaciones más al norte y en Asia son migratorias.
 Durante el invierno, migran hacia el norte de África, el Medio Oriente o la India. El avión roquero construye su nido en acantilados o en estructuras hechas por el hombre. El nido es de forma de media taza y está hecho de barro, con una capa interna suave de plumas y pasto seco. Por lo general, los nidos son individuales, aunque algunas parejas pueden anidar cerca una de la otra. La hembra pone de dos a cinco huevos blancos con manchas marrones, y tanto el macho como la hembra se encargan de incubarlos y alimentar a los polluelos. Esta especie se alimenta principalmente de insectos que captura en vuelo, cerca de las paredes de los acantilados o en prados alpinos. El avión roquero es presa de aves de presa y córvidos, y también alberga ácaros que se alimentan de su sangre. Afortunadamente, debido a su gran área de distribución y su población numerosa, no se considera una especie en peligro de extinción.
"""
summarize(txt)

# input_text = input("Hello, ask me anything \n")
# text = input_text.replace('\n', '') 
print('\n\n\n')
txt="¿que es la vida?"
inform(txt)


# input_text = input("Give me the text from which I can give you their most important topics \n")
# text = input_text.replace('\n', '') 
txt="""El avión roquero (Ptyonoprogne rupestris) es una especie de ave que pertenece a la familia de los aviones y golondrinas. Mide alrededor de 14 cm de largo y tiene un plumaje de color marrón ceniza en la parte superior y más claro en la parte inferior. Su cola es corta y cuadrada, con manchas blancas en las plumas. Esta especie habita en las montañas del sur de Europa, el noroeste de África y el sur de Asia. Aunque se pueden confundir con otras especies similares, el avión roquero es de mayor tamaño, tiene manchas más notorias en la cola y su plumaje es de tono diferente.  La mayoría de los ejemplares en Europa son residentes, pero las poblaciones más al norte y en Asia son migratorias.
 Durante el invierno, migran hacia el norte de África, el Medio Oriente o la India. El avión roquero construye su nido en acantilados o en estructuras hechas por el hombre. El nido es de forma de media taza y está hecho de barro, con una capa interna suave de plumas y pasto seco. Por lo general, los nidos son individuales, aunque algunas parejas pueden anidar cerca una de la otra. La hembra pone de dos a cinco huevos blancos con manchas marrones, y tanto el macho como la hembra se encargan de incubarlos y alimentar a los polluelos. Esta especie se alimenta principalmente de insectos que captura en vuelo, cerca de las paredes de los acantilados o en prados alpinos. El avión roquero es presa de aves de presa y córvidos, y también alberga ácaros que se alimentan de su sangre. Afortunadamente, debido a su gran área de distribución y su población numerosa, no se considera una especie en peligro de extinción.
"""
topics(txt)
print('\n\n\n')

video("https://www.youtube.com/watch?v=KOdfpbnWLVo")
print('\n\n\n')

page("https://www.nationalgeographic.com.es/animales/pinguinos")

print('\n\n\n')
print(all_responses)

with open('./PythonFiles/responses.json','w',encoding='latin-1') as f:
    json.dump(all_responses,f)
    
