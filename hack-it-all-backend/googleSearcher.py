from transformers import AutoTokenizer, AutoModelWithLMHead, pipeline, AutoModelForSeq2SeqLM
import pandas as pd

from GoogleNews import GoogleNews


class GoogleSearcher:
    def __init__(self, keyword, pipelinee, lang='ro', region='Romania'):
        self.lang = lang
        self.region = region
        self.keyword = keyword
        self.pipeline = pipelinee

    def _get_news(self):
        googlenews = GoogleNews(start='25/11/2021', end='04/12/2021', region=self.region, lang=self.lang)
        googlenews.search(self.keyword)
        result = googlenews.result(sort='date')
        df = pd.DataFrame(result)

        return df

    def _get_titles(self, df):
        titles = []
        for i in range(10):
            if len(df['title'][i]) > 20:
                title = df['title'][i]
                titles.append(title)

        return titles

    def _translate_titles(self, titles):
        en_titles = []

        for title in titles:
            en_title = self.pipeline(title)
            for k, v in en_title[0].items():
                en_titles.append(v)

        return en_titles

    def return_dict(self):
        df = self._get_news()
        titles = self._get_titles(df)
        en_titles = self._translate_titles(titles)
        print(en_titles)

        general_dict = {self.region: []}

        for idx, k in enumerate(general_dict.keys()):
            new_obj = general_dict[k]
            for title, en_title in zip(titles, en_titles):
                inside_list = {'en_title': title, 'native_lang_title': en_title, 'topic': self.keyword}
                new_obj.append(inside_list)
                general_dict[k] = new_obj

        return general_dict

