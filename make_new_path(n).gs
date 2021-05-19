function make_new_path(n) {
  
  var path = [];

  for(var i = 0; i < n; i++){

    path.push(i);

  }
  
  
  
  for(var i = 0; i < 10*n; i++){
    var rand_1 = Math.floor(Math.random()*(n-2) + 1);
    var rand_2 = Math.floor(Math.random()*(n-2) + 1);

    var save = path[rand_1];
    path[rand_1] = path[rand_2];
    path[rand_2] = save;
  }
  

  return path;
  
}
