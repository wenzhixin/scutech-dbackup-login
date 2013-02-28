/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-02-28
 */
$(function() {
	var $autoLogin = $('#autoLogin'),
		$table = $('#table'),
		$addButton = $('#addButton'),
		$removeButton = $('#removeButton'),
		$alert = $('#alert'),
		
		ALERT_TIME = 3000;
	
	function main() {
		addEvents();
		initList();
		initView(Storage.getAutoLogin());
	}
	
	function initView(checked) {
		$autoLogin.attr('checked', checked);
		$table[checked ? 'removeClass' : 'addClass']('disabled');
		$('input', $table).attr('disabled', !checked);
		$('.btn-group button').attr('disabled', !checked);
	}
	
	function addEvents() {
		$autoLogin.click(function() {
			var checked = $(this).attr('checked') ? true : false;
			Storage.setAutoLogin(checked);
			initView(checked);
		});
		$addButton.click(function() {
			addItem();
			saveList();
		});
		$removeButton.click(function() {
			var $radio = $('input[name="selectedRadio"]:checked');
			if ($radio.length === 0) {
				$alert.show();
				setTimeout(function() {
					$alert.hide();
				}, ALERT_TIME);
				return;
			}
			$radio.parents('tr').remove();
			saveList();
		});
		$alert.find('button').click(function() {
			$alert.hide();
		});
		$(document).on('blur', 'input[name="username"]', saveList);
		$(document).on('blur', 'input[name="password"]', saveList);
		$(document).on('click', 'input[name="selectedRadio"]', function() {
			var $tr = $(this).parents('tr');
			Storage.setUser({
				username: $tr.find('input[name="username"]').val(),
				password: $tr.find('input[name="password"]').val()
			});
		});
	}
	
	function initList() {
		var list = Storage.getList(),
			user = Storage.getUser();
		for (var i = 0; i < list.length; i++) {
			addItem(list[i], list[i].username === user.username 
				&& list[i].password === user.password);
		}
	}
	
	function saveList() {
		var list = [];
		$table.find('tbody tr').each(function() {
			var user = {
				username: $(this).find('input[name="username"]').val(),
				password: $(this).find('input[name="password"]').val()
			}
			if (user.username && user.password) {
				list.push(user);
			}
		});
		Storage.setList(list);
	}
	
	function addItem(user, checked) {
		var username = user && user.username || '',
			password = user && user.password || '';
			tr = '<tr>' +
		           '<td>' + 
		           '<input type="radio" name="selectedRadio" ' + 
		           	 (checked ? 'checked="checked"' : '') + ' /></td>' +
		           '<td><input type="text" name="username" class="input-small" ' + 
		           	 'placeholder="用户名" value="' + username + '" /></td>' +
		           '<td><input type="text" name="password" class="input-small" ' + 
		           	 'placeholder="用户名" value="' + password + '" /></td>' +
		        '</tr>';
		$table.find('tbody').append(tr);
	}
	
	main();
});
