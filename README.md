(1) - make html form and keep the "name" property (or ...register in case of react-hook-form) of input tags same as column headings in google sheet (case sensitive)

(2) - change sharing setting of google sheet to "anyone with the link"

(3) - google apps script code :-

function doPost(e) {
var url = "...enter url of google sheet here...";

// add name of sheet which displays at bottom of google sheets window (default - Sheet1)
var sheet = SpreadsheetApp.openByUrl(url).getSheetByName("Sheet1");

var data = JSON.parse(e.postData.contents);

// these fields should be exactly same as in spreadsheet (case sensitive)
sheet.appendRow([data.Name, data.Email, data.Message]);
var output = ContentService.createTextOutput(JSON.stringify({"result": "success"}));
output.setMimeType(ContentService.MimeType.JSON);
output.setHeaders({
"Access-Control-Allow-Origin": "_", // you can add your frontend url here instead of _
"Access-Control-Allow-Methods": "POST",
"Access-Control-Allow-Headers": "Content-Type"
});

return output;
}

(4) - add this in vite.config.js after plugins :-
server: {
proxy: {
"/api": {
target:
"...enter url of google apps script here...",
changeOrigin: true,
rewrite: (path) => path.replace(/^\/api/, ""),
},
},
},
