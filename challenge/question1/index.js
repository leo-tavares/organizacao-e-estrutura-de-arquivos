/**
 *	Escreva um programa na sua linguagem de programação de preferência que
 *	conte o número de palavras e linhas de um arquivo texto, com o nome passado pelo
 *	argumento do comando de linha.
 */
const fs = require("fs");
const { logError } = require("../../utils/error");
const { countWordsAndLines } = require("./countWordsAndLines");

const fileExists = async (path) => {
	const stat = await fs.promises.stat(path);
	return stat.isFile();
};

const main = async () => {
	const [, , pathToFile] = process.argv;
	try {
		if (await fileExists(pathToFile)) {
			countWordsAndLines(pathToFile);
		} else {
			logError("Path do arquivo inválido");
		}
	} catch (error) {
		logError(error);
	}
};

main();
