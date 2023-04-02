const input = require('input');

auth();



async function auth() {
    let type = await input.select('What type of auth are you using?', ['Bot', 'Account',])
    if (type == 'Bot') {
        const { Client } = require('discord.js')
        const client = new Client({ intents: ['GUILDS',] })
        let token = await input.password('What is your bot token?')

        client.on('ready', async () => { 
            console.log('Logged in!') 
            if(client.isReady()) {
                let g = await input.text('What is the Server ID of the server to sync from?')
                let Guild = await client.guilds.fetch(`${g}`)
                .catch(e => { 
                    console.log('Invalid Server ID or this account is not in the server.')
                    process.exit(1)
                })
                let Bans = await Guild.bans.fetch()
                .then(bans => bans.map(b => b.user.id))
                console.log(`Found ${Bans.length} bans...`)

                if(Bans.length == 0) return console.log('No bans found, exiting...') && process.exit(1)

    
                let g2 = await input.text('What is the Server ID of the server to sync to?')
                let Guild2 = await client.guilds.fetch(`${g2}`)
                .catch(e => {
                    console.log('Invalid Server ID or this account is not in the server.')
                    process.exit(1)
                });
    
                for (const b of Bans) {
                    await Guild2.members.ban(`${b}`, { reason: 'Ban Sync'})
                    .then(u => console.log(`Banned ${u.tag} (${u.id})`))
                    .catch(e => console.log(`Failed to ban ${User.tag}!, ${e}`))
                }
    
                console.log('Done!')
    
                
            }
        })
        client.login(token).catch(err => { console.log('Invalid Token'), process.exit(1) });
    
    } 
    
    
    
    else if (type == 'Account') {

        const { Client } = require('discord.js-selfbot-v13')
        const client = new Client({ checkUpdate: false})
        let token = await input.password('What is your account token?')

        client.on('ready', async () => { 
            console.log('Logged in!') 
            if(client.isReady()) {
                let g = await input.text('What is the Server ID of the server to sync from?')
                let Guild = await client.guilds.fetch(`${g}`)
                .catch(e => { 
                    console.log('Invalid Server ID or this account is not in the server.')
                    process.exit(1)
                })
                let Bans = await Guild.bans.fetch()
                .then(bans => bans.map(b => b.user.id))
                console.log(`Found ${Bans.length} bans...`)

                if(Bans.length == 0) return console.log('No bans found, exiting...') && process.exit(1)

                let g2 = await input.text('What is the Server ID of the server to sync to?')
                let Guild2 = await client.guilds.fetch(`${g2}`)
                .catch(e => {
                    console.log('Invalid Server ID or this account is not in the server.')
                    process.exit(1)
                });
    
                for (const b of Bans) {
                    if (Guild2.bans.cache.has(b)) {
                        console.log(`This user is already banned. ${b}`)
                        continue;
                    }
                    await Guild2.members.ban(`${b}`, { reason: 'Ban Sync'})
                    .then(u => console.log(`Banned ${u.tag} (${u.id})`))
                    .catch(e => console.log(`Failed to ban ${User.tag}!, ${e}`))
                }
    
                console.log('Done!')
    
                
            }
        })
        client.login(token).catch(err => { console.log('Invalid Token'), process.exit(1) });

    }

}
