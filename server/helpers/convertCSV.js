const neatCsv = require('neat-csv')
const fs = require('fs')

/* 
Convert CSV-file to an array of objects with the content from the CSV-file.
@path = 'path_to_CSV_FILE
*/

exports.convertCSVTOJSON = async path => {
  return await neatCsv(fs.createReadStream(path), { separator: ';' })
}
