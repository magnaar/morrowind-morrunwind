const exec = require('child_process').execFile
const Fs = require('fs')
const Path = require('path')
const morrunwindExe = 'morrunwind.exe'
const morrowindLauncherExe = 'Morrowind Launcher.exe'

main()

function main()
{
    if (! Fs.existsSync(morrowindLauncherExe))
    {
        console.error(`${morrowindLauncherExe} not found`)
        process.exit(-1)
    }
    checkLauncher()
}

function checkLauncher()
{
    Fs.readFile(morrowindLauncherExe, (err, content) => {
        if (err)
        {
            console.error(err)
            process.exit(-1)
        }
        const config = loadConfig()
        if (! isLauncherPatched(content))
            patchLauncher(content)
        else
            launchChildren(config)
    })
}

function patchLauncher(content)
{
    const index = content.indexOf('Morrowind.exe')
    if (index == -1)
    {
        console.error(`Can't patch ${morrowindLauncherExe}`)
        process.exit(-1)
    }
    Fs.renameSync(morrowindLauncherExe, 'Morrowind Launcher.Original.exe')
    Buffer.from(morrunwindExe).copy(content, index)
    Fs.writeFile(morrowindLauncherExe, content, (err) => {
        if (err)
        {
            console.error(err)
            process.exit(-1)
        }
        console.log(`${morrowindLauncherExe} patched !!!`)
    })
}

function isLauncherPatched(launcherContent)
{
    return launcherContent.indexOf('morrunwind.exe') != -1
}

function loadConfig()
{
    const configPath = './morrunwind.json'
    if (! Fs.existsSync(configPath))
        Fs.writeFileSync(configPath, JSON.stringify({}))
    const config = JSON.parse(Fs.readFileSync(configPath))
    config["Morrowind"] = []
    return config
}

function launchChildren(config)
{
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
}

function killThemAll(children)
{
    children
        .filter(c => c.exitCode === null)
        .forEach(c => c.kill())
}
