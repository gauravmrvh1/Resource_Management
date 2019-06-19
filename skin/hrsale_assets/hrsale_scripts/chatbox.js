function refreshChatUsers() {
			
		  $.ajax({
			url: site_url + "chat/refresh_chat_users_msg/",
			type: 'GET',
			dataType: 'html',
			success: function(data) {
			  jQuery('#msgs_count').html(data);
						
			},
			error: function() {
			  
			}
		  });
		  $.ajax({
			url: site_url + "chat/refresh_chat_users/",
			type: 'GET',
			dataType: 'html',
			success: function(data) {
			  jQuery('#chat_users').html(data);
			  setTimeout(refreshChatUsers, 5000);
						
			},
			error: function() {
			  
			}
		  });
	}
	
	$(document).ready(function(){
	//
	$(".online-status").click(function(e){	
	
		var status_id = $(this).data('status-id');
		var status_title = $(this).data('status-title');
		var status_avatar = $(this).data('avatar-status');
		 $.ajax({
			url: site_url + "chat/change_status/?status_id="+status_id,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				jQuery('#hr_status').html(status_title);
				jQuery('.current-status').removeClass('avatar-online avatar-busy avatar-away');
				jQuery('.current-status').addClass(status_avatar);
				
			},
			error: function() {
			  alert('error');
			}
		});
	});
	
	// chatbox > single
	$('.chatbox-single').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var from_id = button.data('from-id');
		var to_id = button.data('to-id');
		var modal = $(this);
	$.ajax({
		url : base_url+"/chat_read/",
		type: "GET",
		data: 'jd=1&is_ajax=1&mode=modal&data=chat&from_id='+from_id+'&to_id='+to_id,
		success: function (response) {
			if(response) {
				$("#chat_modal").html(response);
				$("#message_content").focus();
				jQuery('.chat-app-window').animate({ scrollTop: $('.chat-app-window').prop("scrollHeight")}, 0);
			}
		}
		});
	});
	
	setTimeout(refreshChatUsers, 5000);	
	
	

});