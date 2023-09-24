from string import punctuation

# Elimina signos de puntuacion
def remove_punctuations(input_string):
    # Make a translation table that maps all punctuation characters to None
    translator = str.maketrans("", "", punctuation)

    # Apply the translation table to the input string
    result = input_string.translate(translator)

    return result


non_meaning_words = ["and", "but", "or", "so", "for", "nor", "yet", "because", "although", "since", "unless", "while", "when", "whereas", 
                        "however", "therefore", "furthermore", "moreover", "consequently", "meanwhile", "nevertheless", "nonetheless", 
                        "as a result", "in addition", "on the other hand", "as a matter of fact", "even though", "in contrast", 
                        "as soon as", "in order to", "due to", "provided that", "as long as", "in case", "despite", "instead of", 
                        "although", "whether", "even if", "in conclusion", "in summary", "to summarize", "to illustrate", "for example", 
                        "in fact", "namely", "that is", "in other words", "a", "an", "the", "in", "on", "at", "of", "to", "from", "by", 
                        "with", "for", "as", "but", "or", "and", "if", "unless", "since", "while", "although", "because", "before", "after", 
                        "under", "over", "through", "between", "among", "throughout", "above", "below", "within", "amongst", "besides", "about", 
                        "against", "along", "around", "behind", "beneath", "beside", "between", "beyond", "during", "inside", "near", "off", 
                        "outside", "round", "throughout", "till", "toward", "underneath", "until", "upon", "whilst", "whether", "whereas", 
                        "without"]


def remove_unmeaninful(input_string) :
    for word in non_meaning_words:
        input_string = input_string.replace(word, "")
    return input_string


def getKeyWords(text) :
    ocurrences = dict()
    
    text = text.strip()
    text = text.lower()
    text = remove_punctuations(text)
    text = remove_unmeaninful(text)
    words = text.split(" ")
                        
    for word in words:
        # Check if the word is already in dictionary
        if word in ocurrences:
            ocurrences[word] = ocurrences[word] + 1
        else:
            # Add the word to dictionary with count 1
            ocurrences[word] = 1

    return ocurrences