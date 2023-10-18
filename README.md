# TDD Demo

1. Requests list of TODO items on start at route
2. Displays loading state
3. Displays errors when API responds 500 - TBA
4. Displays errors when API responds 404 - TBA
5. Displays empty list when API responds with empty list
6. Displays empty list when API responds unexpected data structure
7. Displays todo items per Item responded
8. Each todo item displays name, time,
9. Submits TODO item when submitting form
10. Submits GET request with filter
11. Submits GET request when filter cleared
12. Only submits GET when minimum character length keyword

## Commands

Run unit tests

```bash
yarn test:unit
```

Develop unit tests

```bash
yarn test:unit:dev
```

Calculate coverage of unit tests

```bash
yarn test:unit:cover
```

Show coverage report

```bash
yarn test:unit:report
```

Start the app

```bash
yarn dev
```

Run integration tests

```bash
yarn test:int
```

Develop integration tests

```bash
yarn test:int:dev
```
