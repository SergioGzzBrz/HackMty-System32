from string import punctuation
import re

# Elimina signos de puntuacion
def remove_punctuations(input_string):
    for tag in html_tags:
        input_string = input_string.replace(tag, " ")

    # Make a translation table that maps all punctuation characters to None
    translator = str.maketrans("", "", punctuation)

    # Apply the translation table to the input string
    result = input_string.translate(translator)

    return result


non_meaning_words = [" and ", " but ", " or ", " so ", " for ", " nor ", " yet ", " because ", " although ", " since ", " unless ", " while ", " when ", " whereas ", 
                        " however ", " therefore ", " furthermore ", " moreover ", " consequently ", " meanwhile ", " nevertheless ", " nonetheless ", 
                        " as a result ", " in addition ", " on the other hand ", " as a matter of fact ", " even though ", " in contrast ", 
                        " as soon as ", " in order to ", " due to ", " provided that ", " as long as ", " in case ", " despite ", " instead of ", 
                        " although ", " whether ", " even if ", " in conclusion ", " in summary ", " to summarize ", " to illustrate ", " for example ", 
                        " in fact ", " namely ", " that is ", " in other words ", " a ", " an ", " the ", " in ", " on ", " at ", " of ", " to ", " from ", " by ", 
                        " with ", " for ", " as ", " but ", " or ", " and ", " if ", " unless ", " since ", " while ", " although ", " because ", " before ", " after ", 
                        " under ", " over ", " through ", " between ", " among ", " throughout ", " above ", " below ", " within ", " amongst ", " besides ", " about ", 
                        " against ", " along ", " around ", " behind ", " beneath ", " beside ", " between ", " beyond ", " during ", " inside ", " near ", " off ", 
                        " outside ", " round ", " throughout ", " till ", " toward ", " underneath ", " until ", " upon ", " whilst ", " whether ", " whereas ", 
                        " without ", " it ", " the ", " I ", " you ", " he ", " she ", " it ", " we ", " they ", " me ", " you ", " him ", " her ", " us ", " them ", " myself ", " yourself ", 
                        " himself", " herself ", " itself ", " ourselves ", " yourselves ", " themselves ", " mine ", " yours ", " his ", " hers ", " its ", " ours ", " theirs ", 
                        " my", " your ", " his ", " her ", " its ", " our ", " their ", " whose ", " who ", " whom ", " which ", " what ", " whosever ", " whoever ", " whomever ", 
                        " whichever", " whatever ", " is ", " that ", " be ", " have ", " do ", " say ", " get ", " make ", " go ", " know ", " take ", " see ", " come ", " think ", 
                        " look", " want ", " give ", " use ", " find ", " tell ", " ask ", " work ", " seem ", " feel ", " try ", " leave ", " call ", " need ", " feel ", " become ", 
                        " leave", " put ", " mean ", " keep ", " let ", " begin ", " seem ", " help ", " talk ", " turn ", " start ", " show ", " hear ", " play ", " run ", " move ", 
                        " like", " live ", " believe ", " hold ", " bring ", " can ", " the ", " of ", " and ", " to ", " in ", " is ", " it ", " you ", " that ", " he ", " was ", " for ", 
                        " on", " are ", " with ", " as ", " I ", " his ", " they ", " be ", " at ", " one ", " have ", " this ", " from ", " or ", " had ", " by ", " not ", " word ", " but ", 
                        " what", " some ", " we ", " can ", " out ", " other ", " were ", " all ", " there ", " when ", " up ", " use ", " your ", " how ", " said ", " an ", " each ", " she ", 
                        " which", " do ", " their ", " time ", " if ", " will ", " way ", " about ", " many ", " then ", " them ", " write ", " would ", " like ", " so ", " these ", " her ", 
                        " long", " make ", " thing ", " see ", " him ", " two ", " has ", " look ", " more ", " day ", " could ", " go ", " come ", " did ", " no ", " most ", " my ", " over ", 
                        " know", " than ", " call ", " first ", " who ", " may ", " down ", " side ", " been ", " now ", " find ", " any ", " new ", " work ", " part ", " take ", " get ", 
                        " place", " made ", " live ", " where ", " after ", " back ", " little ", " only ", " round ", " came ", " every ", " good ", " me ", " give ", " our ", " under ", 
                        " name "]
# ,"el", "la", "los", "las", "un", "una", "unos", "unas", "en", "de", "a", "por", "para", "con", "sin", "sobre", "bajo", "entre",
#                         "desde", "hacia", "hasta", "durante", "mediante", "según", "ante", "tras", "cual", "quien", "cuyo", "cuya", "lo", "le", "les", "me", "te", 
#                         "nos", "se", "mi", "tu", "su", "nuestro", "vuestro", "mío", "tuyo", "suyo", "nuestro", "vuestro", "suyo","y", "pero", "o", "ni", "porque", 
#                         "así que", "aunque", "desde", "hasta", "a pesar de", "a fin de que", "si", "a menos que", "mientras", "cuando", "como", "sin embargo", 
#                         "por lo tanto", "además", "en cambio", "por suerte", "no obstante", "a causa de", "en resumen", "por último", "es decir", "en otras palabras"]


html_tags = ['<a>', '<abbr>', '<address>', '<area>', '<article>', '<aside>', '<audio>', '<b>', '<base>', '<bdi>', '<bdo>', '<blockquote>', '<body>', '<br>', '<button>', 
                '<canvas>', '<caption>', '<cite>', '<code>', '<col>', '<colgroup>', '<data>', '<datalist>', '<dd>', '<del>', '<details>', '<dfn>', '<dialog>', '<div>', 
                '<dl>', '<dt>', '<em>', '<embed>', '<fieldset>', '<figcaption>', '<figure>', '<footer>', '<form>', '<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>', '<head>', 
                '<header>', '<hr>', '<html>', '<i>', '<iframe>', '<img>', '<input>', '<ins>', '<kbd>', '<label>', '<legend>', '<li>', '<link>', '<main>', '<map>', '<mark>', 
                '<meta>', '<meter>', '<nav>', '<noscript>', '<object>', '<ol>', '<optgroup>', '<option>', '<output>', '<p>', '<param>', '<picture>', '<pre>', '<progress>', 
                '<q>', '<rb>', '<rp>', '<rt>', '<rtc>', '<ruby>', '<s>', '<samp>', '<script>', '<section>', '<select>', '<small>', '<source>', '<span>', '<strong>', '<style>', 
                '<sub>', '<summary>', '<sup>', '<svg>', '<table>', '<tbody>', '<td>', '<template>', '<textarea>', '<tfoot>', '<th>', '<thead>', '<time>', '<title>', '<tr>', 
                '<track>', '<u>', '<ul>', '<var>', '<video>', '<wbr>', '</a>', '</abbr>', '</address>', '</area>', '</article>', '</aside>', '</audio>', '</b>', '</base>', 
                '</bdi>', '</bdo>', '</blockquote>', '</body>', '</br>', '</button>', '</canvas>', '</caption>', '</cite>', '</code>', '</col>', '</colgroup>', '</data>', 
                '</datalist>', '</dd>', '</del>', '</details>', '</dfn>', '</dialog>', '</div>', '</dl>', '</dt>', '</em>', '</embed>', '</fieldset>', '</figcaption>', 
                '</figure>', '</footer>', '</form>', '</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</h6>', '</head>', '</header>', '</hr>', '</html>', '</i>', '</iframe>', 
                '</img>', '</input>', '</ins>', '</kbd>', '</label>', '</legend>', '</li>', '</link>', '</main>', '</map>', '</mark>', '</meta>', '</meter>', '</nav>', 
                '</noscript>', '</object>', '</ol>', '</optgroup>', '</option>', '</output>', '</p>', '</param>', '</picture>', '</pre>', '</progress>', '</q>', '</rb>', 
                '</rp>', '</rt>', '</rtc>', '</ruby>', '</s>', '</samp>', '</script>', '</section>', '</select>', '</small>', '</source>', '</span>', '</strong>', '</style>', 
                '</sub>', '</summary>', '</sup>', '</svg>', '</table>', '</tbody>', '</td>', '</template>', '</textarea>', '</tfoot>', '</th>', '</thead>', '</time>', '</title>', 
                '</tr>', '</track>', '</u>', '</ul>', '</var>', '</video>', '</wbr>']

def remove_unmeaninful(input_string) :
    for word in non_meaning_words :
        input_string = input_string.replace(word, " ")
    return input_string


def getKeyWords(text) :
    ocurrences = dict()
    
    text = text.strip()
    text = text.lower()
    text = remove_punctuations(text)
    text = remove_unmeaninful(text)
    text = text.replace("\n", " ")
    words = text.split(" ")
                        
    for word in words:
        # Check if the word is already in dictionary
        if word in ocurrences:
            ocurrences[word] = ocurrences[word] + 1
        else:
            # Add the word to dictionary with count 1
            ocurrences[word] = 1

    if '' in ocurrences:
        ocurrences.pop('')

    ocurrences = dict(sorted(ocurrences.items(), key=lambda item: item[1], reverse=True))
    return list(ocurrences.keys())


# txt = "this a dfs fd the hte the the this fu fu fu fu"
# print(list(getKeyWords(txt)))
