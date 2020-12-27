# Rolling America Service

Service for Rolling America the game.

## Development

### Prerequisites
- `git` command line tools ([installation instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- `node` v14 and `npm` v6 ([installation instructions](https://nodejs.org/en/download/))
- `yarn` (run `npm install -g yarn` to install with `npm`)


### Setup

1. Clone repository: `git clone https://github.com/mlafaive/rolling-america-service.git`
2. Enter local code: `cd rolling-america-service`
3. Install dependencies: `yarn`
4. Run development server: `yarn start:dev`

To test if your setup worked correctly go to [http://localhost:8080](http://localhost:8000/healthcheck) in your browser and you should see `{"status": "ok"}`.

To find additional `npm` commands view the scripts in the [package.json](package.json).

### File Structure

The source code will be found in the `src` directory. Where it is split up into three basic folders:

- `routes`: this holds the different endpoints for the service
- `middleware`: these are the functions that run on requests before the routes are run (ex. authenticating a user)
- `lib`: these are all the internal utility functions used by the service