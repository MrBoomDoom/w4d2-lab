const house = require('./db.json')
let globalID = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(house)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params;
        let index = house.findIndex((elem) => elem.id === +id)
        house.splice(index, 1)
        res.status(200).send(house)
    },
    createHouse: (req, res) => {
        const {address, cost, imageURL} = req.body;

        let newHouse = {
            address,
            cost: cost,
            imageURL,
            id: globalID
        }

        house.push(newHouse);
        globalID++
        res.status(200).send(house)
    },
    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = house.findIndex(elem => +elem.id === +id)

        if(house[index].price <= 10000 && type === 'minus'){
            house[index].price = 0
            res.status(200).send(house)
        } else if(type === 'plus'){
            house[index].price += 10000
            res.status(200).send(house)
        } else if(type === 'minus'){
            house[index].price -= 10000
            res.status(200).send(house)
        } else {
            res.status(400).send('Too far!')
        }
    }
}