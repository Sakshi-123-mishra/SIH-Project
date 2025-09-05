import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // App title and branding
      "app.title": "FarmWise",
      "app.subtitle": "Smart Crop Advisory",
      "app.description": "Your Smart Farming Assistant",
      
      // Language selection
      "language.choose": "Choose Your Language",
      "language.chooseHindi": "अपनी भाषा चुनें",
      "button.continue": "Continue",
      
      // Login screen
      "login.welcome": "Welcome to FarmWise",
      "login.phone": "Phone Number",
      "login.name": "Name",
      "login.state": "State",
      "login.district": "District",
      "login.continue": "Continue to Dashboard",
      "login.secure": "Your data is secure and stored locally",
      
      // Navigation
      "nav.recommendation": "Crop Recommendation",
      "nav.yield": "Yield Prediction",
      "nav.history": "History",
      "nav.settings": "Settings",
      
      // Crop recommendation
      "crop.soilData": "Soil & Climate Data",
      "crop.shcQuestion": "Do you have a Soil Health Card?",
      "crop.shcHelp": "We'll auto-fill soil data from your district if you don't have SHC",
      "crop.shcGuidance": "Get your Soil Health Card from your nearest Krishi Vigyan Kendra or visit soilhealth.dac.gov.in",
      "crop.nitrogen": "Nitrogen (N)",
      "crop.phosphorus": "Phosphorus (P)",
      "crop.potassium": "Potassium (K)",
      "crop.ph": "pH Level",
      "crop.weatherData": "Weather Data (Auto-fetched)",
      "crop.temperature": "Temperature",
      "crop.humidity": "Humidity",
      "crop.rainfall": "Rainfall",
      "crop.location": "Location",
      "crop.predict": "Get Crop Recommendation",
      "crop.results": "Recommendation Results",
      "crop.confidence": "Confidence",
      "crop.alternatives": "Alternative Recommendations",
      "crop.advisory": "Smart Advisory",
      
      // Advisory types
      "advisory.irrigation": "Irrigation",
      "advisory.fertilizer": "Fertilizer",
      "advisory.pest": "Pest Control",
      
      // Yield prediction
      "yield.title": "Yield Prediction",
      "yield.crop": "Crop Type",
      "yield.season": "Season",
      "yield.area": "Crop Area",
      "yield.year": "Crop Year",
      "yield.predict": "Predict Yield",
      "yield.forecast": "Yield Forecast",
      "yield.production": "Tons Expected Production",
      "yield.perHectare": "Tons per Hectare",
      "yield.hectares": "Hectares Area",
      "yield.factors": "Yield Influencing Factors",
      
      // History
      "history.title": "Prediction History",
      "history.export": "Export Data",
      "history.empty": "No Predictions Yet",
      "history.emptyDesc": "Start by getting your first crop recommendation",
      "history.makePrediction": "Make Prediction",
      
      // Settings
      "settings.title": "Settings",
      "settings.voice": "Voice Assistant",
      "settings.voiceOutput": "Voice Output",
      "settings.language": "Language Preference",
      "settings.dataManagement": "Data Management",
      "settings.clearData": "Clear Offline Data",
      "settings.clearDataDesc": "Remove cached predictions",
      "settings.exportData": "Export Data",
      "settings.exportDataDesc": "Download prediction history",
      
      // Common
      "button.yes": "Yes",
      "button.no": "No",
      "button.refresh": "Refresh",
      "button.autoDetect": "Auto-detect",
      "button.close": "Close",
      "status.online": "Online",
      "status.offline": "Offline",
      "loading.analyzing": "Analyzing Your Farm Data",
      "loading.processing": "Our AI is processing soil and weather conditions...",
      
      // Units
      "unit.kgPerHa": "kg/ha",
      "unit.celsius": "°C",
      "unit.percent": "%",
      "unit.mm": "mm",
      "unit.hectares": "hectares",
      "unit.tons": "tons",
      
      // States
      "state.maharashtra": "Maharashtra",
      "state.punjab": "Punjab",
      "state.haryana": "Haryana",
      "state.rajasthan": "Rajasthan",
      "state.gujarat": "Gujarat",
      "state.uttar pradesh": "Uttar Pradesh",
      "state.bihar": "Bihar",
      "state.west bengal": "West Bengal",
      "state.odisha": "Odisha",
      "state.tamil nadu": "Tamil Nadu",
      "state.karnataka": "Karnataka",
      "state.andhra pradesh": "Andhra Pradesh",
      "state.telangana": "Telangana",
      
      // Crops
      "crop.rice": "Rice",
      "crop.wheat": "Wheat",
      "crop.maize": "Maize",
      "crop.sugarcane": "Sugarcane",
      "crop.cotton": "Cotton",
      "crop.soybean": "Soybean",
      "crop.groundnut": "Groundnut",
      "crop.potato": "Potato",
      "crop.tomato": "Tomato",
      "crop.onion": "Onion",
      
      // Seasons
      "season.kharif": "Kharif",
      "season.rabi": "Rabi",
      "season.zaid": "Zaid"
    }
  },
  hi: {
    translation: {
      // App title and branding
      "app.title": "फार्मवाइज",
      "app.subtitle": "स्मार्ट फसल सलाहकार",
      "app.description": "आपका स्मार्ट कृषि सहायक",
      
      // Language selection
      "language.choose": "अपनी भाषा चुनें",
      "language.chooseHindi": "अपनी भाषा चुनें",
      "button.continue": "आगे बढ़ें",
      
      // Login screen
      "login.welcome": "फार्मवाइज में आपका स्वागत है",
      "login.phone": "मोबाइल नंबर",
      "login.name": "नाम",
      "login.state": "राज्य",
      "login.district": "जिला",
      "login.continue": "डैशबोर्ड पर जाएं",
      "login.secure": "आपका डेटा सुरक्षित है और स्थानीय रूप से संग्रहीत है",
      
      // Navigation
      "nav.recommendation": "फसल सुझाव",
      "nav.yield": "उत्पादन अनुमान",
      "nav.history": "इतिहास",
      "nav.settings": "सेटिंग्स",
      
      // Crop recommendation
      "crop.soilData": "मिट्टी और जलवायु डेटा",
      "crop.shcQuestion": "क्या आपके पास मृदा स्वास्थ्य कार्ड है?",
      "crop.shcHelp": "यदि आपके पास एसएचसी नहीं है तो हम आपके जिले से मिट्टी का डेटा स्वतः भर देंगे",
      "crop.shcGuidance": "अपना मृदा स्वास्थ्य कार्ड अपने निकटतम कृषि विज्ञान केंद्र से प्राप्त करें या soilhealth.dac.gov.in पर जाएं",
      "crop.nitrogen": "नाइट्रोजन (N)",
      "crop.phosphorus": "फॉस्फोरस (P)",
      "crop.potassium": "पोटैशियम (K)",
      "crop.ph": "पीएच स्तर",
      "crop.weatherData": "मौसम डेटा (स्वतः प्राप्त)",
      "crop.temperature": "तापमान",
      "crop.humidity": "नमी",
      "crop.rainfall": "वर्षा",
      "crop.location": "स्थान",
      "crop.predict": "फसल सुझाव प्राप्त करें",
      "crop.results": "सुझाव परिणाम",
      "crop.confidence": "विश्वास",
      "crop.alternatives": "वैकल्पिक सुझाव",
      "crop.advisory": "स्मार्ट सलाह",
      
      // Advisory types
      "advisory.irrigation": "सिंचाई",
      "advisory.fertilizer": "उर्वरक",
      "advisory.pest": "कीट नियंत्रण",
      
      // Yield prediction
      "yield.title": "उत्पादन अनुमान",
      "yield.crop": "फसल प्रकार",
      "yield.season": "मौसम",
      "yield.area": "फसल क्षेत्र",
      "yield.year": "फसल वर्ष",
      "yield.predict": "उत्पादन का अनुमान लगाएं",
      "yield.forecast": "उत्पादन पूर्वानुमान",
      "yield.production": "टन अपेक्षित उत्पादन",
      "yield.perHectare": "प्रति हेक्टेयर टन",
      "yield.hectares": "हेक्टेयर क्षेत्र",
      "yield.factors": "उत्पादन प्रभावित करने वाले कारक",
      
      // History
      "history.title": "पूर्वानुमान इतिहास",
      "history.export": "डेटा निर्यात करें",
      "history.empty": "अभी तक कोई पूर्वानुमान नहीं",
      "history.emptyDesc": "अपना पहला फसल सुझाव प्राप्त करके शुरू करें",
      "history.makePrediction": "पूर्वानुमान बनाएं",
      
      // Settings
      "settings.title": "सेटिंग्स",
      "settings.voice": "वॉयस असिस्टेंट",
      "settings.voiceOutput": "वॉयस आउटपुट",
      "settings.language": "भाषा प्राथमिकता",
      "settings.dataManagement": "डेटा प्रबंधन",
      "settings.clearData": "ऑफलाइन डेटा साफ़ करें",
      "settings.clearDataDesc": "कैश्ड पूर्वानुमान हटाएं",
      "settings.exportData": "डेटा निर्यात करें",
      "settings.exportDataDesc": "पूर्वानुमान इतिहास डाउनलोड करें",
      
      // Common
      "button.yes": "हाँ",
      "button.no": "नहीं",
      "button.refresh": "रिफ्रेश करें",
      "button.autoDetect": "स्वतः पता लगाएं",
      "button.close": "बंद करें",
      "status.online": "ऑनलाइन",
      "status.offline": "ऑफलाइन",
      "loading.analyzing": "आपके फार्म डेटा का विश्लेषण कर रहे हैं",
      "loading.processing": "हमारी AI मिट्टी और मौसम की स्थिति का विश्लेषण कर रही है...",
      
      // Units
      "unit.kgPerHa": "किग्रा/हेक्टेयर",
      "unit.celsius": "°से",
      "unit.percent": "%",
      "unit.mm": "मिमी",
      "unit.hectares": "हेक्टेयर",
      "unit.tons": "टन",
      
      // Numbers in Hindi
      "number.zero": "शून्य",
      "number.one": "एक",
      "number.two": "दो",
      "number.three": "तीन",
      "number.four": "चार",
      "number.five": "पांच",
      "number.six": "छह",
      "number.seven": "सात",
      "number.eight": "आठ",
      "number.nine": "नौ",
      "number.ten": "दस",
      
      // States in Hindi
      "state.maharashtra": "महाराष्ट्र",
      "state.punjab": "पंजाब",
      "state.haryana": "हरियाणा",
      "state.rajasthan": "राजस्थान",
      "state.gujarat": "गुजरात",
      "state.uttar pradesh": "उत्तर प्रदेश",
      "state.bihar": "बिहार",
      "state.west bengal": "पश्चिम बंगाल",
      "state.odisha": "ओडिशा",
      "state.tamil nadu": "तमिलनाडु",
      "state.karnataka": "कर्नाटक",
      "state.andhra pradesh": "आंध्र प्रदेश",
      "state.telangana": "तेलंगाना",
      
      // Crops in Hindi
      "crop.rice": "चावल",
      "crop.wheat": "गेहूं",
      "crop.maize": "मक्का",
      "crop.sugarcane": "गन्ना",
      "crop.cotton": "कपास",
      "crop.soybean": "सोयाबीन",
      "crop.groundnut": "मूंगफली",
      "crop.potato": "आलू",
      "crop.tomato": "टमाटर",
      "crop.onion": "प्याज",
      
      // Seasons in Hindi
      "season.kharif": "खरीफ",
      "season.rabi": "रबी",
      "season.zaid": "जायद"
    }
  },
  od: {
    translation: {
      // App title and branding
      "app.title": "ଫାର୍ମୱାଇଜ୍",
      "app.subtitle": "ସ୍ମାର୍ଟ ଫସଲ ସଲାହକାର",
      "app.description": "ଆପଣଙ୍କ ସ୍ମାର୍ଟ କୃଷି ସହାୟକ",
      
      // Language selection
      "language.choose": "ଆପଣଙ୍କ ଭାଷା ଚୟନ କରନ୍ତୁ",
      "language.chooseHindi": "ଆପଣଙ୍କ ଭାଷା ଚୟନ କରନ୍ତୁ",
      "button.continue": "ଅଗ୍ରସର ହୁଅନ୍ତୁ",
      
      // Login screen
      "login.welcome": "ଫାର୍ମୱାଇଜ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
      "login.phone": "ମୋବାଇଲ୍ ନମ୍ବର",
      "login.name": "ନାମ",
      "login.state": "ରାଜ୍ୟ",
      "login.district": "ଜିଲ୍ଲା",
      "login.continue": "ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ",
      "login.secure": "ଆପଣଙ୍କ ତଥ୍ୟ ସୁରକ୍ଷିତ ଏବଂ ସ୍ଥାନୀୟ ଭାବରେ ସଂରକ୍ଷିତ",
      
      // Navigation
      "nav.recommendation": "ଫସଲ ସୁପାରିଶ",
      "nav.yield": "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      "nav.history": "ଇତିହାସ",
      "nav.settings": "ସେଟିଂସ୍",
      
      // Crop recommendation
      "crop.soilData": "ମାଟି ଏବଂ ଜଳବାୟୁ ତଥ୍ୟ",
      "crop.shcQuestion": "ଆପଣଙ୍କ ପାଖରେ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ଅଛି କି?",
      "crop.shcHelp": "ଯଦି ଆପଣଙ୍କ ପାଖରେ SHC ନାହିଁ, ତେବେ ଆମେ ଆପଣଙ୍କ ଜିଲ୍ଲାରୁ ମାଟିର ତଥ୍ୟ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ଭରିଦେବୁ",
      "crop.shcGuidance": "ଆପଣଙ୍କ ନିକଟତମ କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ରରୁ ଆପଣଙ୍କ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ପ୍ରାପ୍ତ କରନ୍ତୁ କିମ୍ବା soilhealth.dac.gov.in ପରିଦର୍ଶନ କରନ୍ତୁ",
      "crop.nitrogen": "ନାଇଟ୍ରୋଜେନ୍ (N)",
      "crop.phosphorus": "ଫସଫରସ୍ (P)",
      "crop.potassium": "ପୋଟାସିୟମ୍ (K)",
      "crop.ph": "pH ସ୍ତର",
      "crop.weatherData": "ପାଣିପାଗ ତଥ୍ୟ (ସ୍ୱୟଂଚାଳିତ ପ୍ରାପ୍ତ)",
      "crop.temperature": "ତାପମାତ୍ରା",
      "crop.humidity": "ଆର୍ଦ୍ରତା",
      "crop.rainfall": "ବର୍ଷା",
      "crop.location": "ଅବସ୍ଥାନ",
      "crop.predict": "ଫସଲ ସୁପାରିଶ ପାଆନ୍ତୁ",
      "crop.results": "ସୁପାରିଶ ଫଳାଫଳ",
      "crop.confidence": "ବିଶ୍ୱାସ",
      "crop.alternatives": "ବିକଳ୍ପ ସୁପାରିଶ",
      "crop.advisory": "ସ୍ମାର୍ଟ ସଲାହ",
      
      // Advisory types
      "advisory.irrigation": "ସିଞ୍ଚାଇ",
      "advisory.fertilizer": "ସାର",
      "advisory.pest": "କୀଟ ନିୟନ୍ତ୍ରଣ",
      
      // Yield prediction
      "yield.title": "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      "yield.crop": "ଫସଲ ପ୍ରକାର",
      "yield.season": "ଋତୁ",
      "yield.area": "ଫସଲ କ୍ଷେତ୍ର",
      "yield.year": "ଫସଲ ବର୍ଷ",
      "yield.predict": "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ କରନ୍ତୁ",
      "yield.forecast": "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      "yield.production": "ଟନ ଅପେକ୍ଷିତ ଉତ୍ପାଦନ",
      "yield.perHectare": "ପ୍ରତି ହେକ୍ଟର ଟନ",
      "yield.hectares": "ହେକ୍ଟର କ୍ଷେତ୍ର",
      "yield.factors": "ଉତ୍ପାଦନ ପ୍ରଭାବିତ କରୁଥିବା କାରକ",
      
      // History
      "history.title": "ପୂର୍ବାନୁମାନ ଇତିହାସ",
      "history.export": "ତଥ୍ୟ ରପ୍ତାନି କରନ୍ତୁ",
      "history.empty": "ଏଯାବତ୍ କୌଣସି ପୂର୍ବାନୁମାନ ନାହିଁ",
      "history.emptyDesc": "ଆପଣଙ୍କର ପ୍ରଥମ ଫସଲ ସୁପାରିଶ ପ୍ରାପ୍ତ କରି ଆରମ୍ଭ କରନ୍ତୁ",
      "history.makePrediction": "ପୂର୍ବାନୁମାନ କରନ୍ତୁ",
      
      // Settings
      "settings.title": "ସେଟିଂସ୍",
      "settings.voice": "ଭଏସ୍ ଅସିଷ୍ଟାଣ୍ଟ",
      "settings.voiceOutput": "ଭଏସ୍ ଆଉଟପୁଟ୍",
      "settings.language": "ଭାଷା ପ୍ରାଥମିକତା",
      "settings.dataManagement": "ତଥ୍ୟ ପରିଚାଳନା",
      "settings.clearData": "ଅଫଲାଇନ୍ ତଥ୍ୟ ସଫା କରନ୍ତୁ",
      "settings.clearDataDesc": "କ୍ୟାଶ୍ କରାଯାଇଥିବା ପୂର୍ବାନୁମାନ ହଟାନ୍ତୁ",
      "settings.exportData": "ତଥ୍ୟ ରପ୍ତାନି କରନ୍ତୁ",
      "settings.exportDataDesc": "ପୂର୍ବାନୁମାନ ଇତିହାସ ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
      
      // Common
      "button.yes": "ହଁ",
      "button.no": "ନାହିଁ",
      "button.refresh": "ରିଫ୍ରେସ୍ କରନ୍ତୁ",
      "button.autoDetect": "ସ୍ୱୟଂଚାଳିତ ଖୋଜନ୍ତୁ",
      "button.close": "ବନ୍ଦ କରନ୍ତୁ",
      "status.online": "ଅନଲାଇନ୍",
      "status.offline": "ଅଫଲାଇନ୍",
      "loading.analyzing": "ଆପଣଙ୍କ ଫାର୍ମ ତଥ୍ୟର ବିଶ୍ଳେଷଣ କରୁଛନ୍ତି",
      "loading.processing": "ଆମର AI ମାଟି ଏବଂ ପାଣିପାଗର ଅବସ୍ଥା ବିଶ୍ଳେଷଣ କରୁଛି...",
      
      // Units
      "unit.kgPerHa": "କିଗ୍ରା/ହେକ୍ଟର",
      "unit.celsius": "°ସେ",
      "unit.percent": "%",
      "unit.mm": "ମିମି",
      "unit.hectares": "ହେକ୍ଟର",
      "unit.tons": "ଟନ",
      
      // Numbers in Odia
      "number.zero": "ଶୂନ୍ୟ",
      "number.one": "ଏକ",
      "number.two": "ଦୁଇ",
      "number.three": "ତିନି",
      "number.four": "ଚାରି",
      "number.five": "ପାଞ୍ଚ",
      "number.six": "ଛଅ",
      "number.seven": "ସାତ",
      "number.eight": "ଆଠ",
      "number.nine": "ନଅ",
      "number.ten": "ଦଶ",
      
      // States in Odia
      "state.maharashtra": "ମହାରାଷ୍ଟ୍ର",
      "state.punjab": "ପଞ୍ଜାବ",
      "state.haryana": "ହରିୟାଣା",
      "state.rajasthan": "ରାଜସ୍ଥାନ",
      "state.gujarat": "ଗୁଜରାଟ",
      "state.uttar pradesh": "ଉତ୍ତର ପ୍ରଦେଶ",
      "state.bihar": "ବିହାର",
      "state.west bengal": "ପଶ୍ଚିମ ବଙ୍ଗ",
      "state.odisha": "ଓଡ଼ିଶା",
      "state.tamil nadu": "ତାମିଲନାଡୁ",
      "state.karnataka": "କର୍ଣ୍ଣାଟକ",
      "state.andhra pradesh": "ଆନ୍ଧ୍ର ପ୍ରଦେଶ",
      "state.telangana": "ତେଲଙ୍ଗାନା",
      
      // Crops in Odia
      "crop.rice": "ଚାଉଳ",
      "crop.wheat": "ଗହମ",
      "crop.maize": "ମକା",
      "crop.sugarcane": "ଆଖୁ",
      "crop.cotton": "କପଡ଼ା",
      "crop.soybean": "ସୋୟାବିନ",
      "crop.groundnut": "ଚିନାବାଦାମ",
      "crop.potato": "ଆଳୁ",
      "crop.tomato": "ଟମାଟ",
      "crop.onion": "ପିଆଜ",
      
      // Seasons in Odia
      "season.kharif": "ଖରିଫ",
      "season.rabi": "ରବି",
      "season.zaid": "ଜାୟଦ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
