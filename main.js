let app = new Vue ({
    el: "#app",
    data(){
        return{
            bases: [ {name: "Chocolate", price: 0, src:"Images/Base-chocolate.svg"},
                     {name:"Vanilla", price:0, src:"Images/Base-vanilla.svg"}],
            fillings: [ {name: "Chocolate", price: 0, src:"Images/filling-chocolate.svg"}, 
                        {name: "Strawberry", price: 0, src:"Images/filling-strawberry.svg"},
                        {name: "Pistachio", price: 0, src:"Images/filling-pistachio.svg"},
                        {name: "Lemon", price: 0, src:"Images/filling-lemon.svg"},
                        {name: "Banana", price: 0, src:"Images/filling-banana.svg"}],
            frostings: [{name:"Cream cheese", price: 0.2, src:"Images/Topping-creamcheese.svg", srcTwo:"Images/Topping-creamcheese-2.svg"},
                        {name: "Nutella", price: 0.5, src:"Images/Topping-nutella.svg", srcTwo:"Images/Topping-nutella-2.svg"},
                        {name: "Blue buttercream", price: 0.5, src:"Images/Topping-bluebuttercream.svg", srcTwo:"Images/Topping-bluebuttercream-2.svg"},
                        {name: "Peanut butter", price:0.3, src: "Images/Topping-peanutbutter.svg", srcTwo:"Images/Topping-peanutbutter-2.svg"}, 
                        {name:"White chocolate", price: 0.2, src: "Images/Topping-whitechocolate.svg", srcTwo:"Images/Topping-whitechocolate-2.svg"}],
            fruits: [{name:"Cherry", price:0.10, src:"Images/fruit-cherry.svg"},
                     {name:"Strawberry",price:0.10, src:"Images/fruit-strawberry.svg"},
                     {name:"Blueberry",price:0.10, src:"Images/fruit-blueberry.svg"},
                     {name:"None", price:0, src:""}],
            sprinkles: [{name:"Yes, please", price:0.10, src:"Images/sprinkles.svg"}, {name:"Nah, I'm good", price: 0, src:"" }],
            selection: {
                base: {},
                filling: {},
                frostings: [],
                sprinkles: {},
                fruit: {}
            },
            quantity: 1,
            basePrice: {price:1.45} 
            }
    },
    computed:{
        totalPrice(){
            let total = [this.basePrice];
            for (let key in this.selection){              
                Array.isArray(this.selection[key]) ? total=total.concat(this.selection[key]): total.push(this.selection[key]);
            }
            let totalPrice = (total.filter(value => Object.keys(value).length !== 0)).reduce((a,c) => a+c.price, 0)*(this.quantity);
            return Math.round(totalPrice*100)/100;
        },
        finalCost(){
            return Math.round(this.totalPrice*1.2 * 100) / 100;
        }
    },
    methods:{
        requiredFilled(){
            return this.hasBase() && this.hasFilling() && this.hasFrosting();
        },
        reset(){
            if (this.selection.frostings.length === 0){
                this.selection.sprinkles = {};
                this.selection.fruit = {};
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
            return Object.entries(this.selection.fruit).length;   
        },
        hasFrosting(){
            return this.selection.frostings.length !== 0;
        },
        hasBase(){
            return Object.entries(this.selection.base).length;
        },
        hasFilling(){
            return Object.entries(this.selection.filling).length;
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