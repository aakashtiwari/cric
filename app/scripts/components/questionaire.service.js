var app = angular.module('cricApp')
app.service('questionaireService', function(){ 
  return [
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
      });