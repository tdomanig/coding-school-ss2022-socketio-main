import random
import string as s

def generatePw(*args):
    uppers=s.ascii_uppercase
    lowers=s.ascii_lowercase
    numbers=s.digits
    specialchars=s.punctuation
    chars=[uppers,lowers,numbers,specialchars]
    password=[]
    for x in chars:
        password.append(random.choice(x))
    charset="".join(chars)

    while len(password)<20:
        password.append(random.choice(charset))
    random.shuffle(password)
    password="".join(password)
    Element('generatedPw').element.innerText = password

