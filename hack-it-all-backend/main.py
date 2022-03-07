# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

from transformers import AutoTokenizer, AutoModelWithLMHead, pipeline, AutoModelForSeq2SeqLM
from googleSearcher import GoogleSearcher


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-roa-en")
    model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-roa-en")
    pten_pipeline = pipeline('text2text-generation', model=model, tokenizer=tokenizer)

    asd = GoogleSearcher(keyword="Sports in Romania", pipeline=pten_pipeline)
    val = asd.return_dict()
    print(val)
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
