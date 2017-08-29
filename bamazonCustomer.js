var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,


  user: "root",

  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  showItems();
  startBamazon();
});

function showItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " Product: " + res[i].product_name + " Price: $" + res[i].price);
    }
    console.log("-----------------------------------");
  });
}


function startBamazon() {
connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push("ID: " + results[i].item_id);
            }
            return choiceArray;
          },
          message: "What is the ID of the product you would like to buy?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many items would you like to buy?",
          validate: function(value) {
          	if (isNaN(value) === false) {
            	return true;
          	}
          	return false;
          }
        }
      ])
      .then(function(answer) {
        
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if ("ID: " + results[i].item_id === answer.choice) {
            chosenItem = results[i];
            // console.log(chosenItem);
            // console.log(chosenItem.item_id)
          }
        }
        // console.log(chosenItem.stock_quantity);


        if (parseInt(answer.amount) <= chosenItem.stock_quantity) {

        	var newAmount = chosenItem.stock_quantity - answer.amount

        	connection.query(
            	"UPDATE products SET ? WHERE ?",
            	[
              		{
                		stock_quantity: newAmount
              		},
              		{
                		item_id: chosenItem.item_id
              		}
            	],
            	function(error) {
              		if (error) throw err;
              		console.log("Order placed successfully!");
              		console.log("--------------------------");
              		console.log("Your order: " + answer.amount + " x " + chosenItem.product_name);
              		console.log("Total cost: $" + answer.amount * chosenItem.price);  
              		shopAgain();        
            	}
          	);
        } else {
        	console.log("Insufficient quantity! There are " + chosenItem.stock_quantity + " left.");
        	shopAgain();
        }


      });
  });
}

function shopAgain() {
	inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "\nWant to continue shopping?",
      default: true
    },

  ])
  .then(function(shopAgain) {
   
    if (shopAgain.confirm) {
      showItems();
      startBamazon();

    }
    else {
      console.log("\nThanks for shopping at Bamazon! Come back soon!");

    }
  });
}