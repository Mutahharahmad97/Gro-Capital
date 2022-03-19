
function parseAddress(name,phone,formattedAddress)
{
    let pieces=formattedAddress.split(',');
    let result={name,phone};
    result.address=pieces[0].trim();
    let addressInfo=pieces[2].trim().split(' ');
    result.state=addressInfo[0];
    result.zipcode=addressInfo[1];
    result.city=pieces[1].trim();
    return result;
}
let autocomplete =null;
let callback=null;
function setAutoComplete()
{
    if(!autocomplete&&document.getElementById("companyName"))
    {
        autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("companyName"));
        autocomplete.setFields(
            ['formatted_address','name','formatted_phone_number']);
        autocomplete.addListener('place_changed', function() 
        {
            let place = autocomplete.getPlace();
            if(place)
                callback(parseAddress(place.name,place.formatted_phone_number,place.formatted_address));
        });
    }
}



export default {
    find:(callbackFunction)=>
    {
        callback=callbackFunction;
        setAutoComplete();
    }
};