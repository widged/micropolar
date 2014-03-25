$(function(){
	var $target = $('#drop-zone');

  var template = function() {/*
	<div class="row">
		<h3>{{title}}</h3>
		<div class="span4">
			<div class="dropzone1 drop-zone">
				Drop first image
			</div>
		</div>
		<div class="span4">
			<div class="dropzone2 drop-zone">
				Drop second image
			</div>
		</div>
		<div class="span4">
			<div class="image-diff drop-zone">
				Diff will appear here.
			</div>
			<div class="diff-results" style="display:none;">
				<p>
					<strong>The second image is <span class="mismatch"></span>% different compared to the first.
					<span class="differentdimensions" style="display:none;">And they have different dimensions.</span></strong>
				</p>
			</div>
			
			<p class="thesame" style="display:none;">
				<strong>These images are the same!</strong>
			</p>
		</div>
	</div>
	*/}.toString().match(/[\s\S]*\/\*([\s\S]*)\*\/[\s\S]*/)[1];


/*
	var buttons = $('#raw, #colors, #antialising');

	buttons.click(function(){
		var $this = $(this);

		buttons.removeClass('active');
		$this.addClass('active');

		if($this.is('#raw')){
			resembleControl.ignoreNothing();
		}
		else
		if($this.is('#colors')){
			resembleControl.ignoreColors();
		}
		else
		if($this.is('#antialising')){
			resembleControl.ignoreAntialiasing();
		}
	});
*/

	(function(){
		var images = "equationLine,dots,barChart,cardinalPie,clock,monthPie,monthArea,monthFlower,microphone,nightingale,bands".split(",");
		images.forEach(function(img, i) {
			var tpl = template.replace('{{title}}', img);
			document.querySelector("#diffs").innerHTML += tpl;
			diff(img, i+1);
		});



	}());

	function diff(img, i) {
		var file1 = '../img_ref/' + img + '.png';
		var file2 = '../img_shot/' + img + '.png';

		var xhr = new XMLHttpRequest();
		var xhr2 = new XMLHttpRequest();
		var done = $.Deferred();
		var dtwo = $.Deferred();

		var $node = $('#diffs .row:nth-child(' + i +')');

		xhr.open('GET', file1, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			done.resolve(this.response);
		};
		xhr.send();

		xhr2.open('GET', file2, true);
		xhr2.responseType = 'blob';
		xhr2.onload = function(e) {
			dtwo.resolve(this.response);
		};
		xhr2.send();

		$node.find('.dropzone1').html('<img src="' + file1 + '"/>');
		$node.find('.dropzone2').html('<img src="' + file2 + '"/>');


		$.when(done, dtwo).done(function(file, file1){
			resembleControl = resemble(file).compareTo(file1).onComplete(onComplete);
		});

		function onComplete(data){
			var $node = $('#diffs .row:nth-child(' + i +')');
			var time = Date.now();
			var diffImage = new Image();
			diffImage.src = data.getImageDataUrl();

			$node.find('.image-diff').html(diffImage);

			$(diffImage).click(function(){
				window.open(diffImage.src, '_blank');
			});

			$node.find('#buttons').show();

			if(data.misMatchPercentage == 0){
				$node.find('.thesame').show();
				$node.find('.diff-results').hide();
			} else {
				$node.find('.mismatch').text(data.misMatchPercentage);
				if(!data.isSameDimensions){
					$node.find('.differentdimensions').show();
				} else {
					$node.find('.differentdimensions').hide();
				}
				$node.find('.diff-results').show();
				$node.find('.thesame').hide();
			}
		}
		return false;
	}

});