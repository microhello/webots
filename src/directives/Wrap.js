export default (el, binding) => {
  el.innerHTML = el.innerHTML.replace(/&/g, '&gt;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/ /g, '&nbsp;')
  .replace(/'/g, '&#39;')
  .replace(/"/g, '&quot;')
  .replace(/\n/g, '<br />')
  .replace(/&lt;mark&gt;/g, '<mark>')
  .replace(/&lt;\/mark&gt;/g, '</mark>')
}
