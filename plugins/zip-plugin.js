
const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZip()

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename)
      for (let filename in compilation.assets) {
        // console.log('compilation.assets[filename]: ', compilation.assets[filename])
        const source =  compilation.assets[filename].source()
        // console.log('source', source
        folder.file(filename, source)
      }
      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // content 是 buffer
        // console.log(content)
        const outputPath = path.join(compilation.options.output.path,
          this.options.filename + '.zip'
        )
        // 获取相对路径
        const opputRelativePath = path.relative(compilation.options.output.path, outputPath)
        console.log('outputpath', outputPath, opputRelativePath)
        // buffer 转化为 RawSource
        compilation.assets[opputRelativePath] = new RawSource(content)
        callback()
      })
    })
  }
}