const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String,  },
    products: [
      {
        title: { type: String, unique: true },
        desc: { type: String, },
        img: { type: String,  },
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number,  },
        inStock : {type:Boolean , },
        selectedColor : { type: String , },
        sizef :{ type: String, },
        total :{ type: Number, },

      },
    ],
    amount: { type: Number,  },
    address: { type: String,  },
    number: { type: String,  },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
