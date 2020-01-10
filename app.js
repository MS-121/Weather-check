window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperaturedescription = document.querySelector('.temperature-description');
    let temperaturedegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection= document.querySelector('.degree-Section');
    let degreeSectionSpan= document.querySelector('.degree-Section span');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/1349f672f8e7ff753a67a3abecc63335/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon}=data.currently;
                    temperaturedegree.textContent=temperature;
                    temperaturedescription.textContent=summary;
                    locationTimezone.textContent=data.timezone;

                    setIcons(icon, document.querySelector('.icon'));
                    //Formula
                    let celcius=(temperature-32)*(5/9);
                    //change F to C
                    degreeSection.addEventListener('click' , ()=>{
                        if(degreeSectionSpan.textContent=== "F"){
                            degreeSectionSpan.textContent="C";
                            temperaturedegree.textContent=Math.floor(celcius);
                        }
                        else{
                            degreeSectionSpan.textContent="F";
                            temperaturedegree.textContent=temperature;
                        }
                    })
                })
        })
    }
    function setIcons(icon,iconID){
        const skycons=new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
})