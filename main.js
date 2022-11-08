// Get Data
let km = parseInt(prompt("Quanti km vuoi percorrere?"));
let age = parseInt(prompt("Quanti anni hai?"));

if(
    isNaN(km)
    || km < 0
    || isNaN(age)
    || age < 0
){
    alert("Dati non supportati");
} else {

    // Calc pricePerKM
    let eurosPerKM = 0.21;
    if(age < 18){
        eurosPerKM -= eurosPerKM * 0.2;
    } else if(age > 65){
        eurosPerKM -= eurosPerKM * 0.4;
    }
    
    // Calc price
    let price = (km * eurosPerKM).toFixed(2);
    alert(`Il prezzo del biglietto è di ${price}€`);
}