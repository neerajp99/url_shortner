## Web application to shorten the URL
### It works similar to bit.ly / goo.gl

![Alt text](/client/src/utils/img/screenshot.png?raw=true "Screenshot")

#### the website is development mode and is using proxy to tell the development server to proxy any unknown requests to your API server in development. if you have a setup on some server,do enable CORS on your server (https://enable-cors.org/server_expressjs.html).

Here is a sample code for the approach:

```html
<script type="text/x-tmpl" id="tmpl-demo">
  app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  response.header(
    "Access-Control-Allow-Headers",
    "Content-type, Accept, x-access-token, X-Key"
  );

  if (request.method == "OPTIONS") {
    response.status(200).end();
  } 
  else {
    next();
  }
});
</script>
```


