const { EmbedBuilder } = require('discord.js')

const setClass = (vocation) => {
    switch (vocation) {
        case 'Goku':
            return 'Half'
        case 'Vegeta':
            return 'Half'
        case 'Buu':
            return 'Tank'
        case 'Piccolo':
            return 'Tank'
        case 'Gohan':
            return 'Damage'
        case 'Trunks':
            return 'Damage'
        case 'Dende':
            return 'Suporte'
        case 'Bulma':
            return 'Suporte'  
    }
}

const setTumb = (vocation) => {
    switch (vocation) {
        case 'Goku':
            return 'https://saiyansreturn.com/images/characters/Goku/avatar.png'
        case 'Vegeta':
            return 'https://saiyansreturn.com/images/characters/Vegeta/avatar.png'
        case 'Buu':
            return 'https://saiyansreturn.com/images/characters/Buu/avatar.png'
        case 'Piccolo':
            return 'https://saiyansreturn.com/images/characters/Piccolo/avatar.png'
        case 'Gohan':
            return 'https://saiyansreturn.com/images/characters/Gohan/avatar.png'
        case 'Trunks':
            return 'https://saiyansreturn.com/images/characters/Trunks/avatar.png'
        case 'Dende':
            return 'https://saiyansreturn.com/images/characters/Dende/avatar.png'
        case 'Bulma':
            return 'https://saiyansreturn.com/images/characters/Bulma/avatar.png'  
    }
}

const convertTimestamp = (timestamp) => {
    // Multiplica por 1000 para converter de segundos para milissegundos
    const date = new Date(timestamp * 1000);
    
    // Extrai partes da data
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();
    
    // Extrai partes do horário
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');    
    
    // Retorna a data formatada como string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const makeLevelUpCard = (character) => {
    // console.log('makecarac', character)
    if (character.log_type == 'newDeath') {
        const card = new EmbedBuilder()
            .setColor(setPvpColor(character.pvp_type))
            .setTitle(`${character.name} - ${character.level}`)
            .setURL(`https://saiyansreturn.com/profile/${character.id}?server=Universe%20Beerus`)
            .setDescription(`${setClass(character.vocation.name)} - ${character.vocation.name}`)
            .setThumbnail(setTumb(character.vocation.name))
            .addFields(
                { name: 'Died now', value: `${convertTimestamp(character.deaths.deaths[0].time)} 
                                                by ${character.deaths.deaths[0].killed_by} 
                                                    ${character.deaths.deaths[0].killed_by != character.deaths.deaths[0].mostdamage_by 
                                                        ? 'and ' + character.deaths.deaths[0].mostdamage_by 
                                                        : ''}`}
            ) 
        return card                        
    } else {
        const card = new EmbedBuilder()
            .setColor(setPvpColor(character.pvp_type))
            .setTitle(`${character.name}`)
            .setURL(`https://saiyansreturn.com/profile/${character.id}?server=Universe%20Beerus`)
            .setDescription(`${setClass(character.vocation.name)} - ${character.vocation.name}`)
            .setThumbnail(setTumb(character.vocation.name))
            .addFields(		                                
                { name: '\u200B', value: '\u200B' },
                { name: 'Level UP!', value: `${character.former_level} > ${character.level}`}
            ) 
        
            return card                        
    }
}

const setPvpColor = (pvpType) => {
    switch (pvpType) {
        case 'Ally':
            return 0x77c479
        case 'Enemy':
            return 0xee5e52
        default:
            return 0x66b7f1        
    }
}

module.exports = {
    setClass,
    setTumb,
    convertTimestamp,
    setPvpColor,
    makeLevelUpCard
}