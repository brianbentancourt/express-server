const fs = require('fs') //file system

function getKeysFromOptions(options){
 const { settings, _locals, ...objectKeys} = options
 return Object.keys(objectKeys)
}

function getRendererContent(content, options){
    const keys = getKeysFromOptions(options)
    let contentString = content.toString()

    for(let key of keys){
        contentString = contentString.replace(new RegExp(`\{${key}\}`, "gi"), options[key])
    }
    return contentString
}

function expressJSX(filePath, options, callback){
    fs.readFile(filePath, (err, content)=>{

        if(err){
            return callback(err)
        }

        const rendered = getRendererContent(content, options)

        return callback(null, rendered)
    })
}

module.exports = expressJSX