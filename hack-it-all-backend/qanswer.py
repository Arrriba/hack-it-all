class QAnswering:
    def __init__(self, country, question, model):
        self.country = country
        self.question = question
        self.model = model
        self.q_Romania = 'In Romania, until December 4, 1785120 covid cases were confirmed. In the last 24 hours, 1750 covid cases have been confirmed. The vaccination rate in Romania is around 43%. The vaccination rate in Romania is decreasing.'
        self.q_Italy = 'In Italy, until December 4, 5085461 covid cases were confirmed. In the last 24 hours, 16632 covid cases have been confirmed. The vaccination rate in italy is around 74%. The vaccination rate in Italy is ascending.'
        self.q_France = 'In France, until December 4, 7881467 covid cases were confirmed. In the last 24 hours, 51624 covid cases have been confirmed. The vaccination rate in France is around 70%. The vaccination rate in France is stagnating.'
        self.q_Spain = 'In Spain, until December 4, 5281215 covid cases were confirmed. In the last 24 hours, 13724 covid cases have been confirmed. The vaccination rate in Spain is around 80%. The vaccination rate in Spain is decreasing.'

        self._get_question()

    def _get_question(self):
        if self.country == 'Romania':
            self.QA_input = {
                'question': self.question,
                'context': self.q_Romania
            }
        if self.country == 'Italy':
            self.QA_input = {
                'question': self.question,
                'context': self.q_Italy
            }
        if self.country == 'France':
            self.QA_input = {
                'question': self.question,
                'context': self.q_France
            }
        if self.country == 'Spain':
            self.QA_input = {
                'question': self.question,
                'context': self.q_Spain
            }

    def answer(self):
        model_output = self.model(self.QA_input)
        for k, v in model_output.items():
            if k == 'answer':
                answer = v

        return answer