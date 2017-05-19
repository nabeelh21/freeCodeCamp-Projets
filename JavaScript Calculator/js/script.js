$(document).ready(function(){

  //Stores the inputs from the user to calculate later
  var inputs = [];
  //String to store calculation output
  var totalString;

  //operators array for vaidation without the .
  var operators = ["+","-","/","*", "%"];

  var nums = ["0","1","2","3","4","5","6","7","8","9"];

  //cannot add two operators or "." in a row.
  //cannot add an operator if there is not a number before it.
  function getValue(input)
  {
    //If no buttons have been entered and the first one pressed is an operator, then add a 0 before it.
    if(inputs.length === 0 && operators.includes(input) === true)
    {
      inputs.push("0");
      inputs.push(input);
      update();
    }
    //If no buttons have been entered, and the first button is not an operator
    else if(inputs.length === 0 && operators.includes(input) === false)
    {
      inputs.push(input);
      totalString = inputs.join("");
      $("#output").html(totalString);
      $("#steps").html(totalString);
      update();
    }
    //cannot have two decimal points in a row
    else if(inputs[inputs.length - 1] === "." && input === ".")
    {
      inputs.push(input);
      $("#steps").html("Error");
      console.log("error");
    }
    //If the last button pressed was not an operator, then appened the input next to the previous input.
    else if(operators.includes(inputs[inputs.length-1]) === false)
    {
      inputs.push(input);
      totalString = inputs.join("");
      $("#output").html(totalString);
      $("#steps").html(totalString);
      update();
    }
    else if(nums.includes(input) )
    {
      inputs.push(input);
      totalString = inputs.join("");
      $("#output").html(totalString);
      $("#steps").html(totalString);
      update();
    }
  }


  function update()
  {
    totalString = inputs.join("");
    $("#steps").html(totalString);
    $("#output").html(totalString);
  }


  function getTotal()
  {
    try{

      if(inputs[inputs.length-1] === "%")
      {


      }
      else{
          totalString = inputs.join("");
          $("#output").html(eval(totalString));
          inputs=[eval(totalString)];
      }
    }
    catch(err){
      $("#output").html("Error");
    }

}

  $("button").on("click",function()
  {
    if(this.id === "deleteAll")
    {
      inputs=[];
      $("#output").html("0");
      $("#steps").html("0");
    }
    else if(this.id === "backOne") {
      if(inputs.length > 1) //will keep popping off the most recent inputs, as the array is not empty.
      {
        inputs.pop();
        update();
      }
      else { // otherwise display 0 in both the steps and output secrions of the calc display area.
        inputs=[];
        $("#steps").html("0");
        $("#output").html("0");
      }
    }
    else if(this.id === "total")
    {
      getTotal();
    }
    else{
      if(!operators.includes(inputs[inputs.length-1])){
        getValue(this.id);
      }
      else{
        getValue(this.id);
      }
    }
  });
});
