// Отправка заявки 
var easer = false;
var color_easer = false;
var rect = false;
var last;
var rect_first_x;
var rect_first_y;
var rect_second_x;
var rect_second_y;
var rect_move = false;
var block = document.getElementById('img_rect_batton');
block.style.background = ctx.fillStyle;
$(document).ready(function() {
	$('#color_form').submit(function () { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
		if (document.color_form.color_input.value == '') {
			valid = false;
			return valid;
		}
		const canvas = document.getElementById('canvas'),
			 ctx = canvas.getContext('2d');
		ctx.fillStyle = document.color_form.color_input.value;
		ctx.strokeStyle = document.color_form.color_input.value;
		block.style.background = document.color_form.color_input.value;
		return false;
	});
	$(".img_color_batton").click(function () {
		if (color_easer == false){
			$('.size_input').fadeOut(300);
			$('.size_button').fadeOut(300);
			$('#myfond_gris').fadeIn(300);
			$('.color_button').fadeIn(300);
			$('.color_input').fadeIn(300);
		}
		return false;
	});
	$('#myfond_gris, .color_button').click(function () {
		$('#myfond_gris').fadeOut(300);
		$('.color_button').fadeOut(300);
		$('.color_input').fadeOut(300);
	});
	$(".img_eraser_batton").click(function () {
		if (easer == true) {
			ctx.fillStyle = last;
			ctx.strokeStyle = last;
			easer = false;
			color_easer = false;
		}
		else if (easer == false && rect == false){
			$('#myfond_gris').fadeOut(300);
			$('.color_button').fadeOut(300);
			$('.color_input').fadeOut(300);
			last = ctx.fillStyle;
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';
			easer = true;
			color_easer = true;
		}
		return false;
	});
	$(".img_size_batton").click(function () {
		$('.color_button').fadeOut(300);
		$('.color_input').fadeOut(300);
		$('#myfond_gris').fadeIn(300);
		$('.size_input').fadeIn(300);
		$('.size_button').fadeIn(300);
		return false;
	});
	$('#size_form').submit(function () { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
		if (document.size_form.size_input.value == '') {
			valid = false;
			return valid;
		}
		ctx.lineWidth = document.size_form.size_input.value;
		
		return false;
	});
	$('#myfond_gris, .size_button').click(function () {
		$('#myfond_gris').fadeOut(300);
		$('.size_input').fadeOut(300);
		$('.size_button').fadeOut(300);
	});
	$('.img_rect_batton').click(function () {
		if (rect == false && easer == false){
			rect = true;
		}
		else if (rect == true){
			rect = false;
		}
		return false;
	})
	$('.img_clear_batton').click(function () {
		last = ctx.fillStyle;
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = last;
		return false
	})
	canvas.addEventListener('mousedown', function (e) {
		if (rect == true) {
			if (rect_move == false){
				rect_first_x = e.clientX - this.offsetLeft - 30;
				rect_first_y = e.clientY - this.offsetTop;
				rect_move = true;
			}
		}
	})
	canvas.addEventListener('mouseup', function () {
		if (rect == true) {
			rect_move = false;
			rect_second_x = false, rect_second_y = false;
			rect_first_x = false, rect_first_y = false;
		}
	})
	canvas.addEventListener('mousemove', function(e){
		if (rect == true) {
			if (rect_move == true){
				last = ctx.fillStyle;
				ctx.fillStyle = 'white';
				ctx.fillRect(rect_first_x, rect_first_y, rect_second_x, rect_second_y);
				ctx.fillStyle = last;
				ctx.fillRect(rect_first_x, rect_first_y, rect_second_x = e.clientX - this.offsetLeft - 30 - rect_first_x, rect_second_y = e.clientY -this.offsetTop - rect_first_y);
			}
		}
	})
});

