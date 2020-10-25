import path from 'path';
import fs from 'fs';
import { IS_DEV } from '../config';

interface AsetsManifest {
	[key: string]: { [key: string]: { js?: string[]; css?: string[] } };
}
let cashaAsetsManifest: AsetsManifest;

function loadAsetsManifest() {
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
