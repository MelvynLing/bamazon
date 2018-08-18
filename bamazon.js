var mysql = require ('mysql');
var inquire = require ('inquirer')

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon"
})

connection.connect(function(err){
    if (err) throw err;
    console.log(" ---------- WELCOME TO THE BAMAZON GROCERY CORNER!!! --------- ");
    makeTable();
})

var makeTable = function (){
    connection.query("SELECT * FROM products", function(err, res){
        for(var i=0; i<res.length; i++){
            
            
            
            console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quatity+"\n");
            
        }

    promptUser(res);
    })
}


var promptUser = function(res){
    inquire.prompt([{
        type:"input",
        name:"choice",
        message: "What would you like to buy today? [Hit the Q key to exit]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i=0;i<res.length;i++){
            if(res[i].product_name==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;     
                inquire.prompt({
                    type:"input",
                    name: "quant",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else{
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quatity-answer.quant)>0){
                        connection.query("UPDATE products SET stock_quatity='"+(res[id].stockqunatity-answer.quant)+"' WHERE product_name='"+product+"'", function(err,res2){
                            console.log("Product Bought!");
                            makeTable();
                        })
                    }else{
                        console.log("Not a valid selection!");
                        promptUser(res);
                        }
                    })          
                }
            }
            if(i==res.length && correct==false){
                console.log("Not a valid selection!");
                promptCustomer(res);
            }
        })
    }
    