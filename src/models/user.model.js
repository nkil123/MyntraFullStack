const {Schema, model} = require ('mongoose');

const bcrypt = require ('bcryptjs');

const userSchema = new Schema (
  {
    fullName: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    mobile: {type: Number, required: true},
    description: {type: String, required: true},
    bagItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: false,
        },
        count: {type: Number, required: false},
      },
    ],
    wishItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre ('save', function (next) {
  if (!this.isModified ('password')) return next ();

  bcrypt.hash (this.password, 10, (err, hash) => {
    this.password = hash;
    return next ();
  });
});

userSchema.methods.checkPassword = function (password) {
  return new Promise ((resolve, reject) => {
    bcrypt.compare (password, this.password, function (err, res) {
      if (err) return reject (err);

      return resolve (res);
    });
  });
};

module.exports = model ('users', userSchema);
