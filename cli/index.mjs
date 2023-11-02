#! /usr/bin/env node
import { exec, fork, spawn } from 'child_process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

async function run() {
  const argv = await yargs(hideBin(process.argv)).argv
  let isPrivate = false
  let isBuild = false
  let currentIndex = 0
  let widget = undefined

  if (['build', 'b'].includes(argv._[0])) {
    isBuild = true
    currentIndex += 1
  }

  if (['private', 'p'].includes(argv._[currentIndex])) {
    isPrivate = true
    currentIndex += 1
  }

  if (['widget', 'w'].includes(argv._[currentIndex])) {
    widget = argv._[currentIndex + 1]
    if (!widget) {
      console.error('Error: Missing widget name!')
      return
    }
  }

  if (widget && isPrivate) widget = `${widget}/private`

  exec(createCommand(isBuild, widget), (error, stdout) => {
    console.error(stdout)
  })
}

function createCommand(isBuild, widget) {
  if (isBuild)
    return widget
      ? `tsc && vite build --mode ${widget}`
      : 'npm install && tsc && vite build'

  return widget ? `vite --mode ${widget}` : 'vite'
}

run()
