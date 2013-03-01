/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
(function(window) {
	var AUTO_LOGIN = 'autoLogin',
		USER = 'user',
		LIST = 'list';
	
	window.Storage = {
		setAutoLogin: function(value) {
			set(AUTO_LOGIN, value);
		},
		getAutoLogin: function() {
			return get(AUTO_LOGIN) || false;
		},
		setUser: function(user) {
			set(USER, user);
		},
		getUser: function() {
			return get(USER) || {
				username: '',
				password: ''
			};
		},
		setList: function(list) {
			set(LIST, list);
		},
		getList: function() {
			return get(LIST) || [];
		}
	};
	
	function set(key, value) {
		localStorage[key] = JSON.stringify(value);
	}
	
	function get(key) {
		return localStorage[key] && JSON.parse(localStorage[key]);
	}
})(window);