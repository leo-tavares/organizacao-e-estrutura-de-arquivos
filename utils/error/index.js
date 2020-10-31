exports.logError = function logError(err) {
	if (err instanceof Error) {
		console.log(`${err.name} -> msg: ${err.message}`);
	} else {
		console.log(err);
	}
};
