// Start Logging
console.log("Interact with the RailwayMan trough the global object \'RailMan\'!");
console.log("Ask for a ticket and be kind! ;)");
console.log("HINT: you may find RailMan available methods typing \'RailMan.\' in the console and looking at your browser autocompletions")
addEventListener("TALK", (event) => {
    console.log("\n" + event.detail + "\n ", "font-size: 15px", "color: beige; font-size: 15px");
});

function autoPlay() {
    // Sample forms
    const
        formYoung = {
            age: 10,
            km: 20
        },
        formOld = {
            age: 80,
            km: 20
        },
        formNormal = {
            age: 40,
            km: 20
        };

    // Angry RailMan
    console.log("Angry RailMan");
    RailMan = new RailwayMan("Mr.TooSeriousToPlay :D", "BAD");
    RailMan.askForTicket();
    RailMan.askForTicket(formYoung);
    RailMan.askForTicket(formNormal);
    RailMan.askForTicket(formOld);

    // Happy RailMan
    console.log("Happy RailMan");
    RailMan.compliment()
    RailMan.askForTicket(formYoung);
    RailMan.askForTicket(formNormal);
    RailMan.askForTicket(formOld);

    console.log("\nFinished Autoplay\n ");

    // Back to normality
    RailMan = new RailwayMan("Mike");
}

// RAILWAY MAN
class RailwayMan {

    // ID
    #name;
    #mood;

    constructor(name, mood) {
        this.#name = name;
        this.#mood = mood ?? Math.round(Math.random()) == 0 ? "BAD" : "GOOD";

        this.#say(
            `Hi! I'm the RailwayMan, 
            my name is ${this.#name}. 
            How may I serve you?`
        );
    }

    // This is just a fancy "console.log()"
    #say(sentence /* string */) {
        sentence = "%c[RailMan] %c" + sentence;
        const event = new CustomEvent("TALK", {
            "detail": sentence,
        })
        window.dispatchEvent(event);
    }

    compliment() {
        this.#say("Oh thanks! I really needed that today!");
        this.#mood = "GOOD";
    }

    askForTicket(form) {
        // Greets player
        this.#say("Ohh I see, so you need a ticket...");

        if (form) {
            // Player has form
            console.log(JSON.stringify(form));

            let eurosPerKm = 0.21; //standard rate

            // Let's apply some discounts
            if (form.age < 18) {
                this.#say("Well young man, you have a discount of 20%");
                eurosPerKm -= eurosPerKm * .20;
            } else if (form.age > 65) {
                this.#say("Compliments! You are entitled for the \"Final Destination\" discount! -40%.");
                eurosPerKm -= eurosPerKm * .40;
            } else {
                this.#say("Alright, full price my friend, but bring your family next time for huge discounts!");
            }

            // To the math...
            let price = eurosPerKm * form.km;
            let prefix;
            if (this.#mood == "BAD") {
                prefix = "[grunting] ";
                price = Math.ceil(price);
            } else {
                prefix = "[smiling] ";
                price = Math.floor(price);
            }

            // Generate ticket
            let ticket = {
                price: `${price}€`,
            }

            this.#say(`${prefix}Your ticket is ${ticket.price}.`)
            return ticket;

        } else {
            // Player is empty handed
            this.#say("Well, first you'll have to fill this form");
            this.#say(
                `Come back later and ask again 
                with the compiled form`
                );

            const FORM = {
                age: "fill here",
                km: "fill here"
            };

            // Just in case you loose it ;)
            setTimeout(() => {
                this.#say("If you loose your FORM you may find a new one in the DRAWER");
                window.DRAWER = {
                    "FORM": FORM,
                }
            }, 5000);

            return FORM;
        }
    }
}

// Create RailwayMan
let RailMan = new RailwayMan("Mike");