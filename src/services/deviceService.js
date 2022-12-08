import db from '../models/index'

const updateDevice = (inputData)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
            if (!inputData ||!inputData.id ){
                resolve({
                    errCode:1,
                    message: "Missing required parameter"
                })
            }else {
                let device = await db.Device.findOne({
                    where:{id:inputData.id},
                    raw:false
                })
                if(device){
                    device.deviceName = inputData.devicename;
                    device.typeDevice = inputData.typedevice;
                    await device.save();
                    resolve({
                        errCode:0,
                        message:`Update the device succeeds`
                    })

                }else {
                    resolve({
                        errCode:1,
                        message:`device's not found!`
                    })
                }
            }
            

        } catch (error) {
            reject(error)
        }
    })
}
const getDeviceById = (id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
            if (!id){
                resolve({
                    errCode:1,
                    message: "Missing required parameter"
                })
            }else {
                let data =await db.Location.findAll({
                    where:{userId:id},
                    attributes: {
                        exclude:['createdAt','updatedAt']
                    },
                    include:[
                        {model: db.Device, }
                    ],
                    raw: true,
                    nest:true
                })
                resolve({
                    errCode:0,
                    data:data,
                })
            }
            

        } catch (error) {
            reject(error)
        }
    })
}
let checkDevice = (deviceName,locationID)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let device =await db.Device.findOne({
                where:{locationID:locationID,deviceName:deviceName},
                attributes: {
                    exclude:['createdAt','updatedAt']
                },
                raw: true,
            })
            if(device) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let createNewDevice =(data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(data.mode==='available'){
                console.log('available');
                let check = await checkDevice(data.deviceName,data.locationID);
                if(check){
                    resolve({
                        errCode:1,
                        message:'The device already exists in this location. Please try again'
                    })
                }else {
                    let device = await db.Device.create({
                        deviceName:data.deviceName,
                        typeDevice:data.deviceType,
                        locationID:data.locationID,
                        userId:data.userId,
                    })
                    resolve({
                        errCode:0,
                        message:'successfully added device'
                    })
                }
            }
            else if(data.mode==='new') 
            {
                console.log('new');
                let checkLocation = await db.Location.findOne({
                    where:{
                        location:data.location,
                        userId:data.userId,
                        }
                })
                if(checkLocation){
                    let device = await db.Device.create({
                    deviceName:data.deviceName,
                    typeDevice:data.deviceType,
                    locationID:checkLocation.id,
                    userId:data.userId,
                    })
                    resolve({
                        errCode:0,
                        message:`device has been added to available location ${checkLocation.location} successfully`
                    })
                }else {
                    let location = await db.Location.create({
                        location:data.location,
                        userId:data.userId,
                    })
                    let device = await db.Device.create({
                        deviceName:data.deviceName,
                        typeDevice:data.deviceType,
                        locationID:location.id,
                        userId:data.userId,
                        })
                    resolve({
                        errCode:0,
                        message:`device has been added to new location ${location.location} successfully`
                    })
                }
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
const getLocation = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
            if (!userId){
                resolve({
                    errCode:1,
                    message: "Missing required parameter"
                })
            }else {
                let data =await db.Location.findAll({
                    where:{userId:userId},
                    attributes: {
                        exclude:['createdAt','updatedAt','userId']
                    },
                })
                resolve({
                    errCode:0,
                    data:data,
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
let deleteDevice =(deviceId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let device = await db.Device.findOne({
                where:{id:deviceId}
            })
            if(!device){
                resolve({
                    errCode:2,
                    message:`The device isn't exist`
                })
            }
            await db.Device.destroy({
                where:{id:deviceId}
            });
            resolve({
                errCode:0,
                message:`The device is deleted`
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getStatusDevice = (inputData)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if (!inputData){
                resolve({
                    errCode:1,
                    message: "Missing required parameter"
                })
            }else {
                let data =await db.statusDevice.findAll({
                    where:{
                        userId:inputData.userId,
                        locationID:inputData.locationID
                    },
                    attributes: {
                        exclude:['createdAt','updatedAt']
                    },
                })
                resolve({
                    errCode:0,
                    data
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

let createNewStatusDevice =(inputData) =>{
    return new Promise(async(resolve,reject)=>{
        try {
                let check =await db.statusDevice.findOne({
                    where:{
                        deviceId:+inputData.deviceId,
                        locationID:+inputData.locationID,
                        userId:+inputData.userId,
                        status:inputData.status,
                        date:inputData.date,
                        stateEndTime:'00:00:00',
                    },
                    raw:false,
                })
                if(check){
                    
                    check.stateEndTime = inputData.time;
                    await check.save();
                    resolve({
                        errCode:0,
                        message:'update status end time successful'
                    })
                }else {
                    let statusDevice = await db.statusDevice.create({
                        deviceId:+inputData.deviceId,
                        locationID:+inputData.locationID,
                        userId:+inputData.userId,
                        status:inputData.status,
                        stateStartTime:inputData.time,
                        date:inputData.date,
                        stateEndTime:'00:00:00',
                    })
                    resolve({
                        errCode:0,
                        message:'Status value update successful'
                    })
                }
            } 
         catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    getDeviceById:getDeviceById,
    updateDevice:updateDevice,
    createNewDevice:createNewDevice,
    getLocation:getLocation,
    deleteDevice:deleteDevice,
    getStatusDevice:getStatusDevice,  
    createNewStatusDevice:createNewStatusDevice
}