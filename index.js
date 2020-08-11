const { load } = require('cheerio')
const fetch = require('node-fetch')
const { writeFileSync } = require('fs')
const { generate } = require('shortid')

const init = async () => {
  const url = 'https://www.infinitysymbol.net'
  const htmlStr = await (await fetch(url)).text()
  const $ = load(htmlStr)
  console.log($.html())
  writeFileSync(`./htmls/${generate()}-${Date.now()}.html`, $.html())
}

init()
