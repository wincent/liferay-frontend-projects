/**
 * SPDX-FileCopyrightText: © 2017 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import ProjectAnalyzer from '../../../ProjectAnalyzer';

/**
 * A class to help modifying the Language.properties file.
 */
export default class {
	/**
	 * @param {Generator} generator a Yeoman generator
	 */
	constructor(generator) {
		this._generator = generator;
		this._path = new ProjectAnalyzer(generator).localizationFilePath;
	}

	/**
	 * Add a bunch of properties at once
	 * @param {object} properties
	 */
	addProperties(properties): void {
		Object.entries(properties).forEach(([name, value]) => {
			if (value !== undefined) {
				this.addProperty(name, value);
			}
		});
	}

	/**
	 * @param {string} name
	 * @param {string} value
	 */
	addProperty(name, value): void {
		const fs = this._generator.fs;

		let content = fs.read(this._path).toString();

		if (content.length > 0 && content.charAt(content.length - 1) !== '\n') {
			content += '\n';
		}

		content += `${name}=${value}\n`;

		fs.write(this._path, content);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _generator: any;
	private _path: string;
}
