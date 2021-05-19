function calc_length(path,points) {

  var length = 0;

  var x = points[path[0]][0];
  var y = points[path[0]][1];
  var x_2;
  var y_2;

  for(var i = 0; i < path.length - 1; i++){

    x_2 = points[path[i+1]][0];
    y_2 = points[path[i+1]][1];

    length += Math.sqrt((x - x_2) * (x - x_2) + (y - y_2) * (y - y_2));
    //length += Math.sqrt((points[path[i]][0]-points[path[i+1]][0]) * (points[path[i]][0]-points[path[i+1]][0]) + (points[path[i]][1]-points[path[i+1]][1]) * (points[path[i]][1]-points[path[i+1]][1]));
    //length += Math.abs((points[path[i]][0]-points[path[i+1]][0])) + Math.abs((points[path[i]][1]-points[path[i+1]][1]));

    x = x_2;
    y = y_2;

  }
  
  return length;
}
