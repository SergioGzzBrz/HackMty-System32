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

topics = "topic: esto es un topic\nme encanta: si me encanta\nahora si: estoy muy bien"

topics_dict = dict()

topics.replace("\n\n", "\n")
topics = topics.split("\n")
# print(len(topics))
# for topic in topics:
#     print(topic, end="")

for topic in topics :
    if topic == '': 
        continue
    pair = topic.split(": ")
    topics_dict[pair[0]] = pair[1]

print(topics_dict)
