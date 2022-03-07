from transformers import AutoTokenizer, AutoModelWithLMHead, pipeline, AutoModelForSeq2SeqLM
from googleSearcher import GoogleSearcher
from io import BytesIO

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-roa-en")
model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-roa-en")
pten_pipeline = pipeline('text2text-generation', model=model, tokenizer=tokenizer)

from qanswer import QAnswering

model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)


@app.route('/get_predictions')
def get_testcase():
    keyword = request.args.get('keyword')
    lang = request.args.get('lang')
    country = request.args.get('country')
    if keyword:
        asd = GoogleSearcher(keyword=keyword, pipelinee=pten_pipeline, lang=lang, region=country)
        val = asd.return_dict()
    else:
        val = {}
    return val


@app.route('/get_answear')
def get_answer():
    question = request.args.get('question')
    country = request.args.get('country')
    print(question)
    print(country)
    if question:
        asd = QAnswering(country=country, question=question, model=nlp)
        answer = asd.answer()
    else:
        answer = {}
    return answer


# def main():
#     print("started server")
#     # REST API
#     api_thread = Thread(target=app.run, kwargs={'debug': False})
#     api_thread.daemon = True  # so that the API ends when data thread ends
#
#     # start all the threads
#     api_thread.start()


if __name__ == '__main__':
    app.run()
    # app.run(host="0.0.0.0", port=5100)
    # main()
