const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/timestamp/', (req, res) => {
	const date = Date.parse(new Date());
	res.json({
		unix: date,
		utc: new Date(date).toUTCString()
	});
});

app.get('/api/timestamp/:date_string?', (req, res) => {
	const invalidDate = 'Invalid Date';
	const dateRegex = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])/;
	const unixRegex = /^\d+$/;
	let date = req.params.date_string;
	if (!date) {
		date = Date.parse(new Date());
	}
	if (date.match(dateRegex)) {
		if (new Date(date) != invalidDate) {
			res.json({
				unix: Date.parse(date),
				utc: new Date(date).toUTCString()
			});
		} else {
			res.json({
				error: invalidDate
			});
		}
	} else if (date.match(unixRegex)) {
		res.json({
			unix: date,
			utc: new Date(parseInt(date)).toUTCString()
		});
	} else {
		res.json({
			error: invalidDate
		});
	}
});

app.listen(1111, () => {
	console.log('Listening on 1111');
});
