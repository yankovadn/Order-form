let app = new Vue ({
    el: "#app",
    data(){
        return{
            base: [{name: "Chocolate", src:"Images/Base-chocolate.svg"}, {name:"Vanilla", src:"Images/Base-vanilla.svg"}],
            frostings: [{name:"Cream cheese", price: 0.2, src:"Images/Topping-creamcheese.svg"},
                        {name: "Nutella", price: 0.5, src:"Images/Topping-nutella.svg"},
                        {name: "Blue buttercream", price: 0.5, src:"Images/Topping-bluebuttercream.svg"},
                        {name: "Peanut butter", price:0.3, src: "Images/Topping-peanutbutter.svg"}, 
                        {name:"White chocolate", price: 0.2, src: "Images/Topping-whitechocolate.svg"}],
            fruits: [{name:"Cherry", price:0.15, src:"Images/fruit-cherry.svg"},
                     {name:"Strawberry",price:0.15, src:"Images/fruit-strawberry.svg"},
                     {name:"Blueberry",price:0.15, src:"Images/fruit-blueberry.svg"},
                     {name:"None", price:0, src:""}],
            sprinkles: [{name:"Yes, please", price:0.10, src:"Images/sprinkles.svg"}, {name:"Nah, I'm good", price: 0 }],
            selection: {
                base: {name:"default",src:"Images/Base-chocolate.svg"},
                filling: "",
                frostings: [],
                sprinkles: {},
                fruits: {}
            },
            quantity: 1,
            basePrice: {price:1.45} 
            }
    },
    computed:{
        totalPrice(){
            let total = [this.basePrice].concat(this.selection.frostings);
            total.push(this.selection.sprinkles);
            total.push(this.selection.fruits);
            let toReturn = (total.filter(value => Object.keys(value).length !== 0).reduce((a,c)=>a+c.price,0))*(this.quantity);
            return Math.round(toReturn*100)/100;
        },
        finalCost(){
            return Math.round(this.totalPrice*1.2 * 100) / 100;
        }
    },
    methods:{
        requiredFilled(){
            return this.selection.base.name!=="deafult" && this.selection.filling!=="" && this.selection.frostings.length!==0;
        },
        reset(){
            if (this.selection.frostings.length === 0){
                this.selection.sprinkles = {};
                this.selection.fruits = {};
            }
        },
        adjustQuantity(){
            if(this.quantity>50){
                this.quantity=50;
            } else if (this.quantity<1){
                this.quantity=1;
            }
        },
        hasSprinkles(){
            return this.selection.sprinkles.name==="Yes, please";
        },
        hasFruit(){
            return Object.entries(this.selection.fruits).length;   
        },
        hasFrosting(){
            return this.selection.frostings.length !== 0;
        }
    },
    watch:{
        "selection.frostings"(){
            this.reset();
        },
        quantity(){
            this.adjustQuantity();
        }
    }
})