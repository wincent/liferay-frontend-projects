/**
 * SPDX-FileCopyrightText: © 2017 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import cpr from 'cpr';
import fs from 'fs-extra';
import {format} from 'liferay-js-toolkit-core';

import {project} from '../config';

const {error, print, success} = format;

/**
 *
 */
export default function (): Promise<void> {
	return new Promise((resolve) => {
		const {outputDir} = project;

		fs.mkdirpSync(outputDir.asNative);

		cpr(
			'assets',
			outputDir.asNative,
			{
				confirm: true,
				filter: (path) => !/\/\.placeholder$/.test(path),
				overwrite: true,
			},
			(err) => {
				if (err && err.message !== 'No files to copy') {
					print(error`${err}`);
					process.exit(1);
				} else {
					print(success`Project assets copied`);
				}

				resolve();
			}
		);
	});
}
