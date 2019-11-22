# I'M HUNGRY, HI HUNGRY I'M DAD


Dad Jokes App is a way for anyone to see public jokes posted by signed up users. This app provides a single repository of dad jokandes that is easy to access and navigate around.
A user that is signed up and logged in is able to see all of their own posted jokes, add a new joke, edit or delete one of their jokes. 

## Required features
- User can view dad jokes listed as 'public' without having an account (being authenticated)
- User can sign up as by providing a unique username and a password that will serve as their login/authentication credentials.
- An authenticated user has the ability to view, create, edit and delete jokes.
	- Created joke must have properties: question/answer (strings)
- Joke page listing all jokes: user can click on individual joke and see detailed view
 
 
To install and run this project you will need to:
```sh
git clone <https://github.com/annawinther/dadjokes-backend/>
npm install
npm start
```

## Testing

```sh
npm test
```
 
## API Documentation
API is hosed at https://dadjokesapp.herokuapp.com/public-jokes

Note: all API requests expect an Authorization header containing the token for the currently logged in user.


		
| Method       | Endpoint       | Description                                                                      |
| :-----------:|:-------------: | :------------------------------------------------------------------------------: | 
|      GET     | /public-jokes  | Returns a list of jokes that are listed as `public` for anyone to see            |
|      POST    | /auth/register | Creates a new user using the information sent inside the request body            |
|      POST    | /auth/login    | Logs in user using the information sent inside the request body                  |
|      GET     | /api/jokes     | Returns a list of all jokes that belongs to the logged in user                   |
|      POST    | /api/jokes     | Creates a new joke using the information sent in the request body                |
|      GET     | /api/jokes/:id | Returns the joke with the id, also only those that belong to the logged in user  |
|      DELETE  | /api/jokes/:id | Deletes the joke with the specified id, only the joke belonging to the user      |
|      PUT     | /api/jokes/:id | Updates the joke with the specified id using data from the request body          |


Database Schemas
The Database Schemas for the users and jokes resources are:

Users

| Field       | Data Type         | Metadata                                                |
| :---------: |:----------------: | :-----------------------------------------------------: |
|  id         | unsigned integer  | primary key, auto-increments, generated by the database |
|  username   | string            | required                                                |
|  email      | string            | required                                                |
|  password   | string            | required                                                |


Jokes

| Field        | Data Type         | Metadata                                               |
| :-----------:|:-----------------:| :----------------------------------------------------: |
| id	       | unsigned integer  | primary key, auto-increments, generated by database    |
| setup        | string	    	   | required                                               |
| punchline    | string	           | required                                               |
| public       | string	           |                                                        |
| user_id      | unsigned integer  | required, must be the `id` of an existing `user`       |
