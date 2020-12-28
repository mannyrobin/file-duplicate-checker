var md5File = require('md5-file');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const isFile = source => lstatSync(source).isFile()
const isDirectory = source => lstatSync(source).isDirectory()

const getFileDirList = source =>
    readdirSync(source).map(name => join(source, name))
const filterFiles = fileDirList =>
  fileDirList.filter(isFile)
const filterDirectories = fileDirList =>
  fileDirList.filter(isDirectory)

let shaDuplication = {}

const buildDuplicationDirectory = rootPath => {
    const fileDirs = getFileDirList(rootPath)
    const files = filterFiles(fileDirs)
    const directories = filterDirectories(fileDirs)

    files.forEach(file => {
        const checksum = md5File.sync(file)
        if (!shaDuplication[checksum])
            shaDuplication[checksum] = [file]
        else
            shaDuplication[checksum].push(file)
    })

    directories.forEach(directory => {
        buildDuplicationDirectory(directory)
    })
}

readLine.question('Input the directory path: ', rootPath => {
    console.log("loading...");
    buildDuplicationDirectory(rootPath)
    Object.keys(shaDuplication).forEach(key => {
        if (shaDuplication[key].length > 1) {
            console.log(shaDuplication[key])
        }
    })
    readLine.close()
})