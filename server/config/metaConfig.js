/**
 * Meta Configuration for Social Media Sharing
 * 
 * This file contains all the meta tag configurations for different pages.
 * Update this file to add or modify page-specific meta information.
 * 
 * All pages are derived from the actual router configuration.
 */

const BASE_URL = ''; // Relative paths
const DEFAULT_IMAGE = '/img/dashboardPreviewImages/Dashboard.PNG';
const DASHBOARD_IMAGE = '/img/dashboardPreviewImages/Dashboard.PNG';

/**
 * Dashboard-specific meta configurations
 * Keys should match the dashboard route names (with underscores)
 * Based on: src/modules/dynamic-dashboard/config/dashboard_config.js
 */
const dashboardMeta = {
  // Main Dashboards from dashboard_config.js
  Health_Outcomes_and_Service_Coverage: {
    title: 'Health Outcomes and Service Coverage',
    description: 'Explore comprehensive health outcomes and service coverage indicators across Nigeria including maternal health, child health, immunization coverage, family planning, and more on MSDAT.',
    image: DASHBOARD_IMAGE,
    keywords: 'health outcomes, service coverage, maternal health, child health, immunization, family planning, Nigeria health data, MSDAT',
  },
  Health_Facility: {
    title: 'Health Facility Dashboard',
    description: 'Access health facility data across Nigeria. Explore facility distribution, staffing levels, equipment availability, and service delivery metrics.',
    image: DASHBOARD_IMAGE,
    keywords: 'health facilities, hospitals, clinics, PHC, primary health care, Nigeria healthcare facilities, MSDAT',
  },
  Health_Financing: {
    title: 'Health Financing Dashboard',
    description: 'Analyze health financing indicators for Nigeria. Track health expenditure, out-of-pocket spending, government health allocation, and financing trends.',
    image: DASHBOARD_IMAGE,
    keywords: 'health financing, health expenditure, government spending, out-of-pocket, Nigeria health budget, MSDAT',
  },
  Health_Workforce: {
    title: 'Health Workforce Dashboard',
    description: 'Explore health workforce data for Nigeria. Analyze distribution of doctors, nurses, midwives, and other health workers across states and facilities.',
    image: DASHBOARD_IMAGE,
    keywords: 'health workforce, doctors, nurses, midwives, health workers, human resources for health, Nigeria, MSDAT',
  },
  Demographics: {
    title: 'Demographics Dashboard',
    description: 'Access demographic data for Nigeria. Explore population statistics, birth rates, death rates, fertility rates, and population projections.',
    image: DASHBOARD_IMAGE,
    keywords: 'demographics, population, birth rate, death rate, fertility, Nigeria population data, MSDAT',
  },
  Health_Service_Access: {
    title: 'Health Service Access Dashboard',
    description: 'Analyze health service access indicators across Nigeria. Track geographic access, service utilization, and barriers to healthcare.',
    image: DASHBOARD_IMAGE,
    keywords: 'health access, service utilization, geographic access, healthcare access, Nigeria, MSDAT',
  },
  Advanced_Analytics: {
    title: 'Advanced Analytics Dashboard',
    description: 'Advanced data analytics and visualization tools for health indicators in Nigeria. Perform multi-source comparisons, trend analysis, and cross-indicator analysis.',
    image: `${BASE_URL}/img/dashboardPreviewImages/MultiSourceComparison.PNG`,
    keywords: 'advanced analytics, data visualization, trend analysis, multi-source comparison, Nigeria health data, MSDAT',
  },
  GIS_Mapping_Dashboard: {
    title: 'GIS Mapping Dashboard',
    description: 'Geographic Information System (GIS) mapping of health indicators and facilities across Nigeria. Visualize spatial distribution and geographic patterns.',
    image: DASHBOARD_IMAGE,
    keywords: 'GIS, mapping, geographic, spatial analysis, health facilities map, Nigeria, MSDAT',
  },
  Quarterly_Performance_Assessment_Dashboard: {
    title: 'Quarterly Performance Assessment Dashboard',
    description: 'Track quarterly performance of health programs across Nigeria. Monitor progress against targets and performance indicators.',
    image: DASHBOARD_IMAGE,
    keywords: 'quarterly performance, assessment, health programs, monitoring, evaluation, Nigeria, MSDAT',
  },
};

/**
 * Static page meta configurations
 * Based on actual router files
 */
const staticPageMeta = {
  // Home/Root
  '/': {
    title: 'MSDAT Nigeria - Multi-Source Data Analytics and Triangulation',
    description: 'The Multi-Source Data Analytics and Triangulation (MSDAT) platform - your one-stop shop for Health Data and Analytics in Nigeria. Explore health indicators from multiple data sources.',
    image: DEFAULT_IMAGE,
    keywords: 'MSDAT, health data, Nigeria, analytics, triangulation, health indicators, FMOH',
  },

  // About pages (from about/router.js)
  '/about': {
    title: 'About MSDAT Nigeria',
    description: 'Learn about the Multi-Source Data Analytics and Triangulation (MSDAT) platform - a comprehensive health data platform for Nigeria developed by FMOH with support from development partners.',
    image: DEFAULT_IMAGE,
    keywords: 'about MSDAT, FMOH, Nigeria health platform, health data analytics',
  },
  '/testimonials': {
    title: 'Testimonials - MSDAT Nigeria',
    description: 'Read testimonials from users of the MSDAT platform. See how health professionals, policymakers, and researchers use MSDAT for data-driven decisions.',
    image: DEFAULT_IMAGE,
    keywords: 'testimonials, user reviews, MSDAT feedback, success stories',
  },
  '/advanced-triangulation-dashboard': {
    title: 'Advanced Triangulation Dashboard - MSDAT Nigeria',
    description: 'Advanced data triangulation tools for comparing health indicators across multiple data sources in Nigeria. Validate data quality and identify discrepancies.',
    image: `${BASE_URL}/img/dashboardPreviewImages/DataSetComparison.PNG`,
    keywords: 'data triangulation, multi-source comparison, data validation, health data quality',
  },

  // Advanced Analytics (from dynamic-dashboard/router.js)
  '/advanced_analytics': {
    title: 'Advanced Analytics - MSDAT Nigeria',
    description: 'Access advanced analytics tools on MSDAT. Perform multi-source data comparisons, indicator analysis, zonal analysis, and trend analysis for health data.',
    image: `${BASE_URL}/img/dashboardPreviewImages/MultiSourceComparison.PNG`,
    keywords: 'advanced analytics, data comparison, trend analysis, zonal analysis, MSDAT',
  },

  // State Health Profiles (from state-profile/router.js)
  '/health-profiles': {
    title: 'State Health Profiles - MSDAT Nigeria',
    description: 'Explore comprehensive health profiles for all 36 states and FCT in Nigeria. Access state-level health indicators, demographics, facility data, and health outcomes.',
    image: DEFAULT_IMAGE,
    keywords: 'state profiles, Nigeria states, health indicators by state, state health data',
  },

  // Health Think (from health-think/router.js)
  '/health-think': {
    title: 'Health Think - MSDAT Nigeria',
    description: 'Health Think - a platform for health policy discussions, research insights, and thought leadership in Nigeria\'s health sector.',
    image: DEFAULT_IMAGE,
    keywords: 'health think, health policy, research, Nigeria health sector, thought leadership',
  },

  // Custom Dashboard (from custom-dashboard/router.js)
  '/custom': {
    title: 'Custom Dashboard - MSDAT Nigeria',
    description: 'Create your own custom health data dashboard on MSDAT. Select indicators, customize visualizations, and save your personalized views.',
    image: DEFAULT_IMAGE,
    keywords: 'custom dashboard, personalized analytics, data visualization, my dashboard',
  },
  '/custom/login': {
    title: 'Login - Custom Dashboard - MSDAT Nigeria',
    description: 'Login to access your custom dashboard on MSDAT. Create, save, and manage your personalized health data visualizations.',
    image: DEFAULT_IMAGE,
    keywords: 'login, custom dashboard, MSDAT account',
  },
  '/custom/register': {
    title: 'Register - Custom Dashboard - MSDAT Nigeria',
    description: 'Create an account to build your custom dashboard on MSDAT. Sign up to save and share your personalized health data visualizations.',
    image: DEFAULT_IMAGE,
    keywords: 'register, sign up, create account, custom dashboard, MSDAT',
  },
  '/custom/requests': {
    title: 'Dashboard Requests - MSDAT Nigeria',
    description: 'View and manage dashboard requests on MSDAT. Submit requests for new dashboards or data access.',
    image: DEFAULT_IMAGE,
    keywords: 'dashboard requests, data requests, MSDAT',
  },
  '/saved-dashboard': {
    title: 'Saved Dashboards - MSDAT Nigeria',
    description: 'Access your saved dashboards on MSDAT. View, edit, and share your custom dashboard configurations.',
    image: DEFAULT_IMAGE,
    keywords: 'saved dashboards, my dashboards, custom dashboards, MSDAT',
  },
  '/account-settings': {
    title: 'Account Settings - MSDAT Nigeria',
    description: 'Manage your MSDAT account settings. Update profile, preferences, and notification settings.',
    image: DEFAULT_IMAGE,
    keywords: 'account settings, profile, preferences, MSDAT account',
  },

  // External Dashboards (from external/router.js)
  '/external-ncdc': {
    title: 'Disease Surveillance Dashboard (NCDC) - MSDAT Nigeria',
    description: 'Disease surveillance data from Nigeria Centre for Disease Control (NCDC). Track disease outbreaks, epidemiological trends, and public health emergencies.',
    image: DEFAULT_IMAGE,
    keywords: 'NCDC, disease surveillance, epidemiology, outbreak, public health, Nigeria',
  },
  '/ministers-dashboard': {
    title: 'SWAP Ministerial Dashboard - MSDAT Nigeria',
    description: 'Sector Wide Approach (SWAP) Ministerial Dashboard. Track key health sector performance indicators for ministerial oversight.',
    image: DEFAULT_IMAGE,
    keywords: 'ministerial dashboard, SWAP, health sector, performance indicators, FMOH',
  },
  '/presidential-bond-scorecard': {
    title: 'Presidential Bond Scorecard - MSDAT Nigeria',
    description: 'Scorecard Dashboard of Presidential Bond Indicators. Track progress on presidential health commitments and priority indicators.',
    image: DEFAULT_IMAGE,
    keywords: 'presidential bond, scorecard, health commitments, priority indicators, Nigeria',
  },
  '/cemonc-dashboard': {
    title: 'CEmONC Dashboard - MSDAT Nigeria',
    description: 'Comprehensive Emergency Obstetric and Newborn Care (CEmONC) Dashboard. Track availability and functionality of emergency obstetric services.',
    image: DEFAULT_IMAGE,
    keywords: 'CEmONC, emergency obstetric care, maternal health, newborn care, Nigeria',
  },
  '/health-service-uptake': {
    title: 'Health Service Uptake (NHMIS Quarterly) - MSDAT Nigeria',
    description: 'Quarterly health service uptake data from the National Health Management Information System (NHMIS). Track service utilization trends.',
    image: DEFAULT_IMAGE,
    keywords: 'health service uptake, NHMIS, quarterly data, service utilization, Nigeria',
  },
  '/data-partnership': {
    title: 'Data Partnership Request - MSDAT Nigeria',
    description: 'Submit a data partnership request to MSDAT. Collaborate with FMOH on health data initiatives and research projects.',
    image: DEFAULT_IMAGE,
    keywords: 'data partnership, collaboration, research, FMOH, MSDAT',
  },
  '/state-health-facility': {
    title: 'Health Facilities Finder - MSDAT Nigeria',
    description: 'Find health facilities across Nigeria. Search by state, LGA, facility type, and services offered.',
    image: DEFAULT_IMAGE,
    keywords: 'health facilities finder, hospitals, clinics, PHC, facility search, Nigeria',
  },
  '/health-facilities-profile': {
    title: 'Multi-Source Health Facilities Profile - MSDAT Nigeria',
    description: 'Comprehensive health facilities profile dashboard. Compare facility data across multiple sources including NHMIS, surveys, and registries.',
    image: DEFAULT_IMAGE,
    keywords: 'health facilities profile, facility data, multi-source, NHMIS, Nigeria',
  },
  '/ndhs-tracker': {
    title: 'NDHS Tracker Dashboard - MSDAT Nigeria',
    description: 'Nigeria Demographic and Health Survey (NDHS) Tracker. Monitor key health indicators from NDHS across survey years.',
    image: DEFAULT_IMAGE,
    keywords: 'NDHS, demographic health survey, tracker, health indicators, Nigeria',
  },
  '/dashboard-landing-page': {
    title: 'SWAP Minister of Health Dashboard - MSDAT Nigeria',
    description: 'Sector Wide Approach Platform - Minister of Health Dashboard. Executive overview of key health sector indicators.',
    image: DEFAULT_IMAGE,
    keywords: 'minister of health, SWAP, executive dashboard, health sector, Nigeria',
  },

  // FAQ (from faq/router.js)
  '/faq': {
    title: 'Frequently Asked Questions - MSDAT Nigeria',
    description: 'Frequently asked questions about the MSDAT platform. Find answers about using MSDAT, data sources, indicators, and technical support.',
    image: DEFAULT_IMAGE,
    keywords: 'FAQ, help, support, questions, answers, MSDAT guide',
  },

  // Settings pages (from settings/router.js)
  '/profile': {
    title: 'Profile Settings - MSDAT Nigeria',
    description: 'Manage your MSDAT profile settings. Update your personal information and preferences.',
    image: DEFAULT_IMAGE,
    keywords: 'profile, settings, account, preferences, MSDAT',
  },
  '/notifications': {
    title: 'Notification Settings - MSDAT Nigeria',
    description: 'Manage your MSDAT notification preferences. Configure email and in-app notification settings.',
    image: DEFAULT_IMAGE,
    keywords: 'notifications, settings, alerts, preferences, MSDAT',
  },
  '/activity-history': {
    title: 'Activity History - MSDAT Nigeria',
    description: 'View your activity history on MSDAT. Track your dashboard views, data exports, and account activities.',
    image: DEFAULT_IMAGE,
    keywords: 'activity history, usage history, account activity, MSDAT',
  },
  '/password-recovery': {
    title: 'Password Recovery - MSDAT Nigeria',
    description: 'Recover your MSDAT account password. Reset your password securely.',
    image: DEFAULT_IMAGE,
    keywords: 'password recovery, reset password, forgot password, MSDAT',
  },

  // Update Log (from update_log/router.js)
  '/update_log': {
    title: 'Update Log - MSDAT Nigeria',
    description: 'View the latest updates and changes to the MSDAT platform. Track new features, data updates, and improvements.',
    image: DEFAULT_IMAGE,
    keywords: 'update log, changelog, new features, updates, MSDAT',
  },

  // Natural Language Search (from natural-language-search/router.js)
  '/indicator-search': {
    title: 'Indicator Search - MSDAT Nigeria',
    description: 'Search for health indicators on MSDAT using natural language. Find indicators by name, category, or description.',
    image: DEFAULT_IMAGE,
    keywords: 'indicator search, find indicators, health indicators, search, MSDAT',
  },

  // Data Entry (from data-entry/router.js)
  '/data-entry': {
    title: 'Data Entry - MSDAT Nigeria',
    description: 'Data entry portal for MSDAT. Submit and manage health data entries for authorized users.',
    image: DEFAULT_IMAGE,
    keywords: 'data entry, submit data, data management, MSDAT',
  },

  // Configurer (from configurer/router.js)
  '/configure': {
    title: 'MSDAT Configurer - MSDAT Nigeria',
    description: 'Configure your MSDAT experience. Customize dashboards, appearance, and data preferences.',
    image: DEFAULT_IMAGE,
    keywords: 'configure, customize, settings, preferences, MSDAT',
  },

  // Llama AI (from llama_ai/router.js)
  '/llama-ai': {
    title: 'AI Assistant - MSDAT Nigeria',
    description: 'MSDAT AI Assistant powered by advanced language models. Ask questions about health data and get intelligent responses.',
    image: DEFAULT_IMAGE,
    keywords: 'AI assistant, artificial intelligence, chatbot, health data, MSDAT',
  },

  // Metadata QA (from main router)
  '/metadata-qa': {
    title: 'Metadata Q&A - MSDAT Nigeria',
    description: 'Ask questions about health data metadata on MSDAT. Get information about indicators, data sources, definitions, and methodologies.',
    image: DEFAULT_IMAGE,
    keywords: 'metadata, data definitions, indicator metadata, Q&A, MSDAT',
  },
};

/**
 * Nigerian states for state profile pages
 */
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

module.exports = {
  BASE_URL,
  DEFAULT_IMAGE,
  DASHBOARD_IMAGE,
  dashboardMeta,
  staticPageMeta,
  nigerianStates,
};
