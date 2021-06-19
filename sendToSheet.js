const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require("./credentials.json");
const { promisify } = require('util');

const usersToSheetFormat = (users) => {
  return users.map(({id, username, weapons}) => ({
    "ID": id,
    "Username": username,
    "Arma 1": weapons[0],
    "Arma 2": weapons[1],
  }))
}

const sendData = async (users) => {
  const sheetId = "1kmI3-aHrBLesqoYaCHHSGgXWV-pdHs35nYxvob1o_sM";
  const sheet = new GoogleSpreadsheet(sheetId);
  
  await promisify(sheet.useServiceAccountAuth)(credentials);  
  const sheetInfo = await promisify(sheet.getInfo)();
  const worksheet = sheetInfo.worksheets[0];

  await promisify(worksheet.clear)()
  await promisify(worksheet.setHeaderRow)(["ID", "Username", "Arma 1", "Arma 2"])

  const formatedUsers = usersToSheetFormat(users);

  const promises = formatedUsers.map((user) => {
    return promisify(worksheet.addRow)(user)
  })

  Promise.all(promises).then(() => {
    process.exit(1);
  })
}

module.exports = sendData;


