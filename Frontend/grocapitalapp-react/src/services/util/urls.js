// DJANGO ENDPOINTS

// AUTH ENPOINTS
export const REGISTER_URL = 'auth/register'
export const LINKEDIN_REGISTER_URL = 'auth/linkedin-register'
export const LOGIN_URL = 'auth/login'
export const LINKEDIN_LOGIN_URL = 'auth/linkedin-login'
export const LOGOUT_URL = 'auth/logout'
export const AUTHORIZE_USER_TOKEN_URL = 'auth/user'
export const RESET_PASSWORD_URL = 'auth/reset-password'
export const CODE_VERIFICATION_URL = 'auth/code-verification'
export const PASSWORD_CHANGE_URL = 'auth/change-password'

// FORMS 
export const USER_PROFILE_URL = 'user-profile/'
export const EDIT_USER_PROFILE_URL = 'edit-user-profile/'
export const ADD_BUSINESS_INFORMATION_URL = 'business-information/'
export const ADD_PERSONAL_INFORMATION_URL = 'personal-information/'
export const ADD_FINANCIAL_INFORMATION_URL = 'financial-information/'
export const ADD_KPI_METRICS_URL = 'kpi-metrics/'
export const GET_ALL_DATA_USER_URL = 'get-all-data/'
export const USER_DOCUMENTATION = 'user-docs/'

//PLANS ENDPOINTS
export const USER_PLAN_URL = 'user-plan/'

// LOAN HISTORY AND TRANSACTIONS
export const GET_LOAN_HISTORY_DATA_URL = 'loan-history/'
export const GET_TRANSACTIONS_DATA_URL = 'transaction/'

// QUICKBOOKS
export const ASSET_LIABILITIES_AND_EQUITY_URL = 'quickbooks-asset-liabilities-and-equity/'

// FRESHBOOKS
export const PROFIT_LOSS_URL = 'freshbooks-profit-loss/'

// CRS
export const CRS_CONSUMER_CREDIT_REPORT_AND_SCORE = 'crs_consumer_credit_score/'

// 3RD PARTY API ENDPOINTS

// EXPERIAN
export const EXPERIAN_AUTH_URL = 'https://sandbox-us-api.experian.com/oauth2/v1/token'
export const EXPERIAN_SCORE_URL = 'https://sandbox-us-api.experian.com/eits/gdp/v1/request?targeturl=https://sandbox-us-api.experian.com/businessinformation/businesses/v1/scores'
export const EXPERIAN_SCORE_DJANGO_URL = 'http://localhost:8000/experian_app/api/experian_score/'