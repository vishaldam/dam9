/*     
    nanibot - a bot by nani built in JS on node
    Copyright (C) 2018 Cole McKinney <cole@coles.life>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const fs = require('fs');
const path = require('path');

const { prefix } = require('../../conf/config.json');
const { code } = require('../util/format');
const checks = require('../util/checks');
const _ = require('../util/message').get;

module.exports = (client, msg) => {
    let content = msg.content;

    if (content.startsWith(prefix)) {
        content = content.replace(prefix, '');
        const name = content.split(' ')[0],
            path = `../cmd/${name}`;

        try {
            const command = require(path);
            const cmdChecks = command.checks;

            let checksPassed = true;
            let failedCheck;

            if (cmdChecks) {
                for (check of cmdChecks) {
                    if (!checks[check](client, msg)) {
                        checksPassed = false;
                        failedCheck = check;
                        break;
                    }
                }
            }

            try {
                if (!checksPassed) throw new Error(`Check ${failedCheck} failed`);
                command.run(client, msg);
            }
            catch (e) {
                msg.channel.send(_('error') + code(e));
            }
        }
        catch (ignored) {}
    }
}