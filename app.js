const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/UserRoutes');
const crimeReportRoutes = require('./routes/CrimeReportRoutes');
const searchRoutes = require('./routes/SearchRoutes');
const faqRoutes = require('./routes/FAQRoutes');

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  'https://crime-frontend-three.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Enable preflight across all routes
app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/user', userRoutes);
app.use('/api/report', crimeReportRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/faq', faqRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Server Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
