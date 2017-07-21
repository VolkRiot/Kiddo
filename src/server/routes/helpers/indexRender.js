const indexRender = () =>
  `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
          <link rel="stylesheet" type="text/css" href="https://csshake.surge.sh/csshake.min.css"/>
          <link href="https://fonts.googleapis.com/css?family=Pacifico|Raleway|Poppins|Sacramento|Bad+Script|Life+Savers" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" type="text/css" href="${(process.env.NODE_ENV === 'production')? 'https://appkiddo.herokuapp.com/':'http://localhost:3000/'}css/bundle.css"/>
        </head>
          <title>Kiddo</title>
        <body>
          <div id="app"></div>
         <script src="/js/bundle.js"></script>
        </body>
      </html>
      `;

module.exports = indexRender;
