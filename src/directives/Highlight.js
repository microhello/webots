export default (el, { value: { text, keywords } }) => {
  let rgExp = keywords.split(/[+,]/g)
  for (let item of rgExp) {
    text = text.replace(new RegExp(item, 'g'), $ => `<mark>${$}</mark>`)
  }
  el.innerHTML = text
}
