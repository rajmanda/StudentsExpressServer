## Development server

to start the express server run the following command

npm run dev 

make sure your package.json script has the following

  "scripts": {
    "start": "node ./bin/www",
    "dev": "npx nodemon ./bin/www"
  },


# follow_logs.sh

#!/bin/bash

# Define the log groups to follow
LOG_GROUPS=(
    "/aws/lambda/function1"
    "/aws/lambda/function2"
    "/aws/lambda/function3"
)

# Run each `aws logs tail` command in the background
echo "${LOG_GROUPS[@]}" | xargs -n 1 -P 3 -I {} bash -c 'aws logs tail {} --follow'
