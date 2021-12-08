// node中内置的一个函数,将非promise函数转成promise函数
const { promisify } = require('util')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')

const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')
const path = require('path')
// callback => promisify(函数) -> promise -> async
const createProjectAction = async (project) => {
  console.log('why help you create your project~')
  // 1.clone项目
  await download(vueRepo, project, { clone: true })

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  console.log(command)
  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  // 3. 运行npm run serve
  // 因为运行npm run serve的话子进程不会结束,所以不会resolve()
  // 只有用ctrl+c或者关掉cmd进程才会关闭
  // 因此不用await 因为会有热更新
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4. 打开浏览器
  // 这个是写死的,但是可以在wabpack中配置就不用做这个了
  // 要是有一个程序运行的话就不行了
  open('http://localhost:8080')
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.有对应的ejs模板

  // 2.编译ejs模板result
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  // 3.将result写入到.vue文件中
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
  // 4.放到对应的文件夹中
}

// 添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // 1.编译ejs模板result
  const pageResult = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  const routeResult = await compile('vue-router.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  if (createDirSync(dest)) {
    // 3.写入文件
    const targetPagePath = path.resolve(dest, `${name}.vue`)
    const targetRoutePath = path.resolve(dest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

// 添加store的
const addStoreAndType = async (name, dest) => {
  // 1.有对应的ejs模板

  // 2.编译ejs模板result
  const storeResult = await compile('vue-store.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  const typesResult = await compile('vuex-types.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  // 3.将result写入到.vue文件中
  // 4.放到对应的文件夹中
  if (createDirSync(dest)) {
    // 3.写入文件
    const targetStorePath = path.resolve(dest, `${name}.js`)
    const targetTypesPath = path.resolve(dest, 'type.js')
    writeToFile(targetStorePath, storeResult)
    writeToFile(targetTypesPath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAndType,
}
