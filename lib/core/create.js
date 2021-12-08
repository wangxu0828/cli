const { createProjectAction } = require('./action')

const createCommands = (program) => {
  program
    .command('create <project> [others...]')
    .description('clone a repository a folder')
    .action((project) => {
      createProjectAction(project)
    })

  program
    .command('addcpn <name>')
    .description('clone a repository a folder')
    .action((project) => {
      createProjectAction(project)
    })
}

module.exports = createCommands
