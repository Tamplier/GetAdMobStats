var urlRegex = /^http:\/\/www\.appodeal\.com\/admin\/admob_accounts\/\d*/;
var base_url = 'https://www.googleapis.com/adsense/v1.4/accounts/{account_id}/reports?startDate={start_date}&endDate={end_date}&access_token={access_token}&useTimezoneReporting=false&currency=USD&alt=csv';

function showContentOnPopup(domContent) {
    //console.log('I received the following DOM content:\n' + domContent.acc_id);
	$('#user_id').val(domContent.acc_id);
	$('#access_token').val(domContent.access_token);
}

document.addEventListener('DOMContentLoaded', function() {
  $('#start_date').pickmeup({
		position		: 'top',
		format  : 'Y-m-d',
		hide_on_select	: true
	});
	$('#stop_date').pickmeup({
		position		: 'top',
		format  : 'Y-m-d',
		hide_on_select	: true
	});
	$('.chosen-select').chosen();
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if (urlRegex.test(tabs[0].url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tabs[0].id, {text: 'get_admob_info'}, showContentOnPopup);
    }
	});
	$('#filters').change(function(){
		$('.hidden').hide();
		var filters = $(this).val();
		if(filters != null)
		{
			filters.forEach(function(item, i){
				$('.'+item).show();
			});
		}
	});
	$('#get_report').click(function(){
		var userId = $('#user_id').val();
		var accToken = $('#access_token').val();
		var startDate = $('#start_date').val();
		var endDate = $('#stop_date').val();
		
		var dimensions = [];
		$('#dimensions option:selected').each(function(){ dimensions.push($(this).val()); });
		dimensions = "&dimension=" + dimensions.join("&dimension=");
		
		var metrics = [];
		$('#metrics option:selected').each(function(){ metrics.push($(this).val()); });
		metrics = "&metric=" + metrics.join("&metric=");
		
		var filters = [];
		$('#filters option:selected').each(function(){ 
			var fname = $(this).val();
			var fval = $('#'+fname).val();
			fval = fval.split(',');
			var filter = '';
			fval.forEach(function(item, i){
				fval[i] = fname + '%3D@' + item.trim();
			});
			filters.push(fval.join(',')); 
			
		});
		if(filters.length != 0)
			filters = "&filter=" + filters.join("&filter=");
		else
			filters = '';
		
		var url = base_url.replace(/{account_id}/, userId);
		url = url.replace(/{access_token}/, accToken);
		url = url.replace(/{start_date}/, startDate);
		url = url.replace(/{end_date}/, endDate);
		url = url + dimensions + metrics + filters;
		window.open(url);
	});
});
