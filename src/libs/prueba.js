const cron = require("node-cron");
tiempo = 0;
var task = cron.schedule('*/7 * * * * *', () => {
    console.log("Holi")
});

var interval = setInterval(function time() {
    tiempo = tiempo + 1;
    console.log(tiempo);
    if(tiempo === 14){
        //task.destroy();
    } else if(tiempo === 26){
        task = cron.schedule('*/3 * * * * *', () => {
            console.log("Adiu")
        })
    }else if(tiempo === 60) stopit();
}, 1000);

function stopit(){
    clearInterval(interval);
    task.destroy();
    console.log("Thank you :)")
}