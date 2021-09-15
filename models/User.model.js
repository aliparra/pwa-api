const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    logout: {
      type: Date,
      default: null
    }
   
  },
  {
    timestamps: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
)

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR)
      .then(hash => {
        this.password = hash
        next()
      })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};





const User = mongoose.model('User', userSchema)

module.exports = User