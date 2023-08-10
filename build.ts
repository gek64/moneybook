import {exec, ExecException, execSync} from "child_process"
import * as fs from "fs"

function runPromise(command: string) {
    return new Promise((resolve: (stdout: string) => void, reject: (error: ExecException | string) => void) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            if (stderr) {
                reject(stderr)
                return
            }
            resolve(stdout)
        })
    })
}


function run(command: string) {
    console.log("command: " + command)
    const result = execSync(command)
    console.log(result.toString("utf8"))
}

function mkdir(dir: string) {
    console.log("command: " + `make dir ${dir}`)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true})
    }
}

function rm(path: string) {
    console.log("command: " + `remove ${path}`)
    if (fs.existsSync(path)) {
        fs.rmSync(path, {recursive: true, force: true})
    }
}


function build() {
    run("npm install")
    mkdir("dist")
    run("prisma generate --generator client-native")
    run("tsc")

    rm("./node_modules/.prisma")
    run("prisma generate --generator client-windows")
    run("pkg -t latest-windows-x64 --compress Gzip package.json -o dist/moneybook-windows-amd64.exe")

    rm("./node_modules/.prisma")
    run("prisma generate --generator client-macos")
    run("pkg -t latest-macos-x64 --compress Gzip package.json -o dist/moneybook-macos-amd64")

    rm("./node_modules/.prisma")
    run("prisma generate --generator client-linux")
    run("pkg -t latest-linux-x64 --compress Gzip package.json -o dist/moneybook-linux-amd64")

    run("tsc --build --clean")
}

build()