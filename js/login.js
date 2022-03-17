/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
$(function() {
    var WAIT_TIME = 800;

    function main() {
        // 新版
        var $form = $('.form-signin'),
            $username = $form.find('#txt_username'),
            $password = $form.find('#txt_password'),
            $submit = $form.find('.btn-primary');

        // 旧版
        if (!$form.length) {
            var $iframe = $('#lhgfrm_lhgdgId').contents();
            if ($iframe.length > 0) {
                $('#trialRadio', $iframe).click();
                triggerClick($('#continue', $iframe));
            }

            $form = $('#form1');
            $username = $form.find('#UserNameID');
            $password = $form.find('#PWID');
            $submit = $form.find('#LoginButton');
        }
        // element login
        if (!$form.length) {
            $form = $('.login form.el-form');
            $username = $form.find('input:text.el-input__inner');
            $password = $form.find('input:password.el-input__inner');
            $submit = $form.find('.el-button--primary');
        }
        if (!$form.length) {
            return;
        }
        chrome.extension.sendRequest({
            method: 'getUser'
        }, function(response) {
            if (response.user) {
                triggerInput($username.val(response.user.username));
                triggerInput($password.val(response.user.password));
                triggerClick($submit);
            }
        });
    }

    // fix: trigger link click
    function triggerClick($el) {
        if (!$el.length) return;
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', false, false);
        $el.get(0).dispatchEvent(evt);
    }

    function triggerInput($el) {
        if (!$el.length) return;
        var e = document.createEvent('HTMLEvents');
        e.initEvent('input', true, true);
        $el[0].dispatchEvent(e);
    }

    chrome.extension.sendRequest({
        method: 'getAutoLogin'
    }, function(response) {
        if (response.result) setTimeout(main, WAIT_TIME);
    });

});
