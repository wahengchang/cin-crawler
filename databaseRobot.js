(async function() {
    const colors = require('colors');    
    const cinData = require('./temp/data/all-cin.json');
    const cinModel = require('./database/cin')
    
    const cinDataMap = {
        id: 'yId',
        y_theater_id: 'id'
    }

    const mapData = (data, maptable) => {
        const returnData = {}
        Object.keys(data).forEach((key) => {
            const _key = maptable[key] || key
            returnData[_key] = data[key]
        })
        return returnData
    }

    const completedCinData = cinData.map(_cin => mapData(_cin, cinDataMap))    

    for(let i =0 ;i< completedCinData.length; i++){
        await cinModel.create(completedCinData[i])
    }


    console.log(colors.green('done'))
    process.exit()    
}());    