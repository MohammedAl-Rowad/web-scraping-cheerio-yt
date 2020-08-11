const { load } = require('cheerio')
const fetch = require('node-fetch')
const { writeFileSync } = require('fs')
const { generate } = require('shortid')
const DOMScrapperComposer = require('./Composer')

const init = async () => {
  const url = 'https://www.infinitysymbol.net/'
  const htmlStr = await (await fetch(url)).text()
  const $ = load(htmlStr)
  writeFileSync(`./htmls/${generate()}-${Date.now()}.html`, $.html())
  const composer = new DOMScrapperComposer($)
  const json = composer.domToJSON()
  writeFileSync(
    `./jsons/${generate()}-${Date.now()}.json`,
    JSON.stringify(json, null, 2)
  )
  console.log(composer.sel('div').toArray().length)
  console.log($('#myTooltip').html())
}

init()
