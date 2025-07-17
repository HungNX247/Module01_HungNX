let a = prompt("Nhap gia tri a:");
let b = prompt("Nhap gia tri b:");

a = parseInt(a);
b = parseInt(b);

if (b == 0) {
  alert("Không thể kiểm tra vì b là 0.");
} else if (a % b == 0) {
  alert(a + " là bội số của " + b + ".");
} else {
  alert(a + " không phải là bội số của " + b + ".");
}
