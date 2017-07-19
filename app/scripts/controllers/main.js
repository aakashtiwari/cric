'use strict';

/**
 * @ngdoc function
 * @name cricApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cricApp
 */
var app = angular.module('cricApp')
app.component('cricketTrivia', {
  selector: 'cricket-trivia',
  templateUrl: 'views/cric-trivia.html',
  controller: function() {
    var self = this;
    self.submitted = false;
    self.result = {'show': false};
    self.questionaire = [
      {   
        id: 1,
        question: "When was the last time India won the Cricket World Cup?",
        options: ['1983', '2015', '2007', '2011'],
        correct_answer: '2011'
      },
      {
        id: 2,
        question: "Who has won the most numbers of Cricket World cups ?",
        options: ['New Zealand', 'India', 'West Indies', 'Australia'],
        correct_answer: 'Australia' 
      },
      {
        id: 3,
        question: "Who scored the highest individual score in Test Cricket?",
        options: ['M. Hayden', 'Sir Sachin R Tendulkar', 'Virendar Shewag', 'Brian Lara'],
        correct_answer: 'Brian Lara'  
      },
      {
        id: 4,
        question: "How many International centuries does Sachin Tendulkar has under his name?",
        options: ['49', '50', '51', '52'],
        correct_answer: '49'
      }
    ];

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
  }
});

app.component('result',{
  selector: 'result',
  templateUrl: 'views/result.html',
  bindings: { result: '<' },
  controller: function(){
    var self = this;
    self.range = function(number){
      var limits = [];
      for(var i = 0.5; i <= number; i = i + 0.5){
        limits.push(i);
      }
      return limits.reverse();
    }
  }
});