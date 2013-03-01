/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
$(function() {
	var WAIT_TIME = 500;

	function main() {
		var $iframe = $('#lhgfrm_lhgdgId').contents();
		if ($iframe.length > 0) {
			$('#trialRadio', $iframe).click();
			$('#continue', $iframe).click();
		}
		
		var $form1 = $('#form1');
		if ($form1.length > 0) {
			chrome.extension.sendRequest({method: "getUser"}, function(response) {
				if (response.user) {
					$('#UserNameID', $form1).val(response.user.username);
					$('#PWID', $form1).val(response.user.password);
					$('#LoginButton', $form1).click();
				}
			});
		}
	}
	
	chrome.extension.sendRequest({method: "getAutoLogin"}, function(response) {
		if (response.result) setTimeout(main, WAIT_TIME);
	});
});