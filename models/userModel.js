import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profilePic: { 
        type: String,  
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
    },
    role:{type:String,default:"user"},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

// Use a default export
export default  mongoose.model('User', userSchema);


// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     profilePic: { 
//         type: String,  
//         default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
//     },
//     isActive: { type: Boolean, default: true },
//     createdAt: { type: Date, default: Date.now },
// });

// // Use a default export
// export default mongoose.model('User', userSchema);