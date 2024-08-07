# Google Sheets API Integration in React Project

This guide provides steps to integrate Google Sheets API in a React project to submit form data to a Google Sheet.

## Steps

### 1. Create HTML Form

Ensure the `name` property (or `...register` in case of `react-hook-form`) of input tags matches the column headings in the Google Sheet (case-sensitive).

### 2. Change Google Sheet Sharing Settings

Change the sharing settings of the Google Sheet to "Anyone with the link" and set the option to "Editor".

### 3. Google Apps Script

Create a Google Apps Script with the following code:

```javascript
function doPost(e) {
  var url = "...enter url of google sheet here...";

  // Add name of sheet which displays at bottom of Google Sheets window (default - Sheet1)
  var sheet = SpreadsheetApp.openByUrl(url).getSheetByName("Sheet1");

  var data = JSON.parse(e.postData.contents);

  // These fields should be exactly the same as in spreadsheet (case-sensitive)
  sheet.appendRow([data.Name, data.Email, data.Message]);
  var output = ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeaders({
    "Access-Control-Allow-Origin": "*", // You can add your frontend URL here instead of *
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return output;
}
```

### 4. Google Apps Script Deployment

Deploy the script as a Web App
Execute as: Me
Who has access: Anyone

### 5. vite.config.js proxy setup

```javascript
server: {
  proxy: {
    "/api": {
      target: "...enter url of google apps script here...",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

### 6. axios POST request

```javascript
axios
  .post("/api", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    toast.success("Form submitted successfully!");
    reset();
  })
  .catch((error) => {
    toast.error("Some error occurred while submitting the form!");
    console.log(error);
  });
```

### 7. Pushing into production (for netlify - make \_redirects in public folder)

/api  script_url_here 200!
/* /index.html 200
