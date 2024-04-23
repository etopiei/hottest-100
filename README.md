# Triple-J Hottest 100 Data

[View Website Here](https://hottest100.etopiei.com)

Some cool graphs showing info about the triple-j hottest 100 over the years.

Data courtesy of the ABC (https://www.abc.net.au/triplej/hottest100/archive/search/)

## Running

To run locally:

```
$ curl https://github.com/chartjs/Chart.js/releases/download/v4.4.2/chart.js-4.4.2.tgz
$ tar -xzf chart.js-4.4.2.tgz
$ npm install -g typescript
$ tsc --module es2022 data_processing.ts
```

Then open index.html to see graphs.

