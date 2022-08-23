const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const urlencoders = bodyparser.urlencoded();



app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

var users = new Array();



app.post("/users", urlencoders, function (req, res) {
    var user_id = req.body.id;
    var user_name = req.body.name;
    var num = req.body.number;
    var upt = req.body.upd;
    var user = { id: user_id, name: user_name, number: num };

    var list = new Array();
    if (upt === "1") {
        if (users.length > 0) {
            users.forEach(function (info) {


                if (info.id == user_id) {
                    user = { id: info.id, name: user_name, number: num };
                    list.push(user);
                } else {
                    user = { id: info.id, name: info.name, number: info.number };
                    list.push(user);
                }
            });
            users = list;
            res.send("<br><br><center><h4 class='bg-danger text-white'> User Updated, Refresh page please ! </h4><center>");
            
        }
    } else {
        if (ress = users.find(({ id }) => id === user_id)) {
            res.send("Never use replicated ID's");
            res.end();
        } else {
            users.push(user);
            res.send("<h4 class='bg-primary text-white p-4'>User Added,  Refresh page please !</h4>");
            res.end();
        }
    }

    
});

app.get("/users", (re, rs) => {
    rs.render("users.html", { dataa: users });
});


app.listen(3001);