const appHelper = new Object();

appHelper.apiResponse = (resStatusCode , resStatus , resMessageKey , resData) => {
	let res = {
		code: resStatusCode,
		status: resStatus,
	};
	if (resStatus) {
		res.message = resMessageKey;
	} else {
		res.error = resMessageKey;
		res.message = resMessageKey;
	}
	res.data = resData;
	return JSON.parse(JSON.stringify(res));
}

module.exports = appHelper;