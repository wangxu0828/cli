const helpOptions = (program) => {
  // 增加自己的options
  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如: -d /src/component'
  )

  program.option('-f --framework <framework>', 'your framework')

  program.option('-w --why', 'a why cli')
  program.on('--help', () => {
    console.log('')
    console.log('other:')
    console.log(' other options~')
  })
}

module.exports = helpOptions
