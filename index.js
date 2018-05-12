const exec = require('child_process').execFile
const Fs = require('fs')
const Path = require('path')
const config = JSON.parse(Fs.readFileSync('./morrunwind.json'))

const killThemAll
    = (children) => children
        .filter(c => c.exitCode === null)
        .forEach(c => c.kill())

const children = Object.entries(config)
    .map(([path, args]) => {
            console.log(path)
            return exec(path + '.exe', args, (error, stdout, stderr) => {
                console.log(stdout)
                if (error)
                {
                    console.error(stderr)
                    killThemAll(children)
                }
            })
        })
    .map(c => {
        c.on('close', (code, signal) => killThemAll(children))
        c.on('exit', (code, signal) => killThemAll(children))
        return c
    })