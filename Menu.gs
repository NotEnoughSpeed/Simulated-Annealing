function onOpen(){
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('skript')
    .addItem('go','simulated_annealing').addToUi();
}
