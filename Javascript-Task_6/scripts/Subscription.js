//#region class Subscription
function DOMSubscription(target,eventName,callback)
{
    this.target=target;
    this.callback=callback;
    this.eventName=eventName;
}
DOMSubscription.prototype.unsubscribe=function()
{
    this.target.removeEventListener(this.eventName,this.callback);
    for(let i in this)
    {
        i=null;
    }
}
//
DOMSubscription.createSubscription=function(target,eventName,callback)
{
    let subscription = new DOMSubscription(target,eventName,callback);
    subscription.target.addEventListener(subscription.eventName,subscription.callback);
    return subscription;
}
//#endregion