function cmd(self){
	var bodyset = document.querySelector('body');
	if(self.value==='terminal'){
		self.value='browser';
		bodyset.style.backgroundColor = '#383A3F';
		bodyset.style.color = '#E0E3DA';
		// bodyset.style.color='#00FF00';

		document.getElementById('tip').style.borderColor='#aaa';

		var box=document.getElementById('primitive');
		box.style.backgroundColor='rgb(56, 58, 63)';
		box.style.borderColor='#fff';
		box.style.color='#fff';
	}else{
		self.value='terminal';
		bodyset.style.backgroundColor = '#fff';
		bodyset.style.color = '#000';

		document.getElementById('tip').style.borderColor='#000';

		var box=document.getElementById('primitive');
		box.style.backgroundColor='#fff';
		box.style.borderColor='#000';
		box.style.color='#000';
	}
}


function exchange(){
	var primitive = document.getElementById("primitive").value;
	//공백이 있는지 확인해본다.
	if (primitive.indexOf(' ')!==-1) {
		return alert('띄어쓰기 하지 마세요.');
	}
//입력한 값이 숫자인지 확인해본다.
// if(isNaN(primitive*1)){
// 	return alert('숫자만 입력하세요.');
// }
//첫문자 인식관련 조건문
// if (isNaN(primitive[0]*1)) {
// 	return alert('첫글자는 숫자로만 입력하세요.');
// }

	//환산부분
	var unit = ['십','백','천','만','억','조'];
	var zero = ['0','00','000','0000','00000000','000000000000'];
	for(var i=0; i<unit.length;i++){
		var unitIndex = primitive.indexOf(unit[i]);
		if (unitIndex!==-1) {
			if (unitIndex===0) {
				//단위문자의 맨앞이라면 1+0으로 변환
				primitive = primitive.replace(unit[i], '1'+zero[i]);
			}else if(unitIndex===primitive.length-1){
				//단위문자가 맨뒤라면 전부 0으로 변환
				primitive = primitive.replace(unit[i], zero[i]);
			}else if(isNaN(primitive[unitIndex+1]*1)){
				//단위문자의 뒤가 문자라면 전부 0으로 변환
				primitive = primitive.replace(unit[i],zero[i]);
			}else{
				//뒤가 숫자라면 삭제
				primitive = primitive.replace(unit[i],'');
			}
		}
	}
	//한화로 전환
	var object = Math.round(primitive*1063.82979);

	//0을 한화 단위로 바꾸기-source make-
	var compile = object.toString().split('').reverse();
	var unit_h = ['','십','백','천','만','십만','백만','천만','억','십억','백억','천억','조','십조','백조','천조'];
	var divert = ['원'];
	for(var i=0; i<compile.length;i++){
		if(compile[i]!==undefined){
			if(i!==0){
				if(compile[i]==='1'){
					if(i===8 || i===12){
						divert.push(compile[i]+unit_h[i]);
					}else{
						divert.push(unit_h[i]);
					}
				}else if(compile[i]!=='0'){
					divert.push(compile[i]+unit_h[i]);
				}
			}else{
				if(compile[i]!=='0'){
					divert.push(compile[i]);
				}
			}
		}
	}
	//중복단위제거(만,억)
	var prepare = divert.reverse().join('').split('').reverse();
	var complite = [];
	for(var i=0; i<prepare.length; i++){
		if(complite.indexOf(prepare[i])===-1){
			complite.push(prepare[i]);
		}else{
			if(prepare[i]!=='만' && prepare[i]!=='억' && prepare[i]!=='조'){
				complite.push(prepare[i]);
			}
		}
	}
	var exe = complite.reverse().join('');
	
	//결과보여주기

	//다른문자 사용 여부
	var chrome = primitive.split('');
	var index_string = chrome.indexOf(unit[i]);
	if(index_string !== -1){
		for(var i=0; i<unit.length; i++){
			chrome.splice(index_string,1);
		}	
	}
	var firefox = chrome.join('');
	if(isNaN(firefox*1)){
		return alert('이상한 문자가 섞여 있습니다.');
	}
	//단위제한
	if(object.length>16){
		return alert('조단위를 넘는 금액입니다.');
	}
	
	//결과 출력
	document.getElementById('print').innerHTML = exe;
	
}
