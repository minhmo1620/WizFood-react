# WizFood

WizFood-react is the Frontend of WizFood, which is my Capstone project to graduate

## Set up
Please make sure you have installed `node`, `npm`, and `yarn`
```bash
$ brew install node@16.14.0
$ brew install npm@8.1.0
$ brew install yarn@1.22.10s
```

## Run the application

### Docker
Build:

    docker build -t wizfood-react:1.0 . 

Run:

    docker run --rm -p 3000:3000 wizfood-react:1.0

### Without Docker

Install the project

    npm install

Run the project locally 

    npm start

or 

    yarn start
