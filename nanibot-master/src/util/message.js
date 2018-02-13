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

const messages = require('../../data/messages.json');

let lang = 'en';

module.exports.get = (key, replace = []) => {
    let msg = messages[lang][key];
    for (repl of replace) {
        msg = msg.replace('%', repl);
    }
    return msg;
}

module.exports.setLang = l => {
    lang = l;
}