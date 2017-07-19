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
  template: `<div class='qa-block'>
              <div ng-repeat='o in $ctrl.questionaire'>
                <question>{{o.question}}</question>
                <answer>
                  <select class="styled-select semi-square" ng-class="{'error': !(o.answer) && $ctrl.submitted}" ng-model="o.answer">
                    <option value="" selected>Please Answer</option>
                    <option ng-repeat="option in o.options" value="{{option}}">{{option}}</option>
                  </select>
                  <label class='error' ng-show="$ctrl.submitted && !(o.answer) ">Please select one option atleast</label>
                </answer>
                </div>
                <div class='button-container'>  
                  <span class='button' ng-click = "$ctrl.submitForm()" >Submit</span>
                  <span class='button' ng-click = "$ctrl.clearValues()">Clear Values</span>
                </div>
              </div>
             <result result='$ctrl.result'></result>`,
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
      let check = self.checkValue();
      if(check){
        self.createGraph();
      }else {
        return false;
      }
    }

    self.checkValue = function(){
      let check = true;
      self.questionaire.forEach(function(obj){
        if(!obj.answer){
          check = false;
        };
      });
      return check;
    }
    self.calculateCorrectAnswer = function(){
      let count = 0;
      self.questionaire.forEach(function(q){
        if(q.answer == q.correct_answer){
          count++;
        }
      });
      return count;
    }
    self.createGraph = function() {
      let r = self.result;
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
  template: `<div  class='result' ng-show='$ctrl.result.show'>
              <y-axis>
                <ul>
                 <li ng-repeat="n in $ctrl.range($ctrl.result.total)">{{n}}</li>
                </ul>
              </y-axis>
              <correct-bar class='bar' style='height:{{$ctrl.result.correctPercent}}%'><span>correct</span></correct-bar>
              <incorrect-bar class='bar' style='height:{{$ctrl.result.incorrectPercent}}%'><span>incorrect</span></incorrect-bar>
            </div>`,
  bindings: { result: '<' },
  controller: function(){
    var self = this;
    self.range = function(number){
      let limits = [];
      for(let i = 0.5; i <= number; i = i + 0.5){
        limits.push(i);
      }
      return limits.reverse();
    }
  }
});