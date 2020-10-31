const fs = require("fs");
const readline = require("readline");
const { logError } = require("../../utils/error");

const countWordsAndLines = (pathToFile) => {
	try {
		const readableStream = fs.createReadStream(pathToFile, {
			highWaterMark: 1, // 'limite' do buffer em bytes
		});
		const rl = readline.createInterface(readableStream);
		let numberOfLines = 0;
		let numberOfWords = 0;
		rl.on("line", (input) => {
			const matchWord = new RegExp(/[\w\d’'\u00C0-\u00FF]+/gi);
			const listOfWordsPerLine = input && input.trim().match(matchWord);
			if (listOfWordsPerLine) {
				numberOfWords += listOfWordsPerLine.length;
			}
			numberOfLines++;
		});
		readableStream.on("error", (err) => {
			logError(err);
		});
		readableStream.on("end", () => {
			console.log(`Total de linhas => ${numberOfLines}`);
			console.log(`Total de palavras => ${numberOfWords}`);
		});
	} catch (error) {
		logError(error);
	}
};

exports.countWordsAndLines = countWordsAndLines;
