## Development server

to start the express server run the following command

ng run dev 

make sure your package.json script has the following

  "scripts": {
    "start": "node ./bin/www",
    "dev": "npx nodemon ./bin/www"
  },