(async function() {
    const colors = require('colors');    
    
    const cinDataMap = {
        id: 'yId',
        y_theater_id: 'id'
    }

    const mDataMap = {
        movie_id: 'id',
        title_ch: 'titleCh',
        title_en: 'titleEn',
        poster_url: 'img',
        poster_url_l: 'imgLarge',
        midas_rating: 'midasRating',
        midas_expecting: 'midasRating',
        release_date: 'releaseDate'
    }

    const tDataMap = {}

    const mapData = (data, maptable) => {
        const returnData = {}
        Object.keys(data).forEach((key) => {
            const _key = maptable[key] || key
            returnData[_key] = data[key]
        })
        return returnData
    }

    //*********** part of cin ***********
    const cinModel = require('./database/cin')
    const cinData = require('./temp/data/all-cin.json');
    let completedCinData = cinData.map(_cin => mapData(_cin, cinDataMap))   
    completedCinData = completedCinData.filter( _cin => _cin.id)
    let i =0;
    try{
        for(;i< completedCinData.length; i++){
            await cinModel.create(completedCinData[i])
        }
    } catch(err){
        console.error(colors.red('*_*_*_*_ *_*_*_*_ Error in cinDB*_*_*_*_ *_*_*_*_ '))
        console.error(colors.red(err))
    }
    console.log(colors.green('finished writting Cin data to DB ...'))

    //*********** part of movie ***********
    const mModel = require('./database/movie')
    const mData = require('./temp/data/all-movie.json');
    const completedMData = mData.map(_m => mapData(_m, mDataMap)) 
    try{
        for(let i =0 ;i< completedMData.length; i++){            
            await mModel.create(completedMData[i])
        }
    } catch(err){
        console.error(colors.red('*_*_*_*_ *_*_*_*_ Error in movieDB*_*_*_*_ *_*_*_*_ '))        
        console.error(colors.red(err))
    }
    console.log(colors.green('DB: finished writting Movie data to DB ...'))
    
    
    //*********** part of time ***********
    const {timeStringToDate} = require('./lib/time')
    const tModel = require('./database/time')
    const tData = require('./temp/data/all-time.json');
    let completedTData = tData.map(_t => mapData(_t, tDataMap)) 
    completedTData = completedTData.map( _t => {
        const tlStr = _t.timeList.slice(0)
        const tl = tlStr.map( __t => timeStringToDate(__t))
        _t.timeStrList = tlStr
        _t.timeList = tl
        return _t
    })
    try{
        for(let i =0 ;i< completedTData.length; i++){                        
            await tModel.create(completedTData[i])
        }
    } catch(err){
        console.error(colors.red('*_*_*_*_ *_*_*_*_ Error in movieDB*_*_*_*_ *_*_*_*_ '))        
        console.error(colors.red(err))
    }
    console.log(colors.green('DB:  finished writting time data to DB ...'))
    
    console.log(colors.green('done'))
    process.exit()    
}());    