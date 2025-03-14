(function () {
  const WAIT_TIME = 800

  const triggerClick = el => {
    if (!el) {
      return
    }
    el.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: false
    }))
  }

  const triggerInput = (el, value) => {
    if (!el) {
      return
    }
    el.value = value
    el.dispatchEvent(new Event('input', {
      bubbles: true,
      cancelable: true
    }))
  }

  function main(user) {
    // 新版
    let form = document.querySelector('.form-signin')
    let username = form?.querySelector('#txt_username')
    let password = form?.querySelector('#txt_password')
    let submit = form?.querySelector('.btn-primary')

    // 旧版
    if (!form) {
      const iframe = document.querySelector('#lhgfrm_lhgdgId')
      const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.querySelector('#trialRadio')?.click()
        triggerClick(iframeDoc.querySelector('#continue'))
      }

      form = document.querySelector('#form1')
      username = form?.querySelector('#UserNameID')
      password = form?.querySelector('#PWID')
      submit = form?.querySelector('#LoginButton')
    }

    // element login
    if (!form) {
      form = document.querySelector('.login form.el-form')
      username = form?.querySelector('input[type="text"].el-input__inner')
      password = form?.querySelector('input[type="password"].el-input__inner')
      submit = form?.querySelector('.el-button--primary')
    }

    if (!form) {
      return
    }

    triggerInput(username, user.username)
    triggerInput(password, user.password)
    triggerClick(submit)
  }

  window.chrome.storage.local.get(['data']).then(res => {
    const user = JSON.parse(res.data || '[]').find(it => it.checked)

    if (user) {
      setTimeout(() => {
        main(user)
      }, WAIT_TIME)
    }
  })
})()
