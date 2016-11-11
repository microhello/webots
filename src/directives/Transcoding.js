export default (el, binding) => {
  if (binding.arg === 'br') {
    el.innerHTML = el.innerHTML.replace(/\n/g, '<br />')
  }
}
