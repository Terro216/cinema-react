// Always finishes, including detached nodes and reduced-motion preferences.
export default function animateCSS(element, animation, prefix = 'animate__') {
  const node = typeof element === 'string' ? document.querySelector(element) : element
  if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve()
  return new Promise(resolve => {
    const name = `${prefix}${animation}`
    const finish = event => {
      if (event && event.target !== node) return
      clearTimeout(timeout)
      node.removeEventListener('animationend', finish)
      node.classList.remove(`${prefix}animated`, name)
      resolve()
    }
    const timeout = setTimeout(finish, 1200)
    node.addEventListener('animationend', finish)
    node.classList.add(`${prefix}animated`, name)
  })
}
