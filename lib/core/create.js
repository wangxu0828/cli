const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAndType,
} = require('./action')

const createCommands = (program) => {
  program
    .command('create <project> [others...]')
    .description('clone a repository a folder')
    .action((project) => {
      createProjectAction(project)
    })

  program
    .command('addcpn <name>')
    .description(
      'add vue component, 例如: why addcpn HelloWorld [-d src/component]'
    )
    .action((name) => {
      addComponentAction(name, program._optionValues.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description(
      'add vue component, 例如: why addpage HelloWorld [-d src/pages]'
    )
    .action((page) => {
      addPageAndRoute(page, program._optionValues.dest || `src/pages/${page}`)
    })

  program
    .command('addstore <store>')
    .description('add vue store, 例如: why addstore HelloWorld [-d src/store]')
    .action((store) => {
      addStoreAndType(
        store,
        program._optionValues.dest || `src/store/modules/${store}`
      )
    })
}

module.exports = createCommands
