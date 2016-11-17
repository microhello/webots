export default (el, { value }) => {
  let keywords = value.split(/[+,]/g)
  for (let item of keywords) {
    el.innerHTML = el.innerHTML.replace(new RegExp(item, 'g'), `<mark>${item}</mark>`)
  }
}
