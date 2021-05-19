function simulated_annealing() {
  //var ui = SpreadsheetApp.getUi();
  //var response = ui.prompt('k_max = 10^?').getResponseText();
  
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1wBR-QQPM6n3yxPoUB1-NbJTG-lcnNixQ-MXvhqYkB2I/edit#gid=0');
  var sheet = spreadsheet.getSheetByName('Input');
  var points = getSheetData(sheet);

  var n = points.length;

  console.log('n: ' + n);

  var path = make_new_path(n);
  
  var old_length = calc_length(path,points);

  var path_2 = [];

  var alpha = 20;

  var history = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //var k_max = Math.pow(10,response);
  var k_max = 3000000;

  var col = 1;

  for(var k = 0; k < k_max; k++){

    path_2 = [];

    for(var index = 0; index < path.length; index++){

      path_2.push(path[index]);

    }

    //alpha = Math.pow(((k_max / (2*k+1)) - 1),1);
    alpha = 20 * Math.exp(-7*k/k_max);
    //alpha *= 0.999993;

    var rand_1 = Math.floor(Math.random()*(n-2) + 1);
    var rand_2 = Math.floor(Math.random()*(n-2) + 1);

    var save = path_2[rand_1];
    path_2[rand_1] = path_2[rand_2];
    path_2[rand_2] = save;
    
    //var new_length = calc_length(path_2,points);

    //rechenaufwendigster schritt pro Iteration, wir berechnen nur die veränderung zum vorherigen pfad

    var new_length = old_length - (
      Math.sqrt(Math.pow((points[path[rand_1]][0]-points[path[rand_1+1]][0]),2) + Math.pow((points[path[rand_1]][1]-points[path[rand_1+1]][1]),2))
      + Math.sqrt(Math.pow((points[path[rand_1]][0]-points[path[rand_1-1]][0]),2) + Math.pow((points[path[rand_1]][1]-points[path[rand_1-1]][1]),2))
      + Math.sqrt(Math.pow((points[path[rand_2]][0]-points[path[rand_2+1]][0]),2) + Math.pow((points[path[rand_2]][1]-points[path[rand_2+1]][1]),2))
      + Math.sqrt(Math.pow((points[path[rand_2]][0]-points[path[rand_2-1]][0]),2) + Math.pow((points[path[rand_2]][1]-points[path[rand_2-1]][1]),2))
    ) + (
      Math.sqrt(Math.pow((points[path_2[rand_1]][0]-points[path_2[rand_1+1]][0]),2) + Math.pow((points[path_2[rand_1]][1]-points[path_2[rand_1+1]][1]),2))
      + Math.sqrt(Math.pow((points[path_2[rand_1]][0]-points[path_2[rand_1-1]][0]),2) + Math.pow((points[path_2[rand_1]][1]-points[path_2[rand_1-1]][1]),2))
      + Math.sqrt(Math.pow((points[path_2[rand_2]][0]-points[path_2[rand_2+1]][0]),2) + Math.pow((points[path_2[rand_2]][1]-points[path_2[rand_2+1]][1]),2))
      + Math.sqrt(Math.pow((points[path_2[rand_2]][0]-points[path_2[rand_2-1]][0]),2) + Math.pow((points[path_2[rand_2]][1]-points[path_2[rand_2-1]][1]),2))
    );
    

    history.shift();

    history.push(old_length);

    if(k % (k_max/10) == 0){

      var history_avg = avg(history);

      console.log(Math.floor((k/k_max)*100) + '%:  alpha: ' + alpha + ' | old_length: ' + old_length + ' | history_avg: ' + history_avg);

      col += 3;

      var output_points = [];

      for(var i = 0; i < n; i++) output_points.push([points[path[i]][0],points[path[i]][1]]);

      sheet.getRange(1 , col, output_points.length , 2).setValues(output_points);

    }

    if(new_length <= old_length){

      path = [];
      old_length = new_length;

      for(var index = 0; index < path_2.length; index++){

        path.push(path_2[index]);

      }
      
    } else {

      var rand = Math.random();

      if(rand < Math.exp(-1 * (new_length - old_length)/alpha)){

        path = [];
        old_length = new_length;

        for(var index = 0; index < path_2.length; index++){

          path.push(path_2[index]);

        }

      }

    }


  }

}
