const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  responsibilities: [String],
  technologies: [String]
});

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldOfStudy: String,
  startYear: {
    type: Number,
    required: true
  },
  endYear: Number,
  currentlyStudying: {
    type: Boolean,
    default: false
  }
});

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed']
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  department: String,
  position: String,
  salary: Number,
  skills: [String],
  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Fluent', 'Native']
    }
  }],
  experience: [experienceSchema],
  education: [educationSchema],
  profilePicture: {String},
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;