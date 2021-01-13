import { RequestHandler } from 'express'
import chalk from 'chalk'
import os from 'os'

const timeCatcher: RequestHandler = (req, res, next): void => {
  const time = Date.now()
  const init = new Date().toLocaleString()
  const log = console.log
  const cpu = os.cpus()
  const usage = process.memoryUsage().heapUsed / 1024 / 1024
  const rss = process.memoryUsage().rss / 1024 / 1024

  req.on('end', () => {
    log(`[${chalk.cyan('START')}] ${chalk.gray(`${init}`)} - Request Process Start \n`)
    log(`[${chalk.yellow('CPU')}] ${cpu.length}x ${cpu.shift()?.model}`)
    log(`[${chalk.yellow('RAM')}] ${Math.round(usage * 100) / 100} MB`)
    log(`[${chalk.yellow('RSS')}] ${Math.round(rss * 100) / 100} MB`)
    log(`\n[${chalk.green('INFO')}]: ${chalk.gray(`${new Date().toLocaleString()}`)} - Request took ${chalk.underline(`${Date.now() - time}ms`)} till ended on process.pid ${chalk.yellow(`${process.pid}`)} \n`)
    log(`[${chalk.red('CLOSE')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - Request Process Ended`)
  })

  return next()
}

export default timeCatcher
