window.onload=function()
{
    let fieldsStorage=new FormFieldsStorage();
    if(performance.navigation.type === 1) 
    {
        fieldsStorage.canSetSavedValueToField=false;
        localStorage.clear();
    }
    for(let formField of document.forms[0].elements)
    {
        fieldsStorage.setSavedValue(formField);
        formField.onchange=(event)=>
        {
            fieldsStorage.savefieldValue(event.target);
        }
    }
}

function FormFieldsStorage()
{
    this.canSetSavedValueToField=true;
    this.savefieldValue=function(field)
    {
        localStorage.setItem(field.name,field.value);
    }
    this.setSavedValue=function(field)
    {
        if(!this.canSetSavedValueToField)
        {
            return;
        }
        if(field.tagName.toLowerCase()==="input")
        {
            if(field.type==="radio" || field.type==="checkbox")
            {
                let value=localStorage.getItem(field.name);
                if(field.value===value)
                {
                    field.checked=true;
                }
                return;
            }
        }
        field.value=localStorage.getItem(field.name);
    }
}
