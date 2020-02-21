import bls from 'bls-wasm'

export const sign = (transactionHash: any, private_key: any) => {
	const hash = hexStringToByte(transactionHash);
	const sec = new bls.SecretKey();
	sec.deserializeHexStr(private_key);
	const sig = sec.sign(hash);
	return sig.serializeToHexStr();
}

export const byteToHexString = (uint8arr: any) => {
	if (!uint8arr) {
		return '';
	}
	var hexStr = '';

	for (var i = 0; i < uint8arr.length; i++) {
		var hex = (uint8arr[i] & 0xff).toString(16);
		hex = (hex.length === 1) ? '0' + hex : hex;
		hexStr += hex;
	}
	return hexStr;
}

export const hexStringToByte = (str: any) => {
	if (!str) {
		return new Uint8Array();
	}
	var a = [];
	for (let i = 0, len = str.length; i < len; i += 2) {
		a.push(parseInt(str.substr(i, 2), 16));
	}
	//console.log("HexStringToByte returning non-empty")
	return new Uint8Array(a);
}