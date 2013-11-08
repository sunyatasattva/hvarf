(function(window, document, $, undefined){
	
	window.Hvarf = (function(){
		return {
			currentHvarf: {},
			zeroPoint: {
				date: new Date(1383939843352),
				sun:  64,
				moon: 4
			},
			hoursDifference: function(from, to){
				return Math.ceil( ( (to - from)/1000)/3600 );
			},
			getHvarfFor: function(date){
				var diff = Hvarf.hoursDifference(Hvarf.zeroPoint.date, date);
				return {
					date: date,
					sun:  Hvarf.zeroPoint.sun  + Math.ceil(diff / 120),
					moon: Hvarf.zeroPoint.moon + Math.ceil(diff / 16)
				};
			},
			getHvarfFromCalendar: function(){
				var selectedDate = new Date( $('#date').val() );
				
				Hvarf.currentHvarf = Hvarf.getHvarfFor(selectedDate);
			},
			adjustHvarfFor: function(hvarf){
				$('#sun .position')
				.removeClass('current')
				.eq(hvarf.sun)
				.addClass('current');
				
				$('#moon .position')
				.removeClass('current')
				.eq(hvarf.moon)
				.addClass('current');
			}
		}
	}())
	
	jQuery(document).ready(function($) {
		$('#date').on('change', function(){
			Hvarf.getHvarfFromCalendar();
			Hvarf.adjustHvarfFor(Hvarf.currentHvarf);
		})
	});
	
})(window, document, jQuery);