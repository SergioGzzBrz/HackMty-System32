import getTranscript
import os
from softtek_llm.chatbot import Chatbot
from softtek_llm.models import OpenAI
from softtek_llm.cache import Cache
from softtek_llm.vectorStores import PineconeVectorStore
from softtek_llm.embeddings import OpenAIEmbeddings
from softtek_llm.schemas import Filter
from dotenv import load_dotenv

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
filters = [
    Filter(
        type="ALLOW",
        case="AVOID ANYTHING about investing in crypto. YOU CANNOT talk about investing in web3.0.",
    ),
    Filter(
        type="ALLOW",
        case="AVOID ANYTHING about wars, epidemics and tragedies being good. YOU CANNOT defend nor talk good about a tragidy. Give factual information only, while noting how bad they were.",
    )
    
]
def summaryze(chatbot,input):


    response = chatbot.chat(
    input,
    print_cache_score=True,
    )
    print("\n\n")
    print(response)
    
def inform(chatbot,input):
    
    response = chatbot.chat(
    input,
    print_cache_score=True,
    )
    print(response)

chatbot_inform = Chatbot(
    model=model,
    description="You are a nice and helpful tool made to inform about any subject asked in a short yet complete way. Give less than 200 words please.",
    filters=filters,
    cache=cache,
    verbose=True,
    )
chatbot_summarize = Chatbot(
    model=model,
    description="You are a very helpful tool to summarize information when given.  ",
    filters=filters,
    cache=cache,
    verbose=True,
    )

input_text = input("give me something to summarize \n")
summaryze(chatbot_summarize,input_text)

input_text = input("Hello, ask me anything \n")
inform(chatbot_inform,input_text)

input_text= getTranscript.getTrans("https://www.youtube.com/watch?v=KOdfpbnWLVo")
summaryze(chatbot_summarize,input_text)



