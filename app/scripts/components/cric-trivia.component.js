var app = angular.module('cricApp')
app.component('cricketTrivia', {
  selector: 'cricket-trivia',
  templateUrl: 'views/cric-trivia.html',
  controller: ['questionaireService', function(questionaireService){
    var self = this;
    self.submitted = false;
    self.result = {'show': false};
    self.questionaire = questionaireService;

    self.submitForm = function(){
      self.submitted = true;
      var check = self.checkValue();
      if(check){
        self.createGraph();
      }else {
        return false;
      }
    }

    self.checkValue = function(){
      var check = true;
      self.questionaire.forEach(function(obj){
        if(!obj.answer){
          check = false;
        };
      });
      return check;
    }
    self.calculateCorrectAnswer = function(){
      var count = 0;
      self.questionaire.forEach(function(q){
        if(q.answer == q.correct_answer){
          count++;
        }
      });
      return count;
    }
    self.createGraph = function() {
      var r = self.result;
      r.total = self.questionaire.length;
      r.correct = self.calculateCorrectAnswer();
      r.incorrect = r.total - r.correct;
      r.correctPercent = (r.correct / r.total) * 100;
      r.incorrectPercent = 100 - r.correctPercent;
      r.show = true;
    }
    self.clearValues = function() {
      self.submitted = false;
      self.result.show = false;
      self.questionaire.forEach(function(q){
        q.answer = '';
      });
    }
  }]
});