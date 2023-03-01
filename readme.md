# How to run the Nextjs project

## Running locally in development mode using NPM

To get started, just clone the repository and run `npm install && npm run dev`:

    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install`) which will skip installing fsevents.

## Running locally in development mode using YARN

To get started, just clone the repository and run `yarn && yarn dev`:

    yarn
    yarn dev

Note: If you are running on Windows run install --noptional flag (i.e. `yarn`) which will skip installing fsevents.

## Building and deploying in production using NPM

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).

## Building and deploying in production using YARN

If you wanted to run this site in production, you should install modules then build the site with `yarn run build` and run it with `yarn start`:

    yarn
    yarn run build
    yarn start

You should run `yarn run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 yarn start`).