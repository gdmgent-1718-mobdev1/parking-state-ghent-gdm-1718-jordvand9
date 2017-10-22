var newParkingArray = [];
var oldParkingArray;
// Create function with JSON callbacks
function parkingGhent() {
    getJSONByCallbacks('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json',function(data){
        console.log(data);
        //Empty the new array
        newParkingArray = [];
        var parkingElement = document.querySelector('.parking');
        var tempStr ='';
        data.forEach(function(element){
            // Fill Object Constructor with data
            var parkingArrayElement = new parking(
                element.id,
                element.description,
                element.address,
                element.parkingStatus.availableCapacity,
                element.parkingStatus.totalCapacity,
                element.parkingStatus.open,
                Math.round((element.parkingStatus.availableCapacity/element.parkingStatus.totalCapacity)*100)
            );
            // Push object to the new Array
            newParkingArray.push({parkingArrayElement});
            var open = parkingArrayElement.open;
            //Check if the old array is empty
            if(oldParkingArray != null && open===true){
                // Loop trough the length of the old array to check for a matching id in the new array
                // If a matching id is found, compare both their capacities and update their status. 
                var i = oldParkingArray.length;
                while(i--) {
                    if(parkingArrayElement.id == oldParkingArray[i].parkingArrayElement.id ) {
                        //console.log(parkingArrayElement.id + " " + oldParkingArray[i].parkingArrayElement.id);
                        var updateStatus;
                        var oldCapacity = oldParkingArray[i].parkingArrayElement.availableCapacity;
                        var newCapacity = parkingArrayElement.availableCapacity;
                        if(oldCapacity < newCapacity) {
                            updateStatus = "fa fa-arrow-up";
                        }
                        else if (oldCapacity > newCapacity) {
                            updateStatus = "fa fa-arrow-down";
                        }
                        else if (oldCapacity == newCapacity) {
                            updateStatus = "fa fa-arrow-right";
                        }
                    }
                }    
            }
            // Get the percentage of the new array and assign a corresponding color
            var percentage = parkingArrayElement.percentage;
            var color;
            if(percentage < 20 && open===true)
            {
                color = 'green';
            }
            else if (percentage >= 20 && percentage <= 50 && open===true){
                color = 'orange';
            }
            else if (percentage > 50 && open===true){
                color = 'red';
            }
            else {
                color = 'grey';
            }
            var parkingOpen;
            if(open ===true){
                parkingOpen ="fa fa-check-circle-o";
            }
            else{
                parkingOpen= "fa fa-times-circle-o";
            }
            tempStr += `
            <div class="col s12 m6">
              <div class="card ${color}">
                <div class="card-content white-text">
                  <span class="card-title"><i class="${parkingOpen}" aria-hidden="true"></i> ${element.description} <i class="${updateStatus}" aria-hidden="true"></i></span>
                  <p>${element.address}</p>
                  <p>Availability : ${element.parkingStatus.availableCapacity} / ${element.parkingStatus.totalCapacity}</p>
                </div>
              </div>
            </div>
            ` 
        })
        parkingElement.innerHTML = tempStr;
        // Set the old array equal to the new one.
        oldParkingArray = newParkingArray;
    },
    function(error){
        console.log(error);
    }
    )
}
//Execute function and set an interval to refresh it.
parkingGhent();
setInterval(parkingGhent,5000);
