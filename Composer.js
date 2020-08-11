module.exports = class DOMScrapperComposer {
  constructor($) {
    this.$ = $
  }

  domToJSON() {
    const mainParents = ['head', 'body']
    return mainParents.map((name) => ({
      name,
      childrenCount: this.childrenArr(name).length,
      children: this.getChildData(this.childrenArr(name)),
    }))
  }

  childrenArr(el) {
    return this.$(el).children().toArray()
  }

  getChildData(arrOrEl) {
    return arrOrEl.map((el) => {
      const len = this.$(el).children().length
      const nodeInfo = {
        name: this.$(el).prop('tagName'),
        childrenCount: len,
      }
      if (len >= 1) {
        nodeInfo.children = [...this.getChildData(this.childrenArr(el))]
      }

      return nodeInfo
    })
  }

  sel(el) {
    return this.$(el)
  }
}
