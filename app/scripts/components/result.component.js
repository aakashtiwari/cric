var app = angular.module('cricApp')
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