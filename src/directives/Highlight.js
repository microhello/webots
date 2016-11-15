export default (el, binding) => {
  el.innerHTML = el.innerHTML.replace(new RegExp(binding.value, 'g'), `<mark>${binding.value}</mark>`)
}
