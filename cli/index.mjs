#! /usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { execSync } from 'child_process'

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

  execSync(createCommand(isBuild, widget))
}

function createCommand(isBuild, widget) {
  if (isBuild)
    return widget
      ? `tsc && vite build --mode ${widget}`
      : 'npm install && tsc && vite build'

  return widget ? `vite --mode ${widget}` : 'vite'
}

run()
