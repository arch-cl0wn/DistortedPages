export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <link rel="icon" href="quillinx_logo1_cropped.png">
          <link href="https://fonts.googleapis.com/css2?family=Lora&family=Poppins:wght@700&display=swap" rel="stylesheet">
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <title>Quillinx</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none
              }
          </style>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
