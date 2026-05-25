const productsData = [
    {
        filename: "186x116---wm._SY116_CB667322346_.jpg",
        name: "LG Fully Automatic Front Load Washing Machine",
        price: 32500,
        category: "appliances"
    },
    {
        filename: "2_186_116_1605._SY116_CB763080337_.jpg",
        name: "Adjustable Aluminum iPad & Tablet Stand",
        price: 1299,
        category: "electronics"
    },
    {
        filename: "41Nmd4Ym+8L._AC_SY170_.jpg",
        name: "Bento Lunch Box Container with Compartments",
        price: 899,
        category: "kitchen"
    },
    {
        filename: "41eFIZDABnL._AC_SY200_.jpg",
        name: "Mini Desktop Trash Can with Wooden Lid",
        price: 599,
        category: "home"
    },
    {
        filename: "51WLLO95EmL._AC_SY200_.jpg",
        name: "Vaya Black Cast Iron Kadai / Wok",
        price: 2450,
        category: "kitchen"
    },
    {
        filename: "51WmCssta3L._AC_SY200_.jpg",
        name: "Delicious Thermal Lunch Box Set",
        price: 1850,
        category: "kitchen"
    },
    {
        filename: "51X8AUdS47L._AC_SY170_.jpg",
        name: "Set of 3 Stainless Steel Food Containers",
        price: 1150,
        category: "kitchen"
    },
    {
        filename: "51hTneE0A7L._AC_SY170_.jpg",
        name: "Premier Stainless Steel Pressure Cooker",
        price: 2200,
        category: "kitchen"
    },
    {
        filename: "61-l-DKrlsL._AC_SY200_.jpg",
        name: "Delicious Life Insulated Food Thermos",
        price: 1499,
        category: "kitchen"
    },
    {
        filename: "615vR+EOKGL._AC_SY170_.jpg",
        name: "Aquaminder Smart Hydration Water Bottle",
        price: 999,
        category: "home"
    },
    {
        filename: "61cNyQqbsmL._AC_SY170_.jpg",
        name: "Vaya Tyffyn Premium Lunch Box",
        price: 2800,
        category: "kitchen"
    },
    {
        filename: "61yxKwU6CsL._AC_SY170_.jpg",
        name: "Bajaj 500W Mixer Grinder with Jars",
        price: 2999,
        category: "appliances"
    },
    {
        filename: "71wGvVv88uL._AC_SY200_.jpg",
        name: "Nesting Colander and Strainer Bowl Set",
        price: 650,
        category: "kitchen"
    },
    {
        filename: "81x0PUHjMnL._AC_SY170_.jpg",
        name: "Decorative Gold Floral Wall Mirror",
        price: 3500,
        category: "home"
    },
    {
        filename: "Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg",
        name: "Samsung Convection Microwave Oven",
        price: 11500,
        category: "appliances"
    },
    {
        filename: "Appliances-QC-PC-186x116--B08345R1ZW._SY116_CB667322346_.jpg",
        name: "Samsung Double Door Refrigerator",
        price: 28990,
        category: "appliances"
    },
    {
        filename: "PC_QC_HOME_SIZE_186_2._SY116_CB567468236_.jpg",
        name: "Premium Geometric Pattern Double Bedsheet",
        price: 1250,
        category: "home"
    },
    {
        filename: "PC_QC_HOME_SIZE_186_4._SY116_CB567468236_.jpg",
        name: "Foldable Ironing Board with Cotton Cover",
        price: 1800,
        category: "home"
    },
    {
        filename: "download (1).jpg",
        name: "Women's Pink Classic Sweatshirt",
        price: 999,
        category: "fashion"
    },
    {
        filename: "download (2).jpg",
        name: "Teal Crossbody Bag with Tassels",
        price: 1450,
        category: "fashion"
    },
    {
        filename: "download.jpg",
        name: "Men's Brown Leather Lace-up Boots",
        price: 3500,
        category: "fashion"
    },
    {
        filename: "images (1).jpg",
        name: "Hari Darshan Premium Men's Grooming Kit",
        price: 1200,
        category: "beauty"
    },
    {
        filename: "images (2).jpg",
        name: "Women's White Running Shoes",
        price: 2199,
        category: "fashion"
    },
    {
        filename: "images (3).jpg",
        name: "Prose Custom Hair Care Routine Set",
        price: 4500,
        category: "beauty"
    },
    {
        filename: "images (4).jpg",
        name: "Beige Quilted Designer Handbag",
        price: 2800,
        category: "fashion"
    },
    {
        filename: "images (5).jpg",
        name: "Premium Wireless Over-Ear Headphones",
        price: 5999,
        category: "electronics"
    },
    {
        filename: "images (6).jpg",
        name: "Classic Blue Canvas Sneakers",
        price: 1100,
        category: "fashion"
    },
    {
        filename: "images (7).jpg",
        name: "Casio Pro Trek Smart Outdoor Watch",
        price: 18500,
        category: "electronics"
    },
    {
        filename: "images.jpg",
        name: "Blue Gradient Women's Sunglasses",
        price: 1599,
        category: "fashion"
    }
];

// Generate final products array
const products = productsData.map((item, index) => {
    return {
        id: index + 1,
        name: item.name,
        price: item.price,
        category: item.category,
        image: `assets/images/${item.filename}`,
        description: `Premium quality ${item.category} item designed for the modern lifestyle.`
    };
});
