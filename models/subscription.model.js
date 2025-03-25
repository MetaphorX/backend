import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'NAme required'],
        minLength:5,
        maxLength:25
    },
    price:{
        type:Number,
        required:[true, 'Price required'],
        min:[0, 'price must be greater than 0'],
        max:[1000, 'price must be less than 1000']
    },
    currency:{
        type:String,
        enum:['USD', 'NGN'],
        default:'NGN'
    },
    frequency:{
        type:String,
        enum:['daily', 'weekly', 'monthly', 'yearly']
    },
    category:{
        type:String,
        enum:['Sports', 'Lifestyle', 'Economics'],
        required:true
    },
     paymentMethod:{
        type:String,
        required:true,
        trim:true
     },
     status:{
        type:String,
        enum:['active', 'cancel', 'expired'],
        default:'active'
     },
     startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value) => value <= new Date(),
            message:'Start date must be in the past'
        }
     },
     renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator: function(value){
              return  value > this.startDate;
            } ,
            message:'Renewal date must be after start date'
        }
     },

     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
     }
}, {timestamps:true})

//auto calculte renewal date
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily:1,
            weekly:7,
            monthly: 30,
            yearly:365
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    //auto-update the status if the renewal date is passed
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription;