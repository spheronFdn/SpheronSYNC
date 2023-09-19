# SpheronSYNC

SpheronSYNC is tool built specifically to facilitate the seamless migration of your data from one IPFS provider to Spheron without the need for complex configurations.

## Usage
1. Navigate to the SpheronSYNC website: https://spheronsync-68898b.spheron.app/
2. Sign in to your Spheron account or create one if you don't have an account already.
3. Enter the `endpoint` and the `access token` of the source IPFS provider.
4. Enter the `access token` from Spheron. Learn how to create an access token [here.](https://docs.spheron.network/rest-api/#creating-an-access-token)
5. Confirm and start the migration process.
6. Once the migration is complete, verify the transferred CIDs on Spheron.

> NOTE: Remember to choose `static site` while creating the access token.

## Local Installation
To run SpheronSYNC locally, follow the steps below:

### Client
You can follow these steps to setup the client:
1. Install `Node 16.x` either manually or using a tool like nvm (recommended)
2. Clone this repo: https://github.com/spheronFdn/SpheronSYNC.git
3. Go inside the `client` directory
4. Run `yarn` to install dependencies
5. Create a `.env` file in the client directory and Add the following:
  ```
  REACT_APP_SPHERON_GATEWAY=xxxx
  REACT_APP_BACKEND_ADDRESS=xxxx
  # for local setup use http://localhost:8111/
  ```
6. Start the client
  ```sh
  yarn start
  ```

### Server
You can follow these steps to setup the server:

1. Install `Node 16.x` either manually or using a tool like nvm (recommended)
2. Clone this repo: https://github.com/spheronFdn/SpheronSYNC.git
3. Go inside the `server` directory
4. Run `yarn` to install dependencies
6. Start the server
  ```sh
  yarn start
  ```
