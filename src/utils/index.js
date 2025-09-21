export default {
  createInput (val, { name, disabled }) {
    if (disabled) {
      return val
    }
    return `<input
      class="form-control form-control-sm"
      value="${val}"
      name="${name}"
    >`
  },

  createLink (action, { value, icon }) {
    const text = icon ? `<i class="bi ${icon}"></i>` : value

    return `<a class="${action} mr10" href="#">${text}</a>`
  },

  setStorage(value, key = 'data') {
    if (chrome?.storage?.local) {
      return chrome.storage.local.set({ [key]: JSON.stringify(value) })
    }
    localStorage[key] = JSON.stringify(value)
  },

  async getStorage(key = 'data') {
    if (chrome?.storage?.local) {
      const res = await chrome.storage.local.get([key])

      return res[key] && JSON.parse(res[key])
    }
    return localStorage[key] && JSON.parse(localStorage[key])
  }
}
