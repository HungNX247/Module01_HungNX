const display = document.getElementById("display");
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false; // true nếu người dùng đã nhập toán tử và đang chờ số thứ hai

// Cập nhật hiển thị màn hình
function updateDisplay() {
  display.textContent = calculator.displayValue;
}

// Khởi tạo trạng thái máy tính
const calculatorState = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// Xử lý khi nhấn nút số
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculatorState;

  if (waitingForSecondOperand === true) {
    calculatorState.displayValue = digit;
    calculatorState.waitingForSecondOperand = false;
  } else {
    // Nếu displayValue là '0', thay thế nó bằng số mới; nếu không, nối số mới vào
    calculatorState.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

// Xử lý khi nhấn nút thập phân (tùy chọn)
function inputDecimal(dot) {
  // Ngăn ngừa nhiều dấu thập phân trong một số
  if (!calculatorState.displayValue.includes(dot)) {
    calculatorState.displayValue += dot;
  }
}

// Xử lý khi nhấn nút toán tử
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculatorState;
  const inputValue = parseFloat(displayValue);

  // Nếu đã có toán tử và đang chờ số thứ hai, chỉ cần cập nhật toán tử mới
  if (operator && calculatorState.waitingForSecondOperand) {
    calculatorState.operator = nextOperator;
    return;
  }

  // Nếu firstOperand là null, gán giá trị hiện tại cho nó
  if (firstOperand === null) {
    calculatorState.firstOperand = inputValue;
  } else if (operator) {
    // Nếu đã có firstOperand và toán tử, thực hiện phép tính
    const result = performCalculation[operator](firstOperand, inputValue);

    calculatorState.displayValue = String(result);
    calculatorState.firstOperand = result;
  }

  calculatorState.waitingForSecondOperand = true;
  calculatorState.operator = nextOperator;
}

// Các hàm tính toán cơ bản
const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand, // Toán tử '=' sẽ được xử lý riêng
};

// Xử lý nút Clear
function resetCalculator() {
  calculatorState.displayValue = "0";
  calculatorState.firstOperand = null;
  calculatorState.waitingForSecondOperand = false;
  calculatorState.operator = null;
}

// Lắng nghe sự kiện click trên các nút
keys.addEventListener("click", (event) => {
  const { target } = event; // Lấy phần tử được click

  // Kiểm tra xem phần tử được click có phải là nút không
  if (!target.matches("button")) {
    return; // Nếu không phải nút, bỏ qua
  }

  if (target.classList.contains("key-operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-number")) {
    inputDigit(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-equal")) {
    // Khi nhấn '=', thực hiện phép tính cuối cùng
    handleOperator(target.value); // Gọi handleOperator với '=' để hoàn tất phép tính
    updateDisplay();
    return;
  }

  // Nếu bạn muốn thêm nút thập phân (.), uncomment và thêm nút có class 'key-decimal'
  // if (target.classList.contains('key-decimal')) {
  //     inputDecimal(target.value);
  //     updateDisplay();
  //     return;
  // }
});

// Cập nhật màn hình lần đầu khi tải trang
updateDisplay();
