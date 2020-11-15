import path from 'path';
import fs from 'fs';
import { IS_DEV } from '../config';

interface AssetsManifest {
	[key: string]: { [key: string]: { js?: string[]; css?: string[] } };
}
let cacheAssetsManifest: AssetsManifest;

function loadAssetsManifest() {
	return JSON.parse(
		fs
			.readFileSync(
				path.join(__dirname, '../../../storage/app', 'assets-manifest.json')
			)
			.toString()
	);
}
function assetsManifest(): AssetsManifest {
	if (!IS_DEV) {
		cacheAssetsManifest = loadAssetsManifest();
	}
	return IS_DEV ? loadAssetsManifest() : cacheAssetsManifest;
}

export default assetsManifest;
