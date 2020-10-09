import difflib

class WordMatcher():
    def __init__(self):
        self.wordDict=[ 'ARE', 'YOU','NEED','PRINCIPAL','PROTECTION','I AM','GOOD','INCOME','COULD','BUY','HELP','WANTED','INSURANCE','HOW ARE YOU','WANTED','PRODUCT','TO','THANKS','THANK']
     
    def correction(self, word):
        pred_word=difflib.get_close_matches(word,self.wordDict,cutoff = 0.5)
        if len(pred_word) > 0:
            return pred_word[0]
        else:
            return None