import { IS_DEV } from './../config';
import path from 'path';
import fs from 'fs';
interface AsetsManifest {
	[key: string]: { [key: string]: { js?: string[]; css?: string[] } };
}
let cashaAsetsManifest: AsetsManifest;

function loadAsetsManifest() {
	console.log(1);
	return JSON.parse(
		fs
			.readFileSync(
				path.join(__dirname, '../../../storage/app', 'assets-manifest.json')
			)
			.toString()
	);
}
function asetsManifest(): AsetsManifest {
	if (!IS_DEV) {
		cashaAsetsManifest = loadAsetsManifest();
	}
	return IS_DEV ? loadAsetsManifest() : cashaAsetsManifest;
}

export default asetsManifest;
