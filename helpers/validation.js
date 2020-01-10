
/**
 * DESCRIPTION: checks if request has a file
 * @param {string} request - express request
 * @param {string} file - input file name
 * @return {boolean} true if request has the file
 */
exports.hasFile = (req, file) => {
	return ((req.files) && (req.files[file])) ? true : false;
}

/**
 * DESCRIPTION: gets any file extension without dot
 * @param {string} file - input file name
 * @return file extension without dot
 */
exports.getFileExt = (file) => {
	return file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
}

/**
 * @param {string} ext - input file extension
 * @return true if pdf/doc/rtf
 */
exports.isResume = (ext) => {
	switch (ext) {
		case 'pdf': return 'pdf';
		case 'doc': return 'doc';
		case 'rtf': return 'rtf';
		default: return false;
	}
}

/**
 * @param {string} ext - input file extension
 * @return true if jpg/jpeg/png
 */
exports.isImage = (ext) => {
	switch (ext) {
		case 'jpg': return 'jpg';
		case 'jpeg': return 'jpeg';
		case 'png': return 'png';
		default: return false;
	}
}






