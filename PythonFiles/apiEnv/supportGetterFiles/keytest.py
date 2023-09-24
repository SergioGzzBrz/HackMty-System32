# from getKeyWords import getKeyWords

# text = """
# Esta es una prueba
# que yo yo yo yo me encanta. pero .dsa.
# eso .sda samir
# <h1>fasd</h1>
# <h1>fasd </h1>
# <h1> fasd</h1>
# <h1> fasd </h1>
# """

# res = getKeyWords(text)

# print(res)

topics = """

"""

topics_dict = dict()

topics.replace("\n\n", "\n")
topics.split("\n")

for topic in topics :
    pair = topic.split(": ")
    topics_dict[pair[0]] = pair[1]
