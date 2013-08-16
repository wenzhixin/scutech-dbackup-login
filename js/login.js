/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
$(function() {
	var WAIT_TIME = 800;

	function main() {
		var $iframe = $('#lhgfrm_lhgdgId').contents();
		if ($iframe.length > 0) {
			$('#trialRadio', $iframe).click();
			triggerClick($('#continue', $iframe));
		}
		
		var $form1 = $('#form1');
		if ($form1.length > 0) {
			chrome.extension.sendRequest({method: "getUser"}, function(response) {
				if (response.user) {
					$('#UserNameID', $form1).val(response.user.username);
					$('#PWID', $form1).val(response.user.password);
					triggerClick($('#LoginButton', $form1));
				}
			});
		}
	}
	
	// fix: trigger link click
	function triggerClick($el) {
		var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
		$el.get(0).dispatchEvent(evt);
	}
	
	chrome.extension.sendRequest({method: "getAutoLogin"}, function(response) {
		if (response.result) setTimeout(main, WAIT_TIME);
	});
	
});