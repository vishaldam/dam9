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

const { code, removeCommand } = require('../util/format');
let m;

module.exports.run = (client, msg) => {
    m = msg;
    let res = eval(removeCommand(msg.content.replace('```js\n', '').replace('```', '')));
    if (res.then) res.then(send);
    else {
        if (typeof res === 'object') res = require('util').inspect(res, { depth: 0 });
        send(res);
    }
}

function send(...args) {
    m.channel.send(code(...args));
}

module.exports.checks = ['botOwner', 'hasArgs'];