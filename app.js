	showData();
	


// ================= Adding video and title in local storage  ===============
document.getElementById("click").addEventListener("click",
	function (e) {
		var title = document.getElementById("title");
		var str = document.getElementById("link");
		if (str.value.includes("youtube")) {
			var a = str.value.replace("watch?v=", "embed/");
		} else if (str.value.includes("dailymotion")) {
			var a = str.value.replace(".com/", ".com/embed/");
		}  else if (str.value.includes("vimeo")) {
			var a = str.value.replace("https://vimeo.com", "https://player.vimeo.com/video");
        } else if(str.value.includes('youtu')){
			var a = str.value.replace('https://youtu.be','https://www.youtube.com/embed')
		}
		


		let videos = localStorage.getItem("videos");

		if (title.value === "" || str.value == "") {
			alert('please enter link and title')
		}else if(!str.value.startsWith('https' ))
		{
			alert('invalid link')
		}
		

		else {
			if (videos == null) {
				videosObj = [];
			}
			else {
				videosObj = JSON.parse(videos)
			}
			let myObj = {
				title:title.value,
				a
			}
			videosObj.push(myObj);
			localStorage.setItem("videos", JSON.stringify(videosObj));

		}
		str.value = "";
		title.value = "";
		showData();
		e.preventDefault();
	});

//   ==================function for adding html dynamically=========================

function showData() {
	let videos = localStorage.getItem('videos');
	if (videos === null) {
		videosObj = [];
	}
	else {
		videosObj = JSON.parse(videos)
	}
	let html = "";
	videosObj.forEach(function (element, index) {
		html += `
      <div class="content-body">
      <button
        onclick='changeUrl("${element.a}")'
      >
        <i class="fas fa-play"></i>
      </button>
      <h2 class="vidtitle">${element.title}</h2>
      <button onClick="deleteVideo(${index})"><i class="fas fa-trash" ></i></button>
    </div>
      `;
	});
	let allvideos = document.querySelector('.content-container');
	if (videosObj !== 0) {
		allvideos.innerHTML = html;
	}
}

// ==============Delete videos from playlist=================
function deleteVideo(index) {
	let videos = localStorage.getItem('videos');
	if (videos === null) {
		videosObj = [];
	}
	else {
		videosObj = JSON.parse(videos)
	}
	let r = confirm('are you sure you want to delete this?')
	if (r == true) {
		videosObj.splice(index, 1)
		localStorage.setItem("videos", JSON.stringify(videosObj))
	}
	showData();
}



// ========================== video Modal ========================
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

function changeUrl(source) {
	modal_container.classList.add('show')
	document.getElementById('vid').src = source;
}
close.addEventListener('click', () => {
	modal_container.classList.remove('show')
	var myScope = document.querySelector('.modal');
	var iframes = myScope.getElementsByTagName("iframe");
	if (iframes != null) {
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].src = iframes[i].src;
		}
	}
})

// ====================== Toggle Mode =====================
 var toggle = document.getElementById('toggleMode').addEventListener('click',function (){
	if(document.getElementById('toggleMode').innerText==="Enable Dark Mode"){
	document.querySelector('.header').style.backgroundColor = 'black'
	document.querySelector('.header').style.borderBottom = '1px solid white'
	document.body.style.backgroundColor = 'black'
	document.querySelectorAll('.content-body').forEach(item=>{

		item.style.borderBottom = '1px solid white'
		item.style.color = 'white'
	})
	document.getElementById('toggleMode').innerText = "Enable Light Mode"
}
else if (document.getElementById('toggleMode').innerText === "Enable Light Mode"){
	document.querySelector('.header').style.backgroundColor = 'lightgray'
	document.querySelector('.header').style.borderBottom = 'none'
	document.body.style.backgroundColor = 'white'
	document.querySelectorAll('.content-body').forEach(item=>{

		item.style.borderBottom = '1px solid black'
		item.style.color = 'black'
	})
	document.getElementById('toggleMode').innerText = "Enable Dark Mode"
}
})