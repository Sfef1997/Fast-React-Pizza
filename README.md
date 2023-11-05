
# Pizza Ordering System

A web application for ordering pizzas online.

## Table of Contents

- [Introduction](#introduction)
- [Components](#components)
  - [Cart](#cart)
  - [CartItem](#cartitem)
  - [CartOverview](#cartoverview)
  - [Menu](#menu)
  - [CreateOrder](#createorder)
  - [Order](#order)
  - [OrderItem](#orderitem)
  - [SearchOrder](#searchorder)
  - [UpdateOrder](#updateorder)
  - [CreateUser](#createuser)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Briefly describe the project and its purpose.

## Components

### Cart

The Cart component displays the user's selected pizzas, allowing them to view, update quantities, and remove items from the cart.



### CartItem

The CartItem component represents a single pizza item in the cart, displaying its name, quantity, and total price. Users can also update or remove items using this component.


### CartOverview

The CartOverview component provides an overview of the items in the cart, including the total number of pizzas and the total price. Users can click on it to navigate to the cart page.

### Menu

The Menu component displays a list of available pizzas for users to choose from. It fetches the menu data and maps it to individual MenuItem components.

### CreateOrder

The CreateOrder component allows users to create a new order. It collects user details, address, phone number, and order priority information before placing the order.


### Order

The Order component displays details of a specific order, including order number, status, items, prices, and estimated delivery time. Users can also update priority status for the order.

### OrderItem

The OrderItem component displays a single item within an order, showing its name, quantity, total price, and ingredients.

### SearchOrder

The SearchOrder component allows users to search for a specific order by entering the order number. It provides a search input and navigates to the corresponding order page.


### UpdateOrder

The UpdateOrder component allows updating the priority status of an order. It provides a button to mark the order as a priority, indicating special treatment.


### CreateUser

The CreateUser component prompts users to enter their name to start using the pizza ordering system. It updates the user's name in the Redux store.


## Usage

Describe how to set up and run the project locally.

## Contributing

Provide information on how others can contribute to the development of the project.

## License

Specify the project's license information.
