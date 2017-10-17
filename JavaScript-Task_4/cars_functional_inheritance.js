function car(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    this.manufacturer = manufacturer;
    this.yearOfIssue = yearOfIssue;
    this.model = model;
    //
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.timeToSetMaxSpeed = maxSpeed/acceleration;

    this.move=(time)=>
    {
        let way=0;
        way = (time - this.timeToSetMaxSpeed) > 0 ? (this.acceleration * time + this.maxSpeed * (time - this.timeToSetMaxSpeed)) : (this.acceleration * time);
        return way;
    }
    //
}
function jeep(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    car.apply(this,[manufacturer, yearOfIssue, model, maxSpeed, acceleration]);
    //
    this.offRoadMove=(time,offRoadType)=>
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
}
function sedan(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    car.apply(this,[manufacturer, yearOfIssue, model, maxSpeed, acceleration]);
    //
    this.roadMove=(time)=>
    {
        var distance=this.move(time);
        distance=distance.toFixed(1);
        console.log(`Sedan ${this.manufacturer} ${this.model} perfectly drove through road, distance=${distance}`);
        
    }
    this.showOff=()=>
    {
        if(this.manufacturer==="Lada")
        {
            console.log(`${this.manufacturer} sedan showed off <=======(==`);
        }
    }
}
function stationWagon(manufacturer, yearOfIssue, model, maxSpeed, acceleration)
{
    car.apply(this,[manufacturer, yearOfIssue, model, maxSpeed, acceleration]);
    //
    this.cityMove=(time)=>
    {
        var distance=this.move(time);
        distance=distance.toFixed(1);
        console.log(`Station wagon ${this.manufacturer} ${this.model} perfectly drove through city, distance=${distance}`);
    }
}
var Mercedes = new jeep('Mercedes-Benz','2009','ML-Klasse 550 AMG',210,40);
Mercedes.offRoadMove(10,'dirt');
var Lada = new sedan('Lada','2015','Eggplant',170,30);
Lada.roadMove(13);
Lada.showOff();
var Peugeot = new stationWagon('Peugeot','2008','207 SW HDi FAP 90',190,35);
Peugeot.cityMove(10);

