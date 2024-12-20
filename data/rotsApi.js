const findIDPlayer = async (nickName) => {
    let player
    await fetch(`https://api.saiyansreturn.com/characters?server=Universe%20Beerus&name=${nickName}&limit=1`)
            .then(response => response.json())    
            .then(data => {
                player = data
            })
            .catch(error => console.error(error))
            
            return player
}

       
const findPlayerByID = async (playerID) => {
    let player
    await fetch(`https://api.saiyansreturn.com/profile/${playerID}?server=Universe%20Beerus`)
        .then(response => response.json())
        .then(data => {
            player = data
        })
        .catch(error => console.error(error))

        return player
}

module.exports = {
    findIDPlayer,
    findPlayerByID
    
}
