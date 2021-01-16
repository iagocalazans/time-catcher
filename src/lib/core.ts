import { RequestHandler } from 'express'
import chalk from 'chalk'
import os from 'os'
import { PerformanceObserver, performance } from 'perf_hooks'

const log = console.log
const cpu = os.cpus()
const usage = process.memoryUsage().heapUsed / 1024 / 1024
const rss = process.memoryUsage().rss / 1024 / 1024

const obs = new PerformanceObserver(items => {
  const gcs = items.getEntriesByType('gc')
  const http = items.getEntriesByType('http')

  const value = http[http.length - 1]

  if (value) {
    log(`\n\n ------ ${chalk.bgYellow(chalk.black(' HTTP SERVER INFO '))} ------ \n`)
    log(`[${chalk.yellow('CPU')}] ${cpu.length}x ${cpu[0]?.model}`)
    log(`[${chalk.yellow('RAM')}] ${Math.round(usage * 100) / 100} MB`)
    log(`[${chalk.yellow('RSS')}] ${Math.round(rss * 100) / 100} MB`)
    log(`\n\n ------ ${chalk.bgYellow(chalk.black(' EVENT LOOP INFO '))} ------ \n ${chalk.gray('< These values take into account all the time since the server was started >')} \n`)
    log(`[${chalk.green('% TIME')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - ${Math.floor(performance.eventLoopUtilization().utilization * 100)}%`)
    log(`[${chalk.green('TOTAL USE')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - ${Math.floor(performance.eventLoopUtilization().active)}ms`)
    log(`\n\n ------ ${chalk.bgYellow(chalk.black(' REQUEST PROCESS INFO '))} ------ \n`)
    log(`[${chalk.green('DURATION')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - ${Math.floor(value.duration)}ms`)
    log(`\n\n[${chalk.red('CLOSE')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - Request Process Ended \n\n`)
  }

  gcs.map((gc) => {
    if (gc.flags !== 0) {
      log(`\n ------ ${chalk.bgYellow(chalk.black(' GARBAGE COLLECT INFO '))} ------ \n`)
      log(`[${chalk.green('DURATION')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - ${Math.floor(gc.duration)}ms`)
      log(`[${chalk.green('FLAGS')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - ${gc.flags}`)
    }
    return gc
  })

  if (http.length > 10) {
    obs.disconnect()
    log(chalk.green('Reconnecting Observer'))
  }
})

let init = false

const timeCatcher: RequestHandler = (req, res, next): void => {
  if (!init) {
    req.destroy()
    init = true
  }

  log(`[${chalk.cyan('START')}] ${chalk.gray(`${new Date().toLocaleString()}`)} - Request Process Start \n`)
  obs.observe({ entryTypes: ['http', 'gc'], buffered: true })
  return next()
}

export default timeCatcher
