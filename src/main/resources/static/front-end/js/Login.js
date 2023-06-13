const container = document.querySelector(" #login-container ");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginbtn = document.getElementById("login");
//點擊註冊
registerLink.addEventListener("click", () => {
	container.classList.add("active");
});
//點擊登入
loginLink.addEventListener("click", () => {
	container.classList.remove("active");
});
//點擊"登入/註冊" 跳出登入小視窗
function loginin(e) {
	e.preventDefault();
	container.classList.add("active-popup");
}
loginbtn.addEventListener("click", loginin);

//關閉登入小視窗
const closeIcon = document.querySelector(".close-icon");
closeIcon.addEventListener("click", (e) => {
	container.classList.remove("active-popup");
});

// 取得按鈕
const login33 = document.querySelectorAll(".main-btn")[0];
//按下login
login33.addEventListener("click", function(e) {
	
	let memberEmail = $("#email").val();
	let memberPassword = $("#password").val();

	console.log(memberEmail);
	console.log(memberPassword);

	$.ajax({
		type: "POST",
		url: "/login",
		data: {
			email: memberEmail,
			password: memberPassword,
		},
		success: function(response) {
			console.log(response);
			if(!response){
				Swal.fire({
					icon: "error",
					title: "登入失敗",
					text: "查無此帳號",
					showConfirmButton: false,
					timer: 1500,
				});
			}
			else{
				Swal.fire({
					icon: "success",
					title: "登入成功",
					text: "查無此帳號",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		},error: function(xhr) {
			console.log(xhr.responseText);
		},
	});
	// 獲得cookie=============================================================================================

	//取得值 (幫他加一個id應該更好取得)
	const valid = {
		account: email,
		password: password,
	};
	// const valid = {
	//   account: document.querySelector("#email").value,
	//   password: document.querySelector("#password").value,
	// };

	//先暫存
	sessionStorage.setItem("test-login", JSON.stringify(valid));
	loginbtn.innerHTML = ` <i class="fa-regular fa-lightbulb" style="color: #dcdfe5;"></i>`;
console.log("btn ok");
});
	// 獲得cookie=============================================================================================

// 取得註冊按鈕=====================================================
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
function validatePassword(password) {
	const goodPassword = /^.{8,}$/;
	return goodPassword.test(password);
}
const register_btn = $(".register").find(".main-btn");
register_btn.on("click", (e) => {
	e.preventDefault();
	container.classList.remove("active-popup");
	let memberEmail = $("#register_email").val();
	let memberPassword = $("#register_password").val();
	let memberAccount = $("#register_account").val();
	if (!validateEmail(memberEmail)) {
		Swal.fire({
			icon: "error",
			title: "註冊失敗",
			text: "請輸入有效的電子郵件地址",
			showConfirmButton: false,
			timer: 1500,
		});
		return;
	}
	if (!validatePassword(memberPassword)) {
		Swal.fire({
			icon: "error",
			title: "註冊失敗",
			text: "密碼至少需要 8 個字元",
			showConfirmButton: false,
			timer: 1500,
		});
		return;
	}
	if (memberAccount.trim() === "") {
		Swal.fire({
			icon: "error",
			title: "註冊失敗",
			text: "請輸入有效的使用者名稱",
			showConfirmButton: false,
			timer: 1500,
		});
		return;
	}
	$.ajax({
		type: "POST",
		url: "/register",
		data: {
			account: memberAccount,
			email: memberEmail,
			password: memberPassword,
		},
		success: function(response) {
			console.log(response);
			if (response) {
				// 儲存成功動畫
				Swal.fire({
					icon: "success",
					title: "註冊成功",
					showConfirmButton: false,
					timer: 1500,
				});
				// 清空欄位
				$("#register_email").val("");
				$("#register_password").val("");
				$("#register_account").val("");

			} else {
				Swal.fire({
					icon: "error",
					title: "註冊失敗",
					text: "該電子郵件已經被註冊過",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		},
		// 當請求失敗時，將錯誤訊息印出到console中
		error: function(xhr) {
			console.log(xhr.responseText);
		},
	});
});
// 取得註冊按鈕=====================================================

window.addEventListener("load", function() {
	const valid = JSON.parse(sessionStorage.getItem("test-login"));
	if (valid) {
		document.querySelector(
			"#login"
		).innerHTML = ` <i class="fa-regular fa-lightbulb" style="color: #dcdfe5;"></i>`;

		loginbtn.addEventListener("click", function(e) {
			if (valid) {
				e.preventDefault;
				container.classList.remove("active-popup");
				loginbtn.removeEventListener("click", loginin);
				document.querySelector(".member").classList.toggle("-on");
			}
		});
	}
});

//=======================================================
// 右上導覽列訂單管理
$("#order_li").on("mouseover", function() {
	$(".order_list").addClass("-on");
	$(".order_content").addClass("-on");
});
$("#order_li").on("mouseout", function() {
	$(".order_list").removeClass("-on");
	$(".order_content").removeClass("-on");
});
//=======================================================
// 左列會員訂單管理

$("#order_li2").on("mouseover", function() {
	$("#order_list2, #order_content1, #order_content2").addClass("-on");
});
$("#order_li2").on("mouseout", function() {
	$("#order_list2, #order_content1, #order_content2").removeClass("-on");
});

//登出
const logout_li = document.querySelector("#logout_li");

$(logout_li).on("click", function(e) {
	e.preventDefault();

	$.ajax({
		url: "/logout",
		method: "GET",
		success: function(response) {
			if (response) {
				console.log("成功登出")
				document.querySelector("#login").innerHTML = ` 登入/註冊`;
				document.querySelector(".member").classList.toggle("-on");
				sessionStorage.clear();
				window.location.assign("index.html");
			}
		},
		error: function(xhr) {
			console.log("失敗");
		},

	})
});
