function replacehhftobr(value) {
	let str = value.replace(/\r\n|\r|\n/g, "<br/>");
	return str;
}


function replacebrtohhf(value) {
	let str = value.replace(/<br\/>/g, "\n");
	return str;
}