#!/usr/bin/env node
// #! shebang 当你执行某一个东西 如果找到了这个文件 根据你配置的环境来帮助执行当前这一个文件
// /usr 是/user的缩写
const program = require('commander')

const helpOptions = require('./lib/core/help')

const createCommands = require('./lib/core/create')
// 自定义版本号
program.version(require('./package.json').version)
helpOptions(program)
createCommands(program)
program.parse(process.argv)
