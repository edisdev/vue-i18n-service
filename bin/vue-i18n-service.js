#!/usr/bin/env node
const glob = require('glob')
const fs = require('fs')
const myjson = require('myjson-api')
const compiler = require('vue-template-compiler')

function replaceBetween (str, start, end, what) {
  return str.substring(0, start) + what + str.substring(end)
}

function readData (imported) {
  const data = JSON.parse(imported)
  Object.keys(data).forEach(file => {
    const sfcContent = fs.readFileSync(file).toString()
    const componentAst = compiler.parseComponent(sfcContent)
    componentAst.customBlocks.forEach(i18n => {
      console.log(`updating file ${file}`)
      fs.writeFileSync(
        file,
        replaceBetween(sfcContent, i18n.start, i18n.end, `\n${JSON.stringify(data[file], null, 2)}\n`)
      )
    })
  })
}

function runImport () {
  process.stdin.setEncoding('utf8')

  let importData = ''
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk !== null) {
      importData += chunk
    }
  })

  process.stdin.on('end', () => {
    readData(importData)
  })
}

function runExport (fn) {
  glob('{src,components,pages}/**/*.vue', (_, files) => {
    const out = {}
    files.forEach(file => {
      const componentAst = compiler.parseComponent(fs.readFileSync(file).toString())
      componentAst.customBlocks
        .filter(block => block.type === 'i18n')
        .forEach(block => {
          out[file] = JSON.parse(block.content)
        })
    })
    fn ? fn(out) : console.log(JSON.stringify(out, null, 2))
  })
}

switch (process.argv[2]) {
  case 'import':
    runImport()
    break
  case 'export':
    runExport()
    break
  case 'translate':
    runExport((out) => {
      myjson.create(out)
      .then((response) => {
        console.log(`Open the following URL to start translation:`)
        console.log('')
        console.log(`   https://f.github.io/vue-i18n-translator/#${response.id}`)
      })
    })
    break
  default:
    console.log('vue-i18n-services v' + require('../package.json').version)
    console.log('commands:')
    console.log('   vue-i18n-services export > translations.json')
    console.log('     Collects all the <i18n> tags in SCF .vue files and exports them in a file\n')
    console.log('   vue-i18n-services import < translations.json')
    console.log('     Distributes all the changes on translations.json file to the related components\n')
    console.log('   vue-i18n-services translate')
    console.log('     Opens translation page to translate your UI.\n')
}
