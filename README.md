# Example JS project for the Pact workshop

## Step 1: Run the consumer test

Demonstrates:

- that we can put assumptions in our unit tests that aren't valid
- Pact tests are nothing scary, and look much like the use of `nock`

_Running step 1:_

```
npm run test:consumer
npm run test:pact:consumer
npm run test:pact:publish
```

## Step 2: Write the provider test

Demonstrates:

- the assumptions in step 1 by the consumer team are wrong (failed test)
- teams need to communicate with each other

_Running step 2_

```
npm run test:pact:provider # fail
```

Two problems

1. qty -> quantity difference
2. value -> itemValue
