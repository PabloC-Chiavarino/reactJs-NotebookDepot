# NotebookDepot
e-commerce proyect built on ReactJs 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Notebook-depot is a spa application for buying notebooks.

## Features

It is connected to the firestore service provided by firebase and has a functional shopping cart that allows different operations when making a purchase or selection. It also has a login system to be able to save a list of desired products and store the purchase orders made.

## Installation

- $ git clone https://github.com/PabloC-Chiavarino/NotebookDepot/
- $ cd ../path/to/the/file
- $ npm i vite
- $ npm run dev

or

Download the code, install NPM open it in VSC code and run the command "npm run dev" in VSC terminal to deploy at local host on your computer.

## Usage

On the home page you will find the featured products. At the top, in the navigation bar, you will be able to choose between the available categories. Within each one of them there will be a list of navigable products towards a detail where there is the option to add to the shopping cart according to the desired quantity.
Also, in the navigation bar, you will find the login option (or perform a user registration) to access the functionality of adding products to a wish list, a widget that displays a slider to preview and modify the content of the cart in real time, as well as the navigability to go to the view of the shopping cart. Once the desired products have been selected, and going to the shopping cart, you will need to complete a form to register the buyer's data. If the purchase is successful, you will obtain the data referring to said purchase order.

## Technologies/Dependencies Used

* Firebase: ^9.21.0
* React: ^18.2.0
* React-dom: ^18.2.0
* React-router-dom: ^6.10.0
* React-toastify: ^9.1.3
* Sweetalert2: ^11.7.5
 
## Contributing

If you have any questions, problems or bugs, as well as ideas to improve the operation of the app, please send me a feedback to pchiavarino89@gmail.com.

## License

MIT License - For more information look at the LICENSE.md file.
