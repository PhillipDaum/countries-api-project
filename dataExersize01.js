///// COUNTRIES API DATA /////
const userProfiles = [
    {
        userNumber: 1,
        dateJoined: "date", // maybe the big string from the date object? 
        fullName: "string",
        email: "string",
        country: "string",
        bio: "string",
    },
    {
        userNumber: 2,
        dateJoined: "date",
        fullName: "string",
        email: "string",
        country: "string",
        bio: "string"
    },
    {
        userNumber: 3,
        dateJoined: "date",
        fullName: "string",
        email: "string",
        country: "string",
        bio: "string"
    }
]

const userSavedCountries = [
    {
        userNumber: 1,
        savedCountries: ["common name", "common name", "common name"], // array of strings of common names
    },
    {
        userNumber: 2,
        savedCountries: ["common name", "common name", "common name"], 
    },
    {
        userNumber: 3,
        savedCountries: ["common name", "common name", "common name"], 
    }
]

const countryCountsPerUser = [ // this was for one specific user
    {
        userNumber: 1,
        countryCount: { // object, keys are countries fifa code, values are number of saves
            USA: 1,
            MEX: 2,
            MNG: 3
        }
    },
    {
        userNumber: 2,
        countryCount: { 
            USA: 1,
            MEX: 2,
            MNG: 3
        }
    },
    {
        userNumber: 3,
        countryCount: { 
            USA: 1,
            MEX: 2,
            MNG: 3
        }
    }
]

const countryCountsAll = { // for counting all users' clicks
    USA: 100,
    MEX: 200,
    MNG: 300
}



/////// WIX COOKIE PAGE /////
const cookies = [
    {
        SKU: "002", // it didn't like the leading zeros, should this be a string? 
        title: "POPPY SEEDS BITES",
        cost: 2.00, // are there special things for money in javascript? 
        quantityInStock: 124,
        productDescription: "string", 
        productInfo: "string",
        photos: ["link", "link", "link"]
    },
    {
        SKU: "006", // it didn't like the leading zeros, should this be a string? 
        title: "CHOCOLATE CHIPS",
        cost: 2.00, // should we have the trailing zeros? 
        quantityInStock: 14,
        productDescription: "string", 
        productInfo: "string",
        photos: ["link", "link", "link"]
    },
    {
        SKU: "009", 
        title: "NUTS & CARAMEL BITES",
        cost: 2,
        quantityInStock: 94,
        productDescription: "string", 
        productInfo: "string",
        photos: ["link", "link", "link"]
    }
]

const orders = [
    {
        userNumber: 124,
        cart: [
            { 
                SKU: "006",
                quantity: 3,
            },
            { 
                SKU: "003",
                quantity: 13,
            },
            { 
                SKU: "002",
                quantity: 6,
            }
         ],
        notes: "string"  
    },
    {
        userNumber: 14,
        cart: [
            { 
                SKU: "006",
                quantity: 3,
            },
            { 
                SKU: "003",
                quantity: 13,
            },
            { 
                SKU: "002",
                quantity: 6,
            }
         ],
        notes: "string"  
    },
    {
        userNumber: 32,
        cart: [
            { 
                SKU: "003",
                quantity: 13,
            },
            { 
                SKU: "002",
                quantity: 1,
            }
         ],
        notes: "string"  
    }
]

const customers = [ // customers who make a purchase
    {
        userNumber: 1,
        dateJoined: "date",
        firstName: "string",
        lastName: "string",
        billingAddress: { // right now service is only in USA
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        shippingAddress: {
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        email: "string",
    },
    {
        userNumber: 3,
        dateJoined: "date",
        firstName: "string",
        lastName: "string",
        billingAddress: { // right now service is only in USA
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        shippingAddress: {
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        email: "string",
    },
    {
        userNumber: 15,
        dateJoined: "date",
        firstName: "string",
        lastName: "string",
        billingAddress: { // right now service is only in USA
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        shippingAddress: {
            line1: "string",
            line2: "",
            city: "string",
            state: "string",
            zip: 83402,
        },
        email: "string",
    }
]




/////// FIRE ART STUDIO /////
const jill = {
    name: "Jill Anderson",
    jobTitle: "UI Designer",
    quote: "I'm looking for a site that will simplify the planning of my business trips."
    age: 26,
    status: "single",
    lication: "Brooklyn",
    archetype: "Frequent Flyer",
    characteristics: ["Organized", "Productive", "Practical", "Hardworking", "Passionate", "Punctual"],
    Bio: "string",
    Personality: {
        introvertExtrovert: 4, // scale of 0-10,
        analyticalCreative: 8,
        loyalFickle: 1,
        passiveActive: 6
    },
    Goals: ["To spend less time booking travel", "To narrow her options quickly"],
    Motivations: {
        price: 4, // scal3 0-10
        comfort: 7,
        convenience: 9,
        speed: 3,
        loyaltyMiles: 4
    },
    frustrations: [ "Too much time spent booking-she's busy!", "Too many websites visited per trip", "Not terribly tech savvy- doesn't like the process"],
    favoriteBrands: ["Addidas", "Nike", "Netflix", "AirBnB", "Zara"], // or maybe links to photos
}