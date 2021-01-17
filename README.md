# Starting up the project

To run the project you need to create .env file in the root directory.
This file should contain:
DATA_BASE_URL=mongodb+srv://[username]:[password]@mycommerce.vgd9h.mongodb.net/test?retryWrites=true&w=majority
Where username should be replaced with your username and password with your password.

.env file should also contain STRIPE_SECRETKEY variable that holds your stripe secret key.

Than you need to run npm init to install all dependencies.
In the end to run the project you need to use npm run devStart command.
