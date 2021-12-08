// node中内置的一个函数,将非promise函数转成promise函数
const { promisify } = require('util')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')

const { commandSpawn } = require('../utils/terminal')
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

module.exports = {
  createProjectAction,
}
