
# Audible Display of the Stock Market in Realtime

[![DOI](https://zenodo.org/badge/599662599.svg)](https://zenodo.org/badge/latestdoi/599662599)


ADSM is an offline dashboard built on ReactJS that allows for real time monitoring of the stock market with sonification for serendipitious peripheral monitoring. Check Experimental branch for newest beta version.

## Table of contents

- Installation
- Configuration
- Troubleshooting
- Examples
- Maintainers


## Installation

Download the software and inside the folder populate the libraries using:

```
npm install
```

Start the development server:

```
npm run development
```


## Configuration

Since custom hooks were created, changing the props will allow for full functionability with any stock and alarm note.


To change the stock change the new object variable name and the ticker passed into the useStock Hook. For example

```
const {
		current: current<ChangeName>,
		changePercent: changePercent<ChangeName>,
		openPrice: openPrice<ChangeName>,
		oldPrice: oldPrice<ChangeName>,
	} = useStock('<Ticker>')

```

Following this, update all object values where referenced in the HTML below.

## Troubleshooting

For audible issues stop the audio using the media control on the dashboard, if issue is still present close the application and restart the npm server. 

For issues consisting of the dashboard, contact a maintanter or leave a github request.

Features are constantly being updated, so make sure to run a git pull to ensure you are using the current version of ADSM.

## Examples

Below are videos showing the software working:

Price Increase example:
https://www.youtube.com/watch?v=R8iDHn_O5rQ


Price Decrease example:
https://www.youtube.com/watch?v=TsoFgU4KwJk



## Manitainers

- Matthew Storey (https://www.linkedin.com/in/matthew-storey-330529188/)
