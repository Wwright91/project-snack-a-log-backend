const confirmHealth = (snack) => {
const {added_sugar, fiber, protein} = snack
   
if(added_sugar >5 ){
    return false
} else{
    if(protein > 5 || fiber >5){
        return true
    } else {
        return false
    }
}
  
};
//unhealthy
//Sugar is more than 5 Protein is less than 5 and Fiber is less than 5

module.exports = confirmHealth;
