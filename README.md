# SpheronSYNC

SpheronSYNC is a tool built specifically to facilitate the seamless migration of your data from one IPFS provider to Spheron without the need for complex configurations.

## Description
SpheronSYNC aims to simplify the data migration process from one IPFS pinning service to Spheron. Without this tool, users would need to manually configure and manage the migration, a task that can be error-prone and time-consuming. Users can initiate the migration process with just a few clicks, eliminating the need for deep knowledge of IPFS configurations or infrastructure management.

### Why did we build this?
Users want to migrate their assets to Spheron for its ease of use and exceptional performance. However, switching from one IPFS pinning service to another can be a complex process without the right tools. Hence, we built SpheronSYNC to simplify this process.

### Technical Terminology
- **IPFS (InterPlanetary File System):** The InterPlanetary File System is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.
- **CID (Content Identifier):** A unique identifier for content addressed by IPFS, ensuring content integrity and facilitating retrieval.
- **Access Token:** A security credential used to authenticate and authorize access to the Spheron platform. You can create an access token following the [guidelines in the documentation.](https://docs.spheron.network/rest-api/#creating-an-access-token)

## Usage
1. Navigate to the SpheronSYNC website: https://spheronsync-68898b.spheron.app/
2. Sign in to your Spheron account or create one if you don't have an account already.
3. Enter the `endpoint` and the `access token` of the source IPFS provider.
4. Enter the `access token` from Spheron. Learn how to create an access token [here.](https://docs.spheron.network/rest-api/#creating-an-access-token)
5. Confirm and start the migration process.
6. Once the migration is complete, verify the transferred CIDs on Spheron.

> NOTE: Remember to choose `storage` while creating the access token.

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
5. Start the server
  ```sh
  yarn start
  ```

## Help
For help, discussions or any other queries: [Join our Community](https://community.spheron.network/)

## Version History
* 0.1
    * Initial Release

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Acknowledgments
- https://docs.spheron.network/sdk/storage-v2/#pin-a-cid-on-ipfs
- https://docs.pinata.cloud/reference/get_data-pinlist
