export default (el, binding) => {
  el.innerHTML = el.innerHTML.replace(binding.value.rgExp, binding.value.replaceText)
}
