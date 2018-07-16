# The Stoic Dev

Pet project for https://www.youtube.com/channel/UClxz_RH0drPKlRfumi9EW8A

## Installation

```
yarn
```

## Dev

```
yarn dev
```

###

POST a new item

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"content": "test from terminal"}' \
  http://localhost:3000/items
```

### Test

To run tests

```
yarn test
```
