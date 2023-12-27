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

function writeFile(filePath: string, content: string) {
    console.log("command: " + `write to file ${filePath}`)
    fs.writeFileSync(filePath, content)
}

function appendFile(filePath: string, content: string) {
    console.log("command: " + `append to file ${filePath}`)
    fs.appendFileSync(filePath, content)
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
    // "node_modules/.prisma/**/*"
    run("npm install")
    rm("./node_modules/.prisma")
    run("npm run prisma_generate")
    run("npm start")
    run("tsc --build --clean")
}

build()
