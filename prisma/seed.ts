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
      id: 1,
      name: "Location",
      category: "Behavioural",
      economicValueUsd: 1.8,
      riskLevel: "High",
      description:
        "Geolocation data (precise or coarse) reveals a user’s movements, frequented locations, routines, and travel patterns. It is among the most commercially valuable data types for targeted advertising and surveillance.",
      commonUses:
        "Ad targeting, navigation, retail proximity marketing, and law enforcement data access.",
      protectionTip:
        "Only enable location access while using the app and disable background tracking for non-essential apps.",
    },
    {
      id: 2,
      name: "Contacts",
      category: "Personal",
      economicValueUsd: 1.2,
      riskLevel: "High",
      description:
        "Access to contact lists allows mapping of social graphs and inference of user relationships. It can be leveraged for social targeting and identity correlation.",
      commonUses:
        "Friend suggestions, social graph building, contact-based marketing, and data brokerage.",
      protectionTip:
        "Avoid granting contact access to apps without clear communication needs.",
    },
    {
      id: 3,
      name: "Audio",
      category: "Sensor",
      economicValueUsd: 1.5,
      riskLevel: "High",
      description:
        "Microphone data can capture ambient sounds, speech, and background activity. AI models can infer emotions, context, and personal environment details from audio streams.",
      commonUses:
        "Voice commands, audio advertising, sentiment analysis, and acoustic fingerprinting.",
      protectionTip:
        "Use microphone permissions only for apps requiring audio input and disable background access.",
    },
    {
      id: 4,
      name: "Media",
      category: "Visual",
      economicValueUsd: 1.7,
      riskLevel: "High",
      description:
        "Photos and videos contain biometric, locational, and contextual metadata. Facial recognition systems can extract identities, environments, and objects from visual media.",
      commonUses:
        "User profiling, face recognition, computer vision training datasets.",
      protectionTip:
        "Grant camera access only during app use and review gallery-sharing permissions.",
    },
    {
      id: 5,
      name: "Storage",
      category: "File",
      economicValueUsd: 0.5,
      riskLevel: "Medium",
      description:
        "Device storage access can reveal private files, cached app data, or media contents, offering indirect insights into user behavior and app usage.",
      commonUses:
        "File uploads, media sharing, and behavioral analytics via local cache inspection.",
      protectionTip:
        "Avoid granting file system access unless essential; prefer cloud-based file pickers.",
    },
    {
      id: 6,
      name: "Communications",
      category: "Comms",
      economicValueUsd: 1.3,
      riskLevel: "High",
      description:
        "SMS, call logs, and messaging metadata reveal communication habits and relationship intensity. Such data is heavily exploited in analytics and targeted marketing.",
      commonUses:
        "Fraud detection, communication analytics, contact validation, and marketing intelligence.",
      protectionTip:
        "Disable SMS and call log permissions for non-dialer apps.",
    },
    {
      id: 7,
      name: "Identity",
      category: "Identity",
      economicValueUsd: 1.1,
      riskLevel: "High",
      description:
        "Identity-related data, including names, emails, and accounts, forms the basis of linking multiple digital profiles. Once exposed, identity data is often used in cross-platform profiling.",
      commonUses:
        "User authentication, profiling, and data enrichment for advertising.",
      protectionTip:
        "Avoid using the same login credentials across multiple services.",
    },
    {
      id: 8,
      name: "Device Identifiers",
      category: "Technical",
      economicValueUsd: 0.6,
      riskLevel: "Medium",
      description:
        "Device IDs and IMEI numbers allow persistent user tracking even after cookies or ad IDs are reset.",
      commonUses: "Cross-app tracking, analytics, fraud prevention.",
      protectionTip:
        "Reset your ad ID frequently and avoid sideloading unverified apps.",
    },
    {
      id: 9,
      name: "Health",
      category: "Health",
      economicValueUsd: 2.2,
      riskLevel: "High",
      description:
        "Health data includes biometric readings, exercise logs, and vital signs. It carries high sensitivity due to potential misuse in insurance and employment contexts.",
      commonUses:
        "Health tracking, insurance risk profiling, fitness personalization.",
      protectionTip:
        "Use trusted health apps and check if they comply with HIPAA or GDPR health data standards.",
    },
    {
      id: 10,
      name: "Network Activity",
      category: "Network",
      economicValueUsd: 0.5,
      riskLevel: "Low",
      description:
        "Network state and IP data enable location inference, connection quality analysis, and potential deanonymization via traffic patterns.",
      commonUses:
        "Ad delivery optimization, fraud detection, connectivity analytics.",
      protectionTip:
        "Use VPNs to reduce network traceability across apps and services.",
    },
    {
      id: 11,
      name: "Behavioural Data",
      category: "Behavioural",
      economicValueUsd: 2.0,
      riskLevel: "High",
      description:
        "Behavioral data includes app usage patterns, clicks, dwell time, and interaction histories. It is one of the most valuable inputs for predictive analytics and personalized marketing.",
      commonUses: "Predictive profiling, personalization, risk scoring.",
      protectionTip:
        "Limit analytics permissions and disable personalized recommendations.",
    },
    {
      id: 12,
      name: "Security Credentials",
      category: "Security",
      economicValueUsd: 2.5,
      riskLevel: "Critical",
      description:
        "Authentication tokens, passwords, and biometric identifiers are of extremely high value in cybercrime markets and identity theft.",
      commonUses:
        "Authentication, access control, malicious credential stuffing.",
      protectionTip:
        "Use multi-factor authentication and avoid password reuse.",
    },
    {
      id: 13,
      name: "Biometric Data",
      category: "Health",
      economicValueUsd: 2.3,
      riskLevel: "Critical",
      description:
        "Includes fingerprints, facial scans, and other biological markers. Once compromised, biometric data cannot be changed, making it extremely sensitive.",
      commonUses: "Authentication, emotion recognition, identity verification.",
      protectionTip:
        "Restrict biometric access to official OS-level APIs only.",
    },
    {
      id: 14,
      name: "Browsing History",
      category: "Behavioural",
      economicValueUsd: 1.6,
      riskLevel: "High",
      description:
        "Reveals user interests, beliefs, and personal habits. Browsing data is widely used in targeted advertising and political profiling.",
      commonUses:
        "Ad targeting, behavioral analytics, content recommendations.",
      protectionTip: "Use privacy browsers or tracking protection extensions.",
    },
    {
      id: 15,
      name: "Purchase History",
      category: "Commercial",
      economicValueUsd: 1.4,
      riskLevel: "High",
      description:
        "Includes transaction logs, subscriptions, and shopping behavior. Provides insights into financial capability and interests.",
      commonUses:
        "E-commerce targeting, price discrimination, and customer segmentation.",
      protectionTip: "Avoid linking loyalty programs to multiple platforms.",
    },
    {
      id: 16,
      name: "Search Queries",
      category: "Behavioural",
      economicValueUsd: 1.3,
      riskLevel: "High",
      description:
        "Search data reveals intent, beliefs, and personal context. Search engines and advertisers use it to infer real-time interest and emotional states.",
      commonUses: "Ad targeting, recommendation systems, and data aggregation.",
      protectionTip:
        "Use privacy search engines such as DuckDuckGo or Startpage.",
    },
    {
      id: 17,
      name: "App Usage Data",
      category: "Behavioural",
      economicValueUsd: 1.1,
      riskLevel: "Medium",
      description:
        "Tracks which apps are used, for how long, and when. This behavioral metadata enables fine-grained profiling of daily habits.",
      commonUses:
        "Behavioral analytics, app monetization, attention economy tracking.",
      protectionTip:
        "Use Android/iOS privacy reports to manage app permissions actively.",
    },
    {
      id: 18,
      name: "Motion Sensors",
      category: "Sensor",
      economicValueUsd: 0.8,
      riskLevel: "Medium",
      description:
        "Accelerometer and gyroscope data can infer movement patterns, gait, and even keystrokes. Often used indirectly for contextual awareness.",
      commonUses: "Fitness tracking, gaming, and background motion analytics.",
      protectionTip:
        "Restrict motion sensor access for apps that do not need it for primary functions.",
    },
    {
      id: 19,
      name: "Environmental Data",
      category: "Sensor",
      economicValueUsd: 0.4,
      riskLevel: "Low",
      description:
        "Includes light, temperature, and humidity data. Typically lower privacy risk but may still reveal contextual information about user surroundings.",
      commonUses:
        "Smart home apps, environmental sensing, and adaptive brightness.",
      protectionTip:
        "Ensure such sensors are used only for functional, not behavioral, purposes.",
    },
    {
      id: 20,
      name: "System Metadata",
      category: "Technical",
      economicValueUsd: 0.3,
      riskLevel: "Low",
      description:
        "Includes OS version, hardware specs, and app configurations. Often used for compatibility checks but can also contribute to fingerprinting.",
      commonUses: "Bug fixing, analytics, device optimization.",
      protectionTip:
        "Avoid sharing diagnostic data with third parties unless needed.",
    },
  ];

  await prisma.dataType.createMany({ data: dataTypesData });

  // -----------------------------
  // 2) Permissions
  // -----------------------------
  const permissionsList = [
    {
      name: "ACCESS_FINE_LOCATION",
      category: "Location",
      sensitivity: "High",
      riskScore: 0.85,
      description:
        "Grants apps access to your precise GPS location. Apps can use this to build detailed movement profiles, infer daily routines, or enable geotargeted advertising. Continuous location sharing can expose home, workplace, or frequent routes.",
      protectionTip:
        "Allow location access only when the app is actively in use, and regularly review apps with background location permissions.",
    },
    {
      name: "READ_CONTACTS",
      category: "Personal",
      sensitivity: "Medium",
      riskScore: 0.75,
      description:
        "Allows the app to access your saved contacts, including names, phone numbers, and emails. This can be used to connect you with friends but may also expose your social network to profiling or data leaks.",
      protectionTip:
        "Grant access only to apps where contact syncing is essential (e.g., messaging apps). Avoid social apps that request this unnecessarily.",
    },
    {
      name: "RECORD_AUDIO",
      category: "Sensor",
      sensitivity: "High",
      riskScore: 0.9,
      description:
        "Provides the app access to your device microphone. Apps can record conversations or ambient sound, which may lead to invasive profiling or unintended surveillance if misused.",
      protectionTip:
        "Allow microphone access only to apps that genuinely need it (e.g., calls or voice notes). Revoke access from apps you don’t trust.",
    },
    {
      name: "CAMERA",
      category: "Sensor",
      sensitivity: "High",
      riskScore: 0.88,
      description:
        "Allows the app to capture photos and videos. Malicious or overly intrusive apps may use it for facial recognition, background recording, or visual profiling.",
      protectionTip:
        "Grant access only when taking pictures or videos. Use your device’s privacy indicators (camera icons/lights) to detect unwanted usage.",
    },
    {
      name: "WRITE_EXTERNAL_STORAGE",
      category: "Storage",
      sensitivity: "Medium",
      riskScore: 0.7,
      description:
        "Allows apps to write files to your device storage. It can be useful for saving photos or documents but can also overwrite, corrupt, or insert hidden files.",
      protectionTip:
        "Avoid granting full storage permissions unless required. Prefer modern apps that use scoped or limited file access.",
    },
    {
      name: "READ_SMS",
      category: "Comms",
      sensitivity: "High",
      riskScore: 0.8,
      description:
        "Lets the app read your text messages. While used for verification codes, it may also expose sensitive conversations or private information.",
      protectionTip:
        "Never grant this permission to unknown apps. Use secure apps with built-in OTP retrieval rather than full SMS access.",
    },
    {
      name: "ACCESS_COARSE_LOCATION",
      category: "Location",
      sensitivity: "Medium",
      riskScore: 0.65,
      description:
        "Provides access to your approximate location (via Wi-Fi or mobile networks). It’s less accurate than GPS but still enables general location-based profiling.",
      protectionTip:
        "Prefer ‘approximate location’ when precise tracking isn’t needed. Disable Wi-Fi scanning when not using it.",
    },
    {
      name: "GET_ACCOUNTS",
      category: "Identity",
      sensitivity: "Medium",
      riskScore: 0.7,
      description:
        "Allows apps to list your device’s registered accounts (e.g., Google, Facebook). This can help auto-fill logins but also be used for cross-app identity linking.",
      protectionTip:
        "Grant only to trusted apps from well-known developers. Avoid granting account access to apps without clear justification.",
    },
    {
      name: "READ_CALENDAR",
      category: "Personal",
      sensitivity: "Medium",
      riskScore: 0.65,
      description:
        "Allows the app to access your calendar events. This data could reveal schedules, meeting details, and habits that can be exploited for profiling.",
      protectionTip:
        "Limit calendar access to productivity or scheduling apps you trust. Avoid giving access to apps that don’t need it.",
    },
    {
      name: "SEND_SMS",
      category: "Comms",
      sensitivity: "High",
      riskScore: 0.8,
      description:
        "Grants apps permission to send SMS messages without user confirmation. This can be abused to send paid or spam messages.",
      protectionTip:
        "Avoid granting this unless essential (e.g., messaging apps). Review app SMS permissions regularly in your system settings.",
    },
    {
      name: "BLUETOOTH_CONNECT",
      category: "Device",
      sensitivity: "Low",
      riskScore: 0.5,
      description:
        "Enables the app to connect to Bluetooth devices like headsets or wearables. However, Bluetooth can also be exploited for nearby tracking.",
      protectionTip:
        "Keep Bluetooth turned off when not in use, and avoid connecting to unknown devices.",
    },
    {
      name: "BODY_SENSORS",
      category: "Health",
      sensitivity: "High",
      riskScore: 0.75,
      description:
        "Allows apps to read data from body sensors like heart rate monitors or fitness trackers. While useful for health insights, it can expose sensitive biometric data.",
      protectionTip:
        "Use this permission only with trusted health apps. Avoid sharing fitness data with social or advertising apps.",
    },
    {
      name: "READ_PHONE_STATE",
      category: "Phone",
      sensitivity: "High",
      riskScore: 0.85,
      description:
        "Provides access to phone state information, including network details and device identifiers. Can be misused for fingerprinting or targeted tracking.",
      protectionTip:
        "Grant only to apps that need telephony features (like call blockers). Avoid giving to general-purpose apps.",
    },
    {
      name: "ACCESS_NETWORK_STATE",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.4,
      description:
        "Allows apps to view network connectivity (Wi-Fi or mobile). Often harmless, but may assist tracking by monitoring online activity patterns.",
      protectionTip:
        "Generally safe but avoid granting to apps that don’t rely on internet access.",
    },
    {
      name: "USE_FINGERPRINT",
      category: "Security",
      sensitivity: "Medium",
      riskScore: 0.6,
      description:
        "Allows the app to use biometric fingerprint authentication. Secure for unlocking, but fingerprint data misuse can compromise your digital identity.",
      protectionTip:
        "Only use fingerprint authentication on trusted devices. Avoid apps requesting fingerprint access unnecessarily.",
    },
    {
      name: "SYSTEM_ALERT_WINDOW",
      category: "Special",
      sensitivity: "High",
      riskScore: 0.9,
      description:
        "Lets the app display content over other apps (e.g., chat bubbles). Can be exploited for phishing overlays or fake prompts.",
      protectionTip:
        "Grant this permission sparingly. Be cautious of apps that request to 'draw over other apps' without clear reason.",
    },
    {
      name: "READ_EXTERNAL_STORAGE",
      category: "Storage",
      sensitivity: "Medium",
      riskScore: 0.7,
      description:
        "Allows apps to read files on your device, including photos, videos, and documents. May reveal private media or documents.",
      protectionTip:
        "Grant access only to apps that require media uploads. Prefer limited storage access where available.",
    },
    {
      name: "ACCESS_BACKGROUND_LOCATION",
      category: "Location",
      sensitivity: "High",
      riskScore: 0.9,
      description:
        "Enables location tracking even when the app is closed. Common in navigation and delivery apps but high-risk for continuous tracking.",
      protectionTip:
        "Avoid granting background access unless critical. Review and disable unused apps’ location permissions.",
    },
    {
      name: "INTERNET",
      category: "Network",
      sensitivity: "Low",
      riskScore: 0.2,
      description:
        "Allows apps to access the internet. While essential for most apps, it enables communication with external servers, which can include data sharing.",
      protectionTip:
        "This is generally safe, but be aware that internet access allows remote data transmission — combine with caution for other sensitive permissions.",
    },
  ];

  // Insert permissions with mapped dataTypeId
  for (const p of permissionsList) {
    await prisma.permission.create({
      data: {
        name: p.name,
        category: p.category,
        description: p.description,
        sensitivity: p.sensitivity,
        riskScore: p.riskScore,
        protectionTip: p.protectionTip,
      },
    });
  }

  // -----------------------------
  // 3) Trackers
  // -----------------------------
  const trackersList = [
    {
      name: "Google Ads SDK",
      purpose: "Advertising",
      riskScore: 0.85,
      description:
        "Used to deliver personalized ads across apps and websites. Collects device identifiers, location data, and behavioral information to build ad profiles. Although part of Google Play services, it contributes significantly to user tracking across platforms.",
      protectionTip:
        "Limit ad personalization in your Google account and reset your advertising ID regularly to minimize tracking consistency.",
    },
    {
      name: "Facebook Analytics",
      purpose: "Profiling and Advertising",
      riskScore: 0.8,
      description:
        "Collects behavioral, demographic, and interaction data from apps to improve Facebook’s targeted advertising and content recommendation algorithms. It can link app usage with your Facebook identity, even outside Facebook apps.",
      protectionTip:
        "Avoid signing into apps using Facebook when unnecessary. Use browser containers or privacy-focused browsers to separate tracking contexts.",
    },
    {
      name: "Crashlytics",
      purpose: "Crash Reporting and Performance Monitoring",
      riskScore: 0.4,
      description:
        "Collects crash reports, device models, and system logs to help developers fix errors. Generally low risk, but it can still reveal device configurations and indirectly link to identifiable data when combined with analytics.",
      protectionTip:
        "This tracker is mostly benign. Prefer apps that use anonymous crash reporting and avoid those requiring unnecessary analytics access.",
    },
    {
      name: "Appsflyer",
      purpose: "Attribution and Marketing Analytics",
      riskScore: 0.7,
      description:
        "Tracks app installs and user engagement for marketing attribution. It collects device identifiers, click data, and usage events to attribute ad performance. Often embedded in finance, gaming, and retail apps.",
      protectionTip:
        "Limit app installation tracking by turning off 'Install Referrer' permissions and clearing ad IDs regularly.",
    },
    {
      name: "Adjust",
      purpose: "Advertising Attribution",
      riskScore: 0.75,
      description:
        "Used to measure marketing campaigns, user retention, and engagement. It gathers device information, usage patterns, and location to assess ad performance, sometimes persisting identifiers beyond app sessions.",
      protectionTip:
        "Use privacy dashboards to revoke background tracking and opt out of ad measurement in your phone settings.",
    },
    {
      name: "Twitter Kit",
      purpose: "Social Integration and Analytics",
      riskScore: 0.6,
      description:
        "Allows apps to embed Twitter functions (like logins and feeds) while collecting data about user interactions and device information. Can connect app activity to a user’s Twitter profile.",
      protectionTip:
        "Avoid social media logins in unrelated apps. Log out from social SDKs when not needed.",
    },
    {
      name: "MoEngage",
      purpose: "Marketing Automation",
      riskScore: 0.65,
      description:
        "Used for user segmentation and engagement campaigns. Tracks clicks, session duration, and purchase events to personalize in-app notifications and email marketing.",
      protectionTip:
        "Limit notification permissions and opt out of marketing emails from apps that use MoEngage.",
    },
    {
      name: "Branch",
      purpose: "Deep Linking and Attribution",
      riskScore: 0.7,
      description:
        "Handles link routing between web and app content while gathering device and referral data. Helps marketers track which links or ads brought users into the app.",
      protectionTip:
        "Avoid clicking promotional links in apps that use deep linking extensively. Disable link tracking in browser settings where possible.",
    },
    {
      name: "Firebase Analytics",
      purpose: "User Behavior Analytics",
      riskScore: 0.75,
      description:
        "Collects detailed user interaction data such as session duration, device info, and events. Although anonymized, it can still contribute to profiling when combined with other trackers.",
      protectionTip:
        "Prefer apps that use privacy-preserving analytics (like Matomo or Plausible). Revoke analytics permissions for unnecessary apps.",
    },
    {
      name: "Unity Analytics",
      purpose: "Game Analytics",
      riskScore: 0.6,
      description:
        "Tracks player behavior, in-app purchases, and session data in mobile games. Data may be shared with Unity Ads to improve ad targeting.",
      protectionTip:
        "Play games that offer an opt-out of analytics or use offline mode where possible to prevent background data uploads.",
    },
    {
      name: "Mixpanel",
      purpose: "Product Analytics",
      riskScore: 0.7,
      description:
        "Monitors how users interact with app features, often collecting event streams, device IDs, and session information. Can indirectly reveal behavioral profiles.",
      protectionTip:
        "Disable background data on apps with heavy analytics usage. Avoid signing in via multiple social identities within the same app.",
    },
    {
      name: "Flurry",
      purpose: "App Analytics",
      riskScore: 0.6,
      description:
        "Owned by Yahoo, Flurry collects behavioral and demographic data to help developers understand user engagement. Frequently used in free apps.",
      protectionTip:
        "Limit analytics tracking via privacy settings or install apps from developers with transparent data policies.",
    },
    {
      name: "Appboy (Braze)",
      purpose: "Engagement and Messaging",
      riskScore: 0.65,
      description:
        "Enables personalized messaging and push notifications based on behavioral tracking and in-app events. Data includes app usage, demographics, and interaction frequency.",
      protectionTip:
        "Disable push notifications for apps you don’t interact with frequently. Review in-app privacy settings if available.",
    },
    {
      name: "OneSignal",
      purpose: "Push Notification and Engagement Tracking",
      riskScore: 0.5,
      description:
        "Used for sending notifications and tracking how users interact with them. Collects device IDs and can infer user habits or activity times.",
      protectionTip:
        "Limit notification permissions to essential apps only. Avoid enabling 'high priority' notifications unnecessarily.",
    },
    {
      name: "AdMob",
      purpose: "Advertising Monetization",
      riskScore: 0.7,
      description:
        "Google’s mobile ad network used in free apps. It collects device information, ad interactions, and sometimes coarse location data for targeted ads.",
      protectionTip:
        "Avoid ad-supported apps when possible. Use apps offering ad-free or subscription models to reduce tracking.",
    },
    {
      name: "IronSource",
      purpose: "Ad Mediation and Attribution",
      riskScore: 0.7,
      description:
        "Aggregates multiple ad networks and tracks user interactions to optimize ad delivery. Collects device IDs and engagement metrics.",
      protectionTip:
        "Restrict ad personalization settings at the OS level and use privacy filters in app tracking settings.",
    },
    {
      name: "InMobi",
      purpose: "Advertising Network",
      riskScore: 0.75,
      description:
        "Collects demographic, device, and location data for personalized ad targeting. It has been scrutinized for privacy compliance in several regions.",
      protectionTip:
        "Disable personalized ads in device settings and periodically clear ad data and cache.",
    },
    {
      name: "Chartboost",
      purpose: "In-App Advertising",
      riskScore: 0.68,
      description:
        "Specializes in video ads and user engagement analysis in gaming apps. Collects ad views, installs, and device identifiers.",
      protectionTip:
        "Limit ad tracking in game settings and disable background data when playing offline games.",
    },
    {
      name: "Tapjoy",
      purpose: "Rewarded Ads and Engagement",
      riskScore: 0.7,
      description:
        "Tracks user engagement in exchange for in-app rewards. Collects ad clicks, device data, and interaction logs.",
      protectionTip:
        "Be cautious of reward systems that require multiple app permissions. Avoid linking social accounts to ad-reward programs.",
    },
    {
      name: "Facebook Audience Network",
      purpose: "Advertising and Cross-App Tracking",
      riskScore: 0.75,
      description:
        "Delivers targeted ads outside Facebook’s apps using Facebook’s data graph. Connects app activity to Facebook profiles for ad delivery.",
      protectionTip:
        "Disable 'Off-Facebook Activity' in your Facebook settings and use browser containers for separation.",
    },
  ];

  // Insert trackers
  for (const t of trackersList) {
    await prisma.tracker.create({
      data: {
        name: t.name,
        purpose: t.purpose,
        description: t.description,
        protectionTip: t.protectionTip,
        riskScore: t.riskScore,
      },
    });
  }

  // -----------------------------
  // 4) Sensors
  // -----------------------------
  const sensorsList = [
    {
      name: "Accelerometer",
      type: "Motion",
      possibleInference: "Movement detection",
      riskScore: 0.6,
    },
    {
      name: "Gyroscope",
      type: "Motion",
      possibleInference: "Device orientation",
      riskScore: 0.7,
    },
    {
      name: "Magnetometer",
      type: "Position",
      possibleInference: "Compass data",
      riskScore: 0.4,
    },
    {
      name: "Barometer",
      type: "Pressure",
      possibleInference: "Altitude info",
      riskScore: 0.3,
    },
    {
      name: "Thermometer",
      type: "Temperature",
      possibleInference: "Device temperature",
      riskScore: 0.2,
    },
    {
      name: "Camera",
      type: "Optical",
      possibleInference: "Image/video capture",
      riskScore: 0.9,
    },
    {
      name: "Microphone",
      type: "Audio",
      possibleInference: "Sound capture",
      riskScore: 0.9,
    },
    {
      name: "Light Sensor",
      type: "Environmental",
      possibleInference: "Ambient light",
      riskScore: 0.4,
    },
    {
      name: "Proximity Sensor",
      type: "Environmental",
      possibleInference: "Object proximity",
      riskScore: 0.4,
    },
    {
      name: "Fingerprint Sensor",
      type: "Biometric",
      possibleInference: "User authentication",
      riskScore: 0.8,
    },
    {
      name: "Heart Rate Sensor",
      type: "Health",
      possibleInference: "Heart rate monitoring",
      riskScore: 0.7,
    },
    {
      name: "Step Counter",
      type: "Health",
      possibleInference: "Physical activity",
      riskScore: 0.6,
    },
    {
      name: "GPS",
      type: "Location",
      possibleInference: "Location tracking",
      riskScore: 0.85,
    },
    {
      name: "Compass",
      type: "Position",
      possibleInference: "Direction",
      riskScore: 0.5,
    },
    {
      name: "Temperature Sensor",
      type: "Environmental",
      possibleInference: "Ambient temperature",
      riskScore: 0.3,
    },
    {
      name: "Humidity Sensor",
      type: "Environmental",
      possibleInference: "Humidity levels",
      riskScore: 0.3,
    },
    {
      name: "UV Sensor",
      type: "Environmental",
      possibleInference: "UV exposure",
      riskScore: 0.4,
    },
    {
      name: "Gravity Sensor",
      type: "Motion",
      possibleInference: "Gravity effects",
      riskScore: 0.4,
    },
    {
      name: "Rotation Vector Sensor",
      type: "Motion",
      possibleInference: "Device rotation",
      riskScore: 0.5,
    },
    {
      name: "Step Detector",
      type: "Health",
      possibleInference: "Detect steps",
      riskScore: 0.6,
    },
    {
      name: "Significant Motion Sensor",
      type: "Motion",
      possibleInference: "Detect major movements",
      riskScore: 0.6,
    },
    {
      name: "Game Rotation Vector",
      type: "Motion",
      possibleInference: "Game control",
      riskScore: 0.5,
    },
    {
      name: "Pressure Sensor",
      type: "Environmental",
      possibleInference: "Barometric pressure",
      riskScore: 0.3,
    },
    {
      name: "Relative Humidity Sensor",
      type: "Environmental",
      possibleInference: "Humidity levels",
      riskScore: 0.3,
    },
    {
      name: "Ambient Temperature Sensor",
      type: "Environmental",
      possibleInference: "Ambient temperature",
      riskScore: 0.3,
    },
    {
      name: "Motion Detector",
      type: "Motion",
      possibleInference: "Movement",
      riskScore: 0.6,
    },
    {
      name: "Light Intensity Sensor",
      type: "Environmental",
      possibleInference: "Light levels",
      riskScore: 0.4,
    },
    {
      name: "Acoustic Sensor",
      type: "Audio",
      possibleInference: "Sound detection",
      riskScore: 0.7,
    },
    {
      name: "Magnetic Field Sensor",
      type: "Magnetic",
      possibleInference: "Magnetic field detection",
      riskScore: 0.4,
    },
    {
      name: "Pressure Transducer",
      type: "Environmental",
      possibleInference: "Pressure measurement",
      riskScore: 0.3,
    },
  ];

  for (const s of sensorsList) {
    await prisma.sensor.create({
      data: {
        name: s.name,
        description: s.possibleInference,
        riskScore: s.riskScore,
        possibleInterference: s.possibleInference,
      },
    });
  }

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
