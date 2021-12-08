/**
 * 执行终端相关的代码
 */

const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childprocess = spawn(...args)
    childprocess.stdout.pipe(process.stdout)
    childprocess.stderr.pipe(process.stderr)
    childprocess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn,
}
