export default {
    "name": "yahoo-finance2",
    "version": "0.0.1",
    "description": "JS API for Yahoo Finance",
    "type": "module",
    "module": "./dist/esm/src/index-node.js",
    "main": "./dist/cjs/src/index-node.js",
    "exports": {
        "import": "./dist/esm/src/index-node.js",
        "default": "./dist/cjs/src/index-node.js"
    },
    "types": "./dist/esm/src/index-node.d.ts",
    "browser": "./dist/esm/src/index-browser.js",
    "repository": "https://github.com/gadicc/node-yahoo-finance2",
    "author": "Gadi Cohen <dragon@wastelands.net>",
    "license": "MIT",
    "keywords": [
        "yahoo",
        "finance",
        "financial",
        "data",
        "stock",
        "price",
        "quote",
        "historical",
        "eod",
        "end-of-day",
        "client",
        "library"
    ],
    "engines": {
        "node": ">=16.0.0"
    },
    "bin": {
        "yahoo-finance": "bin/yahoo-finance.js"
    },
    "scripts": {
        "coverage": "yarn test --coverage",
        "lint": "eslint . --ext .js,.ts",
        "//schema": "ts-json-schema-generator -f tsconfig.json -p 'src/{modules/**/*.ts,lib/options.ts}' -t '*' | node bin/schema-tweak.js > schema.json",
        "schema": "node --loader ts-node/esm scripts/schema.js > schema.json",
        "build": "yarn run build:esm && yarn run build:cjs && yarn run build:post",
        "build:esm": "tsc --module es2020 --target es2019 --outDir dist/esm",
        "build:cjs": "tsc --module commonjs --target es2015 --outDir dist/cjs && sed 's/\"type\": \"module\",/\"type:\": \"commonjs\",/' dist/cjs/package.json > dist/cjs/package-changed.json && mv dist/cjs/package-changed.json dist/cjs/package.json",
        "build:post": "scripts/json-transform.sh",
        "generateSchema": "yarn schema",
        "prepublishOnly": "yarn build && yarn generateSchema && yarn build:post",
        "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js",
        "test:ts": "tsc --noEmit",
        "test:esm": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js -c tests-modules/esm/jest.config.js tests-modules/esm/tests/*",
        "test:cjs": "node ./node_modules/jest/bin/jest.js -c tests-modules/cjs/jest.config.js tests-modules/cjs/tests/*",
        "test:modules": "yarn test:esm && yarn test:cjs",
        "test:build": "yarn test:modules"
    },
    "files": [
        "dist",
        "schema.json"
    ],
    "dependencies": {
        "@types/tough-cookie": "^4.0.2",
        "ajv": "8.10.0",
        "ajv-formats": "2.1.1",
        "node-fetch": "^2.6.1",
        "tough-cookie": "^4.1.2",
        "tough-cookie-file-store": "^2.0.3"
    },
    "devDependencies": {
        "@semantic-release/changelog": "6.0.3",
        "@semantic-release/commit-analyzer": "9.0.2",
        "@semantic-release/git": "10.0.1",
        "@semantic-release/github": "8.1.0",
        "@semantic-release/npm": "9.0.2",
        "@semantic-release/release-notes-generator": "10.0.3",
        "@tsconfig/node12": "12.1.0",
        "@types/jest": "29.5.7",
        "@types/node-fetch": "2.6.8",
        "@typescript-eslint/eslint-plugin": "5.62.0",
        "@typescript-eslint/parser": "5.62.0",
        "eslint": "8.53.0",
        "eslint-config-prettier": "8.10.0",
        "globby": "13.2.2",
        "jest": "29.7.0",
        "jest-tobetype": "1.2.3",
        "oas-schema-walker": "1.1.5",
        "prettier": "2.8.8",
        "semantic-release": "19.0.5",
        "ts-jest": "29.1.1",
        "ts-json-schema-generator": "1.4.0",
        "ts-node": "10.9.1",
        "typescript": "5.2.2"
    }
}
