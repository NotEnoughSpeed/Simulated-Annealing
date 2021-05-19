function avg(history) {

  var sum = 0;

  for(var i = 0; i < history.length; i++){
    sum += history[i];
  }

  sum /= history.length;

  return sum;
  
}
