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

const { Client } = require('discord.js');
const client = new Client();

const _ = require('./util/message').get;

const config = require('../conf/config.json');

console.log(_('console_license'));

// Credit #1 - Samir Martin (see CREDIT.txt)
require('fs').readdir('events', (err, files) => {
    for (file of files) {
        file = file.split('.')[0];
        const event = require(`./events/${file}`);
        
        // Credit #2 - OGNovuh
        client.on(file, event.bind(null, client));
        // end Credit #2
    }
});
// end Credit #1

client.login(config.token);