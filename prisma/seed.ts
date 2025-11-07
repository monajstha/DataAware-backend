// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // -----------------------------
  // 1) DataTypes (conceptual economic values - examples from literature)
  // -----------------------------
  const dataTypesData = [
    {
      name: "Location",
      category: "Behavioural",
      economicValueUsd: 1.2,
      description: "Precise and coarse location used for geotargeting.",
    },
    {
      name: "Contacts",
      category: "Personal",
      economicValueUsd: 0.7,
      description: "Address book / social graph data.",
    },
    {
      name: "Audio",
      category: "Sensor",
      economicValueUsd: 1.1,
      description: "Microphone/ambient audio signals.",
    },
    {
      name: "Media",
      category: "Media",
      economicValueUsd: 1.0,
      description: "Camera images and video.",
    },
    {
      name: "Storage",
      category: "File",
      economicValueUsd: 0.6,
      description: "External storage content and metadata.",
    },
    {
      name: "Comms",
      category: "Communications",
      economicValueUsd: 0.9,
      description: "SMS and call logs data.",
    },
    {
      name: "Identity",
      category: "Identity",
      economicValueUsd: 0.8,
      description: "Account and identity data.",
    },
    {
      name: "Device",
      category: "Technical",
      economicValueUsd: 0.5,
      description: "Device identifiers & technical fingerprints.",
    },
    {
      name: "Health",
      category: "Health",
      economicValueUsd: 1.8,
      description: "Biometric and health-related data.",
    },
    {
      name: "Network",
      category: "Network",
      economicValueUsd: 0.4,
      description: "Network state info.",
    },
    {
      name: "Security",
      category: "Security",
      economicValueUsd: 0.6,
      description: "Authentication and biometric usage.",
    },
    {
      name: "AdvertisingID",
      category: "Technical",
      economicValueUsd: 0.4,
      description: "Advertising identifier used for cross-app targeting.",
    },
    {
      name: "Behavioural",
      category: "Behavioural",
      economicValueUsd: 0.9,
      description: "App usage and engagement behaviour.",
    },
    {
      name: "SensorMotion",
      category: "Motion",
      economicValueUsd: 0.5,
      description: "Motion & orientation sensors.",
    },
    {
      name: "Environmental",
      category: "Environmental",
      economicValueUsd: 0.3,
      description: "Ambient sensors (light, pressure, humidity).",
    },
  ];
  await prisma.dataType.createMany({ data: dataTypesData });
  const dataTypes = await prisma.dataType.findMany();

  // helper to map a short name to dataType id
  const findDataTypeId = (name: string) =>
    dataTypes.find((dt) => dt.name.toLowerCase() === name.toLowerCase())?.id;

  // -----------------------------
  // 2) Permissions
  // -----------------------------
  const permissionsList = [
    {
      name: "ACCESS_FINE_LOCATION",
      category: "Location",
      sensitivity: "High",
      riskScore: 0.85,
      description: "Access user precise location",
      dataType: "Location",
      economicValue: 1.2,
    },
    {
      name: "READ_CONTACTS",
      category: "Personal",
      sensitivity: "Medium",
      riskScore: 0.75,
      description: "Read user contacts",
      dataType: "Contacts",
      economicValue: 0.7,
    },
    {
      name: "RECORD_AUDIO",
      category: "Sensor",
      sensitivity: "High",
      riskScore: 0.9,
      description: "Access microphone",
      dataType: "Audio",
      economicValue: 1.1,
    },
    {
      name: "CAMERA",
      category: "Sensor",
      sensitivity: "High",
      riskScore: 0.88,
      description: "Access camera",
      dataType: "Media",
      economicValue: 1.0,
    },
    {
      name: "WRITE_EXTERNAL_STORAGE",
      category: "Storage",
      sensitivity: "Medium",
      riskScore: 0.7,
      description: "Write to device storage",
      dataType: "Storage",
      economicValue: 0.6,
    },
    {
      name: "READ_SMS",
      category: "Comms",
      sensitivity: "High",
      riskScore: 0.8,
      description: "Read SMS messages",
      dataType: "Comms",
      economicValue: 0.9,
    },
    {
      name: "ACCESS_COARSE_LOCATION",
      category: "Location",
      sensitivity: "Medium",
      riskScore: 0.65,
      description: "Access approximate location",
      dataType: "Location",
      economicValue: 1.0,
    },
    {
      name: "GET_ACCOUNTS",
      category: "Identity",
      sensitivity: "Medium",
      riskScore: 0.7,
      description: "Get user account info",
      dataType: "Identity",
      economicValue: 0.8,
    },
    {
      name: "READ_CALENDAR",
      category: "Personal",
      sensitivity: "Medium",
      riskScore: 0.65,
      description: "Read user calendar",
      dataType: "Personal",
      economicValue: 0.6,
    },
    {
      name: "SEND_SMS",
      category: "Comms",
      sensitivity: "High",
      riskScore: 0.8,
      description: "Send SMS messages",
      dataType: "Comms",
      economicValue: 0.9,
    },
    {
      name: "BLUETOOTH_CONNECT",
      category: "Device",
      sensitivity: "Low",
      riskScore: 0.5,
      description: "Connect to Bluetooth devices",
      dataType: "Device",
      economicValue: 0.5,
    },
    {
      name: "BODY_SENSORS",
      category: "Health",
      sensitivity: "High",
      riskScore: 0.75,
      description: "Access health sensors",
      dataType: "Health",
      economicValue: 1.8,
    },
    {
      name: "READ_PHONE_STATE",
      category: "Phone",
      sensitivity: "High",
      riskScore: 0.85,
      description: "Read phone state",
      dataType: "Device",
      economicValue: 0.5,
    },
    {
      name: "ACCESS_NETWORK_STATE",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.4,
      description: "Access network info",
      dataType: "Network",
      economicValue: 0.4,
    },
    {
      name: "CHANGE_WIFI_STATE",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.4,
      description: "Change WiFi state",
      dataType: "Network",
      economicValue: 0.4,
    },
    {
      name: "USE_FINGERPRINT",
      category: "Security",
      sensitivity: "Medium",
      riskScore: 0.6,
      description: "Use fingerprint sensor",
      dataType: "Security",
      economicValue: 0.6,
    },
    {
      name: "SYSTEM_ALERT_WINDOW",
      category: "Special",
      sensitivity: "High",
      riskScore: 0.9,
      description: "Draw over other apps",
      dataType: "Behavioural",
      economicValue: 0.7,
    },
    {
      name: "READ_EXTERNAL_STORAGE",
      category: "Storage",
      sensitivity: "Medium",
      riskScore: 0.7,
      description: "Read device storage",
      dataType: "Storage",
      economicValue: 0.6,
    },
    {
      name: "WRITE_CONTACTS",
      category: "Personal",
      sensitivity: "Medium",
      riskScore: 0.75,
      description: "Modify contacts",
      dataType: "Contacts",
      economicValue: 0.7,
    },
    {
      name: "RECEIVE_BOOT_COMPLETED",
      category: "System",
      sensitivity: "Low",
      riskScore: 0.3,
      description: "Receive boot completed",
      dataType: "System",
      economicValue: 0.2,
    },
    {
      name: "ACCESS_MEDIA_LOCATION",
      category: "Location",
      sensitivity: "Medium",
      riskScore: 0.6,
      description: "Access media location",
      dataType: "Location",
      economicValue: 1.0,
    },
    {
      name: "READ_CALL_LOG",
      category: "Phone",
      sensitivity: "High",
      riskScore: 0.85,
      description: "Read call logs",
      dataType: "Comms",
      economicValue: 0.9,
    },
    {
      name: "WRITE_CALL_LOG",
      category: "Phone",
      sensitivity: "High",
      riskScore: 0.85,
      description: "Write call logs",
      dataType: "Comms",
      economicValue: 0.9,
    },
    {
      name: "RECEIVE_SMS",
      category: "Comms",
      sensitivity: "High",
      riskScore: 0.8,
      description: "Receive SMS",
      dataType: "Comms",
      economicValue: 0.9,
    },
    {
      name: "ACCESS_BACKGROUND_LOCATION",
      category: "Location",
      sensitivity: "High",
      riskScore: 0.9,
      description: "Background location access",
      dataType: "Location",
      economicValue: 1.3,
    },
    {
      name: "WAKE_LOCK",
      category: "System",
      sensitivity: "Low",
      riskScore: 0.3,
      description: "Prevent device sleep",
      dataType: "System",
      economicValue: 0.2,
    },
    {
      name: "INTERNET",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.2,
      description: "Internet access",
      dataType: "Network",
      economicValue: 0.3,
    },
    {
      name: "VIBRATE",
      category: "System",
      sensitivity: "Low",
      riskScore: 0.1,
      description: "Control vibration",
      dataType: "System",
      economicValue: 0.1,
    },
    {
      name: "ACCESS_WIFI_STATE",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.4,
      description: "Access WiFi info",
      dataType: "Network",
      economicValue: 0.4,
    },
    {
      name: "BLUETOOTH_SCAN",
      category: "Device",
      sensitivity: "Low",
      riskScore: 0.5,
      description: "Scan for Bluetooth devices",
      dataType: "Device",
      economicValue: 0.5,
    },
  ];

  // Insert permissions with mapped dataTypeId
  for (const p of permissionsList) {
    const dtId =
      findDataTypeId(p.dataType || p.category) ?? findDataTypeId("Behavioural");
    await prisma.permission.create({
      data: {
        name: p.name,
        description: p.description,
        sensitivity: p.sensitivity,
        riskScore: p.riskScore,
        ...(dtId ? { dataTypeId: dtId } : {}), // only add when defined
        economicValue:
          p.economicValue ??
          (dtId ? dataTypes.find((d) => d.id === dtId)!.economicValueUsd : 0.5),
      },
    });
  }

  const permissions = await prisma.permission.findMany();

  // -----------------------------
  // 3) Trackers
  // -----------------------------
  const trackersList = [
    {
      name: "Google Ads SDK",
      purpose: "Advertising",
      dataCollected: "Device info, Location",
      riskScore: 0.85,
      dataType: "Advertising",
      economicValue: 0.9,
    },
    {
      name: "Facebook Analytics",
      purpose: "Profiling",
      dataCollected: "User behavior",
      riskScore: 0.8,
      dataType: "Behavioural",
      economicValue: 1.0,
    },
    {
      name: "Crashlytics",
      purpose: "Crash reporting",
      dataCollected: "Device info",
      riskScore: 0.4,
      dataType: "System",
      economicValue: 0.3,
    },
    {
      name: "Appsflyer",
      purpose: "Attribution",
      dataCollected: "User device",
      riskScore: 0.7,
      dataType: "Advertising",
      economicValue: 0.9,
    },
    {
      name: "Adjust",
      purpose: "Analytics",
      dataCollected: "User data",
      riskScore: 0.75,
      dataType: "Behavioural",
      economicValue: 0.8,
    },
    {
      name: "Twitter Kit",
      purpose: "Social API",
      dataCollected: "Social graph",
      riskScore: 0.6,
      dataType: "Behavioural",
      economicValue: 0.7,
    },
    {
      name: "MoEngage",
      purpose: "Marketing",
      dataCollected: "User events",
      riskScore: 0.65,
      dataType: "Marketing",
      economicValue: 0.7,
    },
    {
      name: "Branch",
      purpose: "Deep linking",
      dataCollected: "Device and user info",
      riskScore: 0.7,
      dataType: "Behavioural",
      economicValue: 0.7,
    },
    {
      name: "Unity Analytics",
      purpose: "Analytics",
      dataCollected: "Device and user behavior",
      riskScore: 0.6,
      dataType: "Behavioural",
      economicValue: 0.6,
    },
    {
      name: "Firebase Analytics",
      purpose: "Analytics",
      dataCollected: "User behavior",
      riskScore: 0.75,
      dataType: "Behavioural",
      economicValue: 0.8,
    },
    {
      name: "Amplitude",
      purpose: "Analytics",
      dataCollected: "User data",
      riskScore: 0.68,
      dataType: "Behavioural",
      economicValue: 0.7,
    },
    {
      name: "Singular",
      purpose: "Analytics",
      dataCollected: "Device info",
      riskScore: 0.65,
      dataType: "Behavioural",
      economicValue: 0.65,
    },
    {
      name: "Leanplum",
      purpose: "Marketing",
      dataCollected: "User engagement",
      riskScore: 0.7,
      dataType: "Marketing",
      economicValue: 0.7,
    },
    {
      name: "Localytics",
      purpose: "Marketing",
      dataCollected: "User behavior",
      riskScore: 0.6,
      dataType: "Behavioural",
      economicValue: 0.65,
    },
    {
      name: "Mixpanel",
      purpose: "Analytics",
      dataCollected: "User data",
      riskScore: 0.7,
      dataType: "Behavioural",
      economicValue: 0.7,
    },
    {
      name: "Kochava",
      purpose: "Attribution",
      dataCollected: "User device",
      riskScore: 0.75,
      dataType: "Advertising",
      economicValue: 0.8,
    },
    {
      name: "Flurry",
      purpose: "Analytics",
      dataCollected: "User behavior",
      riskScore: 0.6,
      dataType: "Behavioural",
      economicValue: 0.6,
    },
    {
      name: "Appboy",
      purpose: "Engagement",
      dataCollected: "User data",
      riskScore: 0.65,
      dataType: "Behavioural",
      economicValue: 0.65,
    },
    {
      name: "OneSignal",
      purpose: "Push notifications",
      dataCollected: "Device info",
      riskScore: 0.5,
      dataType: "Device",
      economicValue: 0.45,
    },
    {
      name: "Urban Airship",
      purpose: "Push notifications",
      dataCollected: "User device",
      riskScore: 0.5,
      dataType: "Device",
      economicValue: 0.45,
    },
    {
      name: "AdColony",
      purpose: "Advertising",
      dataCollected: "Device info",
      riskScore: 0.7,
      dataType: "Advertising",
      economicValue: 0.75,
    },
    {
      name: "Vungle",
      purpose: "Advertising",
      dataCollected: "User device",
      riskScore: 0.75,
      dataType: "Advertising",
      economicValue: 0.75,
    },
    {
      name: "Chartboost",
      purpose: "Advertising",
      dataCollected: "User behavior",
      riskScore: 0.68,
      dataType: "Advertising",
      economicValue: 0.7,
    },
    {
      name: "Tapjoy",
      purpose: "Advertising",
      dataCollected: "User engagement",
      riskScore: 0.7,
      dataType: "Advertising",
      economicValue: 0.7,
    },
    {
      name: "InMobi",
      purpose: "Advertising",
      dataCollected: "User device",
      riskScore: 0.75,
      dataType: "Advertising",
      economicValue: 0.75,
    },
    {
      name: "IronSource",
      purpose: "Advertising",
      dataCollected: "Device and user info",
      riskScore: 0.7,
      dataType: "Advertising",
      economicValue: 0.7,
    },
    {
      name: "AdMob",
      purpose: "Advertising",
      dataCollected: "User behavior",
      riskScore: 0.7,
      dataType: "Advertising",
      economicValue: 0.7,
    },
    {
      name: "Facebook Audience Network",
      purpose: "Advertising",
      dataCollected: "Device info",
      riskScore: 0.75,
      dataType: "Advertising",
      economicValue: 0.75,
    },
    {
      name: "OpenX",
      purpose: "Advertising",
      dataCollected: "User engagement",
      riskScore: 0.6,
      dataType: "Advertising",
      economicValue: 0.6,
    },
    {
      name: "MoPub",
      purpose: "Advertising",
      dataCollected: "User device",
      riskScore: 0.68,
      dataType: "Advertising",
      economicValue: 0.65,
    },
  ];

  // Insert trackers
  for (const t of trackersList) {
    const dtId = findDataTypeId(t.dataType) ?? findDataTypeId("Behavioural");
    await prisma.tracker.create({
      data: {
        name: t.name,
        description: `${t.purpose} / ${t.dataCollected}`,
        riskScore: t.riskScore,
        ...(dtId ? { dataTypeId: dtId } : {}), // only add when defined
        economicValue:
          t.economicValue ??
          (dtId ? dataTypes.find((d) => d.id === dtId)!.economicValueUsd : 0.5),
      },
    });
  }

  const trackers = await prisma.tracker.findMany();

  // -----------------------------
  // 4) Sensors
  // -----------------------------
  const sensorsList = [
    {
      name: "Accelerometer",
      type: "Motion",
      possibleInference: "Movement detection",
      riskScore: 0.6,
      dataType: "SensorMotion",
    },
    {
      name: "Gyroscope",
      type: "Motion",
      possibleInference: "Device orientation",
      riskScore: 0.7,
      dataType: "SensorMotion",
    },
    {
      name: "Magnetometer",
      type: "Position",
      possibleInference: "Compass data",
      riskScore: 0.4,
      dataType: "SensorMotion",
    },
    {
      name: "Barometer",
      type: "Pressure",
      possibleInference: "Altitude info",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "Thermometer",
      type: "Temperature",
      possibleInference: "Device temperature",
      riskScore: 0.2,
      dataType: "Environmental",
    },
    {
      name: "Camera",
      type: "Optical",
      possibleInference: "Image/video capture",
      riskScore: 0.9,
      dataType: "Media",
    },
    {
      name: "Microphone",
      type: "Audio",
      possibleInference: "Sound capture",
      riskScore: 0.9,
      dataType: "Audio",
    },
    {
      name: "Light Sensor",
      type: "Environmental",
      possibleInference: "Ambient light",
      riskScore: 0.4,
      dataType: "Environmental",
    },
    {
      name: "Proximity Sensor",
      type: "Environmental",
      possibleInference: "Object proximity",
      riskScore: 0.4,
      dataType: "Environmental",
    },
    {
      name: "Fingerprint Sensor",
      type: "Biometric",
      possibleInference: "User authentication",
      riskScore: 0.8,
      dataType: "Security",
    },
    {
      name: "Heart Rate Sensor",
      type: "Health",
      possibleInference: "Heart rate monitoring",
      riskScore: 0.7,
      dataType: "Health",
    },
    {
      name: "Step Counter",
      type: "Health",
      possibleInference: "Physical activity",
      riskScore: 0.6,
      dataType: "Health",
    },
    {
      name: "GPS",
      type: "Location",
      possibleInference: "Location tracking",
      riskScore: 0.85,
      dataType: "Location",
    },
    {
      name: "Compass",
      type: "Position",
      possibleInference: "Direction",
      riskScore: 0.5,
      dataType: "SensorMotion",
    },
    {
      name: "Temperature Sensor",
      type: "Environmental",
      possibleInference: "Ambient temperature",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "Humidity Sensor",
      type: "Environmental",
      possibleInference: "Humidity levels",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "UV Sensor",
      type: "Environmental",
      possibleInference: "UV exposure",
      riskScore: 0.4,
      dataType: "Environmental",
    },
    {
      name: "Gravity Sensor",
      type: "Motion",
      possibleInference: "Gravity effects",
      riskScore: 0.4,
      dataType: "SensorMotion",
    },
    {
      name: "Rotation Vector Sensor",
      type: "Motion",
      possibleInference: "Device rotation",
      riskScore: 0.5,
      dataType: "SensorMotion",
    },
    {
      name: "Step Detector",
      type: "Health",
      possibleInference: "Detect steps",
      riskScore: 0.6,
      dataType: "Health",
    },
    {
      name: "Significant Motion Sensor",
      type: "Motion",
      possibleInference: "Detect major movements",
      riskScore: 0.6,
      dataType: "SensorMotion",
    },
    {
      name: "Game Rotation Vector",
      type: "Motion",
      possibleInference: "Game control",
      riskScore: 0.5,
      dataType: "SensorMotion",
    },
    {
      name: "Pressure Sensor",
      type: "Environmental",
      possibleInference: "Barometric pressure",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "Relative Humidity Sensor",
      type: "Environmental",
      possibleInference: "Humidity levels",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "Ambient Temperature Sensor",
      type: "Environmental",
      possibleInference: "Ambient temperature",
      riskScore: 0.3,
      dataType: "Environmental",
    },
    {
      name: "Motion Detector",
      type: "Motion",
      possibleInference: "Movement",
      riskScore: 0.6,
      dataType: "SensorMotion",
    },
    {
      name: "Light Intensity Sensor",
      type: "Environmental",
      possibleInference: "Light levels",
      riskScore: 0.4,
      dataType: "Environmental",
    },
    {
      name: "Acoustic Sensor",
      type: "Audio",
      possibleInference: "Sound detection",
      riskScore: 0.7,
      dataType: "Audio",
    },
    {
      name: "Magnetic Field Sensor",
      type: "Magnetic",
      possibleInference: "Magnetic field detection",
      riskScore: 0.4,
      dataType: "SensorMotion",
    },
    {
      name: "Pressure Transducer",
      type: "Environmental",
      possibleInference: "Pressure measurement",
      riskScore: 0.3,
      dataType: "Environmental",
    },
  ];

  for (const s of sensorsList) {
    const dtId =
      findDataTypeId(s.dataType) ??
      findDataTypeId("SensorMotion") ??
      findDataTypeId("Environmental");
    await prisma.sensor.create({
      data: {
        name: s.name,
        description: s.possibleInference,
        riskScore: s.riskScore,
        ...(dtId ? { dataTypeId: dtId } : {}), // only add when defined
        economicValue:
          s.riskScore *
          (dtId ? dataTypes.find((d) => d.id === dtId)!.economicValueUsd : 0.5),
      },
    });
  }

  const sensors = await prisma.sensor.findMany();

  // -----------------------------
  // 5) App Categories
  // -----------------------------
  const appCategories = [
    {
      name: "Social Media",
      description:
        "Apps for sharing content, networking, and communication between users.",
      permissions: [
        "CAMERA",
        "MICROPHONE",
        "ACCESS_FINE_LOCATION",
        "READ_CONTACTS",
        "WRITE_EXTERNAL_STORAGE",
        "READ_EXTERNAL_STORAGE",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
      ],
      sensors: ["Accelerometer", "Gyroscope", "Microphone", "Camera"],
      trackers: [
        "Google Ads SDK",
        "Facebook Analytics",
        "Firebase Analytics",
        "Appsflyer",
        "Branch",
        "Mixpanel",
      ],
    },
    {
      name: "Health & Fitness",
      description:
        "Apps that collect health, activity, or biometric information from wearables or sensors.",
      permissions: [
        "BODY_SENSORS",
        "ACCESS_FINE_LOCATION",
        "READ_CONTACTS",
        "BLUETOOTH_CONNECT",
        "READ_EXTERNAL_STORAGE",
        "INTERNET",
      ],
      sensors: [
        "Heart Rate Sensor",
        "Accelerometer",
        "GPS",
        "Step Counter",
        "Proximity Sensor",
      ],
      trackers: ["Firebase Analytics", "MoEngage", "Flurry", "Mixpanel"],
    },
    {
      name: "Finance",
      description:
        "Banking and digital payment apps dealing with sensitive financial and identity data.",
      permissions: [
        "READ_SMS",
        "READ_CONTACTS",
        "READ_PHONE_STATE",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "RECEIVE_BOOT_COMPLETED",
        "WRITE_EXTERNAL_STORAGE",
      ],
      sensors: ["Accelerometer", "Gyroscope"],
      trackers: ["Appsflyer", "Adjust", "Firebase Analytics", "Amplitude"],
    },
    {
      name: "Gaming",
      description:
        "Games that use ad SDKs and analytics to monetise and track engagement.",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "VIBRATE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_EXTERNAL_STORAGE",
      ],
      sensors: [
        "Gyroscope",
        "Accelerometer",
        "Game Rotation Vector",
        "Light Sensor",
      ],
      trackers: [
        "Google Ads SDK",
        "Unity Analytics",
        "Chartboost",
        "Vungle",
        "IronSource",
        "AdColony",
        "Appsflyer",
      ],
    },
    {
      name: "Navigation",
      description:
        "Location-based apps that provide maps, directions, or travel recommendations.",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "INTERNET",
        "ACCESS_WIFI_STATE",
      ],
      sensors: [
        "GPS",
        "Accelerometer",
        "Gyroscope",
        "Magnetometer",
        "Barometer",
      ],
      trackers: ["Firebase Analytics", "Google Ads SDK", "Adjust"],
    },
    {
      name: "E-commerce",
      description:
        "Shopping and retail apps collecting purchase and browsing behaviour for targeting.",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_CONTACTS",
        "READ_PHONE_STATE",
        "ACCESS_FINE_LOCATION",
        "WRITE_EXTERNAL_STORAGE",
      ],
      sensors: ["Accelerometer", "Gyroscope", "Light Sensor"],
      trackers: [
        "Facebook Analytics",
        "Google Ads SDK",
        "Appsflyer",
        "Branch",
        "Mixpanel",
        "Flurry",
      ],
    },
    {
      name: "Productivity",
      description:
        "Tools for communication, scheduling, and document management.",
      permissions: [
        "READ_CALENDAR",
        "WRITE_EXTERNAL_STORAGE",
        "READ_EXTERNAL_STORAGE",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_CONTACTS",
      ],
      sensors: ["Accelerometer", "Proximity Sensor"],
      trackers: ["Firebase Analytics", "Amplitude", "Mixpanel"],
    },
    {
      name: "Entertainment",
      description:
        "Streaming apps providing music, video, or multimedia content.",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
      ],
      sensors: ["Accelerometer", "Gyroscope", "Microphone"],
      trackers: [
        "Google Ads SDK",
        "Facebook Analytics",
        "Appsflyer",
        "Adjust",
        "Mixpanel",
        "Flurry",
      ],
    },
    {
      name: "News & Information",
      description:
        "News and magazine apps that collect behavioural data for targeted content and ads.",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "ACCESS_COARSE_LOCATION",
        "READ_EXTERNAL_STORAGE",
      ],
      sensors: ["Accelerometer", "Light Sensor"],
      trackers: [
        "Google Ads SDK",
        "Facebook Analytics",
        "MoEngage",
        "Flurry",
        "Branch",
        "OneSignal",
      ],
    },
    {
      name: "Education",
      description:
        "Learning platforms that may require microphone, camera, or location for interactive lessons.",
      permissions: [
        "CAMERA",
        "MICROPHONE",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      sensors: ["Camera", "Microphone", "Accelerometer", "Light Sensor"],
      trackers: ["Firebase Analytics", "Amplitude", "Mixpanel", "OneSignal"],
    },
    {
      name: "Utilities",
      description:
        "Device tools that require system-level permissions for functionality.",
      permissions: [
        "CHANGE_WIFI_STATE",
        "ACCESS_NETWORK_STATE",
        "READ_PHONE_STATE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET",
        "BLUETOOTH_CONNECT",
      ],
      sensors: ["Proximity Sensor", "Light Sensor", "Accelerometer"],
      trackers: ["Firebase Analytics", "Localytics"],
    },
    {
      name: "Travel & Transport",
      description:
        "Travel booking and ride-hailing apps with access to precise location and contact data.",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "READ_CONTACTS",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_PHONE_STATE",
      ],
      sensors: ["GPS", "Accelerometer", "Gyroscope", "Barometer"],
      trackers: [
        "Google Ads SDK",
        "Appsflyer",
        "Facebook Analytics",
        "Adjust",
        "Flurry",
      ],
    },
  ];
  for (const cat of appCategories) {
    await prisma.appCategory.create({
      data: {
        name: cat.name,
        description: cat.description,
        permissions: cat.permissions,
        trackers: cat.trackers,
        sensors: cat.sensors,
      },
    });
  }

  // -----------------------------
  // 9) Scenarios (educational, per category)
  // -----------------------------
  const scenarios = [
    {
      title: "Accepting All Permissions in a Social Media App",
      description:
        "User installs a social media app and grants camera, microphone, contacts, and location permissions.",
      riskSummary:
        "High cumulative privacy risk: camera, microphone and location allow detailed profiling and inferences.",
      valueSummary:
        "Estimated economic value of aggregated data (behavioural + media + location) ≈ $5–$7 per user.",
      appCategoryName: "Social Media",
    },
    {
      title: "Tracking Fitness Progress in a Health App",
      description:
        "User enables fitness tracking (heart rate, step counter) and shares location for route tracking.",
      riskSummary:
        "Sensitive biometric and location exposure; potential for discrimination and insurance profiling.",
      valueSummary:
        "Estimated economic value (health + behavioural) ≈ $6–$9 per user.",
      appCategoryName: "Health & Fitness",
    },
    {
      title: "Continuous Background Location in Navigation Apps",
      description:
        "User permits background location to allow real-time navigation updates.",
      riskSummary:
        "High mobility profiling risk; reveals home/work patterns and routines.",
      valueSummary:
        "Streaming location data value ≈ $2–$4 per user per period.",
      appCategoryName: "Navigation",
    },
    {
      title: "E-commerce: Allowing Access To Storage and Device Info",
      description:
        "User grants storage permissions for receipts/photos and uses the app for purchases.",
      riskSummary:
        "Purchase histories combined with device IDs enable targeted offers and cross-site profiling.",
      valueSummary: "Purchase + behavioural data value ≈ $3–$5 per user.",
      appCategoryName: "E-commerce",
    },
    {
      title: "Using Entertainment Apps with Microphone-Based Voice Search",
      description: "User uses voice search and grants microphone access.",
      riskSummary:
        "Ambient audio can yield context and emotional signals; moderate-to-high risk depending on retention.",
      valueSummary: "Audio-derived signals value ≈ $1–$2 per user.",
      appCategoryName: "Entertainment",
    },
  ];

  for (const s of scenarios) {
    await prisma.scenario.create({
      data: {
        title: s.title,
        description: s.description,
        riskSummary: s.riskSummary,
        valueSummary: s.valueSummary,
        appCategoryName: s.appCategoryName,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
