/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
(function () {
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        switch (request.method) {
            case "getAutoLogin":
                sendResponse({
                    result: Storage.getAutoLogin()
                });
                break;
            case "getUser":
                sendResponse({
                    user: Storage.getUser()
                });
                break;
        }
    });
})();
