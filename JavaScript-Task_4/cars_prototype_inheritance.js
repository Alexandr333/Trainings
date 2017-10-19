function Car(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    this.manufacturer = manufacturer;
    this.yearOfIssue = yearOfIssue;
    this.model = model;
    //
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.timeToSetMaxSpeed = maxSpeed/acceleration;
    //
}
Car.prototype.move=function (time){
    let way=0;
    way = (time - this.timeToSetMaxSpeed) > 0 ? (this.acceleration * time + this.maxSpeed * (time - this.timeToSetMaxSpeed)) : (this.acceleration * time);
    return way;
}
//
function Jeep(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    Car.prototype.constructor(manufacturer, yearOfIssue, model, maxSpeed, acceleration);
}
Jeep.prototype=Object.create(Car.prototype);
Jeep.prototype.offRoadMove=function (time,offRoadType)
{
    if(this.yearOfIssue < 2005)
    {
        console.log(`Jeep ${this.manufacturer} ${this.model}, ${this.yearOfIssue} year of the issue stalled )=`)
        return;
    }
    let distance = this.move(time);
    distance=distance.toFixed(1);
    console.log(`Jeep ${this.manufacturer} ${this.model} drove through ${offRoadType}, distance=${distance}`);
}
//
function Sedan(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    Car.prototype.constructor(manufacturer, yearOfIssue, model, maxSpeed, acceleration);
}
Sedan.prototype=Object.create(Car.prototype);
Sedan.prototype.roadMove=function(time)
{
    var distance=this.move(time);
    distance=distance.toFixed(1);
    console.log(`Sedan ${this.manufacturer} ${this.model} perfectly drove through road, distance=${distance}`);
    
}
Sedan.prototype.showOff=function()
{
    if(this.manufacturer==="Lada")
    {
        console.log(`${this.manufacturer} Sedan showed off <=======(==`);
    }
}
//
function StationWagon(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    Car.prototype.constructor(manufacturer, yearOfIssue, model, maxSpeed, acceleration);
}
StationWagon.prototype=Object.create(Car.prototype);
StationWagon.prototype.cityMove=function(time)
{
    var distance=this.move(time);
    distance=distance.toFixed(1);
    console.log(`Station wagon ${this.manufacturer} ${this.model} perfectly drove through city, distance=${distance}`);
}
//
var Mercedes = new Jeep('Mercedes-Benz','2009','ML-Klasse 550 AMG',210,40);
Mercedes.offRoadMove(10,'dirt');

var Lada = new Sedan('Lada','2015','Eggplant',170,30);
Lada.roadMove(13);
Lada.showOff();

var Peugeot = new StationWagon('Peugeot','2008','207 SW HDi FAP 90',190,35);
Peugeot.cityMove(10);
