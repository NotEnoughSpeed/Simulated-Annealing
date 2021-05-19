function getSheetData(sheet) {
  return sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()).getValues();
}
