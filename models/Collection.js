const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    type: {
        type: Number,
        enum: [1, 2],
        default: 1,
    },
   
    symbol: {
        type: String,
    },
    logoImage: {
        type: String,
        require: true,
    },
    coverImage: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    categoryID: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
   
    contractAddress: {
        type: String,
        require: true,
    },
    price: { type: mongoose.Types.Decimal128, default: 0 },
    
    volumeTraded: {
        type: Number,
        default: 0,
    },
    preSaleStartTime: {
        type: Date,
    },
    preSaleEndTime: {
        type: Date,
    },
    
    totalSupply: {
        type: Number,
        default: 0,
    },
    
    isImported: {
        type: Number,
        default: 0,
        enum: [0, 1], // 0-No 1-Yes
    },
    contractName: {
        type: String,
    },
    totalSupplyField: {
        type: String,
    },
    link: {
        type: String,
    },
    
    progressStatus: {
        //0 - Read & 1 - Process & 2 - Completed
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
    
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    
    lastUpdatedOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Collection", collectionSchema);
