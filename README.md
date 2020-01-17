
# Using dotenv to keep your applications secrets safe

It's important to keep your session secret, your API keys, and other credentials private.

It's a common practice to store this information in *environment variables*. These are variables you set in `bash` and are accessible from your `node` program.

Normally, you set environment variables just before you run the command that needs access to these variables.

## A first example: Setting the PORT of an express server

Here is how you have typically started your express servers:

```js
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
```

But how would you run more than one express server at the same time?

You would have to change the `PORT` for each so that each server had its own port number.

One option is to change the `PORT` in each `index.js` of each express server you're running. But this is not a good option as it requires you to keep up with which ports are free and make changes to each of your projects.

The thing to do is to make the port number configurable when you start the server.

This is how you would set an environment variable when you run your server:

```sh
PORT=3003 node index.js
```
Here's how you read the `PORT` value from the environment:

```js
const PORT = process.env.PORT || 3000;
```

If port number is not set in the environment, then the value `3000` is used.

With this small change, you can set the configuration for your express server (or any Node.js program) without changing the code.

## Example of setting database credentials as environment variables

Even though you set the environment variables when running `node index.js`, the environment variables are available to any modules you import while the app is running.

Here's an example `connection.js` that uses `pg-promise` to access the database. Instead of hard-coding the database host and database name, we'll read them from the environment:

```js
const pgp = require('pg-promise')({
    query: e => {
        // print the SQL query
        console.log(`QUERY: ${e.query}`);
    }
});

const options = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME
};

const db = pgp(options);
module.exports = db;
```

You could then run your express server with the following command:

```sh
PORT=3003 DATABASE_HOST=localhost DATABASE_NAME=fullstack-pets node index.js
```

A couple of rules to follow when setting environment variables:

- There can be no spaces.
- You do not include quotes around strings.


## Storing your environment variables in a file

Because environment variables are so useful, they are often stored in a file named `.env` which you keep at the root of your project (the same directory as your `index.js` and your `package.json`).

Here is what our example `.env` would contain:

```
PORT=3003 
DATABASE_HOST=localhost DATABASE_NAME=fullstack-pets
```

You set one variable per line, omitting spaces and quotes.

To read the values from this file, you will need to install the `dotenv` module as a dependency.

### Installing `dotenv`

Run this line to add `dotenv` to your project:

```sh
npm i dotenv
```

### `require()` and `.config()` the `dotenv` module

Add this as the first line of your `index.js`:

`require('dotenv').config();`

There is no need to create a variable. You are immediately calling the `.config()` function from `require('dotenv')`.

Make sure that this line runs *before* any of your other code, especially before importing other modules with `require()`. Doing so guarantees that your environment variables are available.


### Add a `.gitignore` to your project

```sh
touch .gitignore
code .gitignore
```

Make sure to add `.env` to this file, along with other files and folders that you might want to keep off of GitHub:

```
.env
node_modules
sessions
```

Finally, add and commit your `.gitignore`

```sh
git add .gitignore
git commit -am "adds a list of files to ignore"
```


## Summary

- Store your application secrets in a `.env` file.
- In your `.env`, set one variable per line, omitting spaces and quotes.
- Include a `require('dotenv').config();` as the first line of your `index.js`.
- Access the variables from `process.env`.
- Add your `.env` to a `.gitignore` file.
- Add and commit `.gitignore` to your project.
