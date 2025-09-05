import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFarmerSchema, insertCropPredictionSchema, insertYieldPredictionSchema } from "@shared/schema";
import path from "path";

// JavaScript ML service inline implementation
class MLService {
  constructor() {
    this.cropRules = {
      'rice': { N: [80, 120], P: [40, 60], K: [40, 60], ph: [5.5, 7.0], temp: [20, 35], humidity: [70, 95], rainfall: [1000, 3000] },
      'maize': { N: [70, 110], P: [30, 50], K: [30, 50], ph: [6.0, 7.5], temp: [15, 35], humidity: [60, 90], rainfall: [500, 1500] },
      'wheat': { N: [100, 140], P: [50, 70], K: [50, 70], ph: [6.0, 7.5], temp: [10, 25], humidity: [50, 80], rainfall: [300, 800] },
      'chickpea': { N: [20, 40], P: [40, 60], K: [30, 50], ph: [6.0, 7.5], temp: [15, 30], humidity: [60, 85], rainfall: [300, 600] },
      'cotton': { N: [100, 140], P: [40, 60], K: [40, 60], ph: [6.0, 8.0], temp: [20, 35], humidity: [50, 80], rainfall: [500, 1200] },
      'sugarcane': { N: [120, 140], P: [50, 80], K: [60, 80], ph: [6.0, 7.5], temp: [20, 35], humidity: [70, 95], rainfall: [1000, 2500] },
      'tomato': { N: [80, 120], P: [60, 80], K: [50, 70], ph: [6.0, 7.0], temp: [15, 30], humidity: [60, 85], rainfall: [400, 800] },
      'potato': { N: [80, 120], P: [50, 70], K: [60, 80], ph: [5.5, 6.5], temp: [15, 25], humidity: [60, 85], rainfall: [500, 1000] },
      'onion': { N: [60, 100], P: [40, 60], K: [50, 70], ph: [6.0, 7.5], temp: [15, 30], humidity: [60, 80], rainfall: [300, 700] },
      'banana': { N: [100, 140], P: [50, 80], K: [80, 120], ph: [5.5, 7.0], temp: [25, 35], humidity: [75, 95], rainfall: [1000, 2000] }
    };
  }

  calculateCropScore(crop: string, soilData: any) {
    if (!this.cropRules[crop]) return 0.0;
    const rules = this.cropRules[crop];
    let score = 0.0;
    let totalFactors = 0;

    for (const [factor, [minVal, maxVal]] of Object.entries(rules)) {
      let value;
      if (factor === 'temp') {
        value = soilData.temperature;
      } else if (soilData[factor] !== undefined) {
        value = soilData[factor];
      } else {
        continue;
      }

      totalFactors += 1;
      if (value >= minVal && value <= maxVal) {
        score += 1.0;
      } else if (value < minVal) {
        score += Math.max(0, 1 - (minVal - value) / minVal);
      } else {
        score += Math.max(0, 1 - (value - maxVal) / maxVal);
      }
    }

    return totalFactors > 0 ? score / totalFactors : 0.0;
  }

  predictCrop(soilData: any) {
    const cropScores = {};
    for (const crop of Object.keys(this.cropRules)) {
      cropScores[crop] = this.calculateCropScore(crop, soilData);
    }

    const sortedCrops = Object.entries(cropScores).sort((a, b) => b[1] - a[1]);
    const top3 = sortedCrops.slice(0, 3);
    const [predictedCrop, confidence] = top3[0];

    return {
      predicted_crop: predictedCrop,
      confidence,
      confidence_percentage: confidence * 100,
      top_3_alternatives: top3.map(([crop, score]) => ({
        crop,
        confidence: score,
        confidence_percentage: score * 100
      })),
      advisory: this.generateAdvisory(predictedCrop, soilData)
    };
  }

  predictYield(yieldData: any) {
    const crop = yieldData.crop.toLowerCase();
    const area = yieldData.area;
    const season = yieldData.season;

    const baseYields = {
      rice: 4.5, wheat: 3.2, maize: 3.8, cotton: 1.8,
      sugarcane: 75.0, chickpea: 1.5, potato: 25.0,
      tomato: 30.0, onion: 20.0, banana: 40.0
    };

    const seasonMultipliers = {
      'Kharif': 1.1, 'Rabi': 1.0, 'Summer': 0.9
    };

    const baseYield = baseYields[crop] || 2.5;
    const seasonMult = seasonMultipliers[season] || 1.0;
    const predictedYield = baseYield * seasonMult;
    const predictedProduction = area * predictedYield;

    return {
      predicted_production: predictedProduction,
      predicted_yield: predictedYield,
      area, crop, season,
      district: yieldData.district || '',
      year: yieldData.year
    };
  }

  generateAdvisory(crop: string, soilData: any) {
    const advisory = [];

    if (soilData.rainfall < 200) {
      advisory.push({
        type: 'irrigation',
        title: 'Irrigation',
        description: `Apply 150-200mm water per week during flowering stage for ${crop}`
      });
    } else {
      advisory.push({
        type: 'irrigation',
        title: 'Irrigation',
        description: 'Monitor soil moisture. Reduce irrigation if rainfall is adequate'
      });
    }

    if (soilData.N < 50) {
      advisory.push({
        type: 'fertilizer',
        title: 'Fertilizer',
        description: 'Add 15-20kg Urea per acre. Soil nitrogen is low'
      });
    } else {
      advisory.push({
        type: 'fertilizer',
        title: 'Fertilizer',
        description: 'Maintain current fertilizer schedule. Soil nutrients are adequate'
      });
    }

    const pestAdvice = {
      rice: 'Monitor for stem borer and brown planthopper. Use pheromone traps',
      wheat: 'Watch for aphids and rust diseases. Apply fungicides if needed',
      maize: 'Check for fall armyworm. Use biological control agents',
      cotton: 'Monitor for bollworm and whitefly. Use integrated pest management'
    };

    advisory.push({
      type: 'pest',
      title: 'Pest Control',
      description: pestAdvice[crop] || 'Regular field inspection recommended'
    });

    return advisory;
  }
}

const mlService = new MLService();

// Weather API integration
async function getWeatherData(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
  
  if (!apiKey) {
    // Return mock weather data if no API key
    return {
      temperature: 28,
      humidity: 65,
      rainfall: 450
    };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0
    };
  } catch (error) {
    console.error('Weather API error:', error);
    // Return default values on error
    return {
      temperature: 28,
      humidity: 65,
      rainfall: 450
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Farmer authentication routes
  app.post('/api/farmers/login', async (req, res) => {
    try {
      const { phone, name, state, district, language } = req.body;
      
      console.log('Login request body:', req.body);
      console.log('State value:', state, 'Type:', typeof state);
      
      // Normalize state to lowercase to match schema
      const normalizedState = state ? state.toLowerCase() : state;
      
      // Check if farmer exists
      let farmer = await storage.getFarmerByPhone(phone);
      
      if (!farmer) {
        // Create new farmer
        const farmerData = insertFarmerSchema.parse({
          name,
          phone,
          state: normalizedState,
          district,
          language: language || 'en'
        });
        farmer = await storage.createFarmer(farmerData);
      } else {
        // Update existing farmer
        farmer = await storage.updateFarmer(farmer.id, {
          name,
          state: normalizedState,
          district,
          language: language || farmer.language
        });
      }
      
      res.json({ success: true, farmer });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Get farmer profile
  app.get('/api/farmers/:id', async (req, res) => {
    try {
      const farmer = await storage.getFarmer(req.params.id);
      if (!farmer) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
      }
      res.json({ success: true, farmer });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get soil data by district
  app.get('/api/soil/:district', async (req, res) => {
    try {
      const soilData = await storage.getSoilDataByDistrict(req.params.district);
      if (!soilData) {
        // Return default soil data
        const defaultSoilData = {
          N: 90,
          P: 42,
          K: 43,
          ph: 6.5,
          temperature: 25,
          humidity: 70,
          rainfall: 400
        };
        return res.json({ success: true, soilData: defaultSoilData });
      }
      res.json({ success: true, soilData });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get weather data
  app.get('/api/weather', async (req, res) => {
    try {
      const { lat, lon } = req.query;
      const weatherData = await getWeatherData(
        parseFloat(lat as string),
        parseFloat(lon as string)
      );
      res.json({ success: true, weatherData });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Crop prediction endpoint
  app.post('/api/predict/crop', async (req, res) => {
    try {
      const { farmerId, soilData } = req.body;
      
      // Validate farmer exists
      const farmer = await storage.getFarmer(farmerId);
      if (!farmer) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
      }

      // Call ML service for crop prediction
      const mlResult = mlService.predictCrop(soilData);
        
      if (mlResult.error) {
        throw new Error(mlResult.error);
      }

      // Save prediction to storage
      const predictionData = insertCropPredictionSchema.parse({
        farmerId,
        crop: mlResult.predicted_crop,
        confidence: mlResult.confidence,
        soilData,
        alternatives: mlResult.top_3_alternatives || [],
        advisory: mlResult.advisory || []
      });

      const prediction = await storage.createCropPrediction(predictionData);
      
      res.json({
        success: true,
        prediction: {
          ...mlResult,
          id: prediction.id,
          createdAt: prediction.createdAt
        }
      });
    } catch (error: any) {
      console.error('Crop prediction error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Yield prediction endpoint
  app.post('/api/predict/yield', async (req, res) => {
    try {
      const { farmerId, yieldData } = req.body;
      
      // Validate farmer exists
      const farmer = await storage.getFarmer(farmerId);
      if (!farmer) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
      }

      // Call ML service for yield prediction
      const mlResult = mlService.predictYield({ ...yieldData, district: farmer.district });
        
        if (mlResult.error) {
          throw new Error(mlResult.error);
        }

        // Save prediction to storage
        const predictionData = insertYieldPredictionSchema.parse({
          farmerId,
          crop: yieldData.crop,
          season: yieldData.season,
          area: yieldData.area,
          year: yieldData.year,
          predictedProduction: mlResult.predicted_production,
          predictedYield: mlResult.predicted_yield
        });

        const prediction = await storage.createYieldPrediction(predictionData);
        
      res.json({
        success: true,
        prediction: {
          ...mlResult,
          id: prediction.id,
          createdAt: prediction.createdAt
        }
      });
    } catch (error: any) {
      console.error('Yield prediction error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get farmer's prediction history
  app.get('/api/farmers/:farmerId/predictions', async (req, res) => {
    try {
      const { farmerId } = req.params;
      
      const cropPredictions = await storage.getCropPredictions(farmerId);
      const yieldPredictions = await storage.getYieldPredictions(farmerId);
      
      res.json({
        success: true,
        predictions: {
          crops: cropPredictions,
          yields: yieldPredictions
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
