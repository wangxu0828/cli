const ejs = require('ejs')

const fs = require('fs')
const path = require('path')

const compile = (templateName, data) => {
  // ejs.renderFile()
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    // { data }在ejs里面拿的直接是对象里面的值,我们在ejs里面用的是data.name,所以应该在data外面再套一层对象
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject()
        return
      }

      resolve(result)
    })
  })
}

// sourse/components/category
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在,如果不存在,创建对应的文件夹
  return fs.promises.writeFile(path, content)
}

module.exports = { compile, writeToFile, createDirSync }
