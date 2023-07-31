# Windows Calculator (React)

## Description

This is a Windows-like calculator built using React. It imitates the functionality of the Windows calculator with six distinct steps or states:

1. **Add First Input**: The user can enter the first input number.
2. **Add Function to Input**: The user can select a mathematical function to perform on the first input. The supported functions are:
   - Square Root (Press 'r' or click the √ button)
   - Square (Press 'p' or click the x^2 button)
   - Percentage (Press 'q' or click the % button)
   - Negate (Press 'n' or click the +/- button)
   - Divide 1 by Number (Press 'u' or click the 1/x button)
3. **Add Operand**: The user can select a mathematical operand (+, -, ÷, x) to perform with the first input.
4. **Add Second Input**: The user can enter the second input number.
5. **Add Function to 2nd Input**: The user can select another mathematical function to perform on the second input.
6. **Get Result and Error State**: The user can calculate the result, and an error state will be displayed if applicable.

## Features

- Supports basic arithmetic operations: addition, subtraction, multiplication, and division.
- Additional mathematical functions: square root, square, percentage, negate, and divide 1 by number.
- Keyboard support: Use your keyboard to input numbers and perform calculations.
- Usage flexibility: Users can perform operations in any order and skip steps if desired.
- Clear button to reset the calculator to its initial state.
- CE button to clear the current input.
- Backspace button to erase the last input.
- History: The calculator keeps a record of previous calculations.
- Error handling for cases like division by zero.
- Responsive design for various screen sizes.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project folder.
3. Install dependencies using npm or yarn:

```bash
npm install
# or
yarn install
Run the development server:
bash
Copy code
npm start
# or
yarn start
Open your web browser and navigate to http://localhost:3000 to access the calculator.
Usage
You can use your keyboard to enter numbers and perform calculations:
'0' to '9' are numbers.
't' for sum (addition).
'p' for square (x^2).
'r' for square root (√).
'c' to clear the calculator.
'/' for divide.
'x' for multiply.
'e' for CE (clear the current input).
Backspace to erase the last input.
'-' for subtraction.
'n' for negate (change the sign of the input).
Alternatively, you can use the calculator buttons with your mouse.
There's no strict order to follow the steps; you may skip them as you would with a usual calculator.
The calculator keeps a history of previous calculations, allowing you to review them.
```

## Future Enhancements

Support more advanced mathematical functions and scientific calculations.
Add a memory feature to store and recall previous calculations.
Improve the UI to better resemble the Windows calculator.

## Contributing

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.
