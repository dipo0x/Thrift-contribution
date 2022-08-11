# Esusu-Confam-Ltd

I went on a personal hackathon and built a monthly contribution (Esusu) 😅 API in less than 24 hours but I didn't add any payment gateway with NodeJS, Express JS, Mongoose, Bcryptjs and Passport JS

A group would be created then folks join. When you Join the group, y'll be given a random number between 1 - 12 then once 12 people have joined, the contribution kicks off and people who join after would be assigned numbers subsequently (13, 14, 15)

A group could be searchable, so I can tell someone else to join the group and it could also be hidden. Then it has maximum capacity. The group also has a fixed amount

Then once you join, y'll begin to pay your contribution so once you hit the total amount you ought to pay, y'll be given your money
Building this within 24 hours wasn't easy and I might not have written the best codes but you can learn a little bit of Node and Express JS from it.

# Installation
To install all the dependencies, type ```npm install``` in the root directory

# Usage
To register, go to the (domain)/register route and you can use this
  ```
  {
    "username": "a",
    "password": "dipo",
    "email": "adesiyan@gmail.com"
  }
  ```
to register and remove the email to login in the /login route

# Getting Started

Head over to the /group route and create a group with this

```{
    "name": "Esusu1",
    "amount": "200",
    "description": "For the big boys",
    "maximum_capacity": 30,
    "searchable": "true",
    "is_active": "Yes"
}
```

<img width="1440" alt="Screenshot 2022-02-15 at 3 00 22 PM" src="https://user-images.githubusercontent.com/63419117/154077057-f62dcc60-e75d-4a16-b33f-a06c0e47706e.png">

To join a group, e.g "Esusu1" group
Go to '/group/join/Esusu1' to join the group 


To pay your contribution to a group, use the post method and go to 
'/group/Esusu1/pay' route to pay

<img width="1440" alt="Screenshot 2022-02-15 at 3 05 05 PM" src="https://user-images.githubusercontent.com/63419117/154077847-558ce69c-b1ad-41cc-b0a7-b7b878a52505.png">

