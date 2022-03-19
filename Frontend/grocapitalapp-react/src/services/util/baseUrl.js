export const baseDomain = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/'
    else 
        return 'https://backend.grocapitalapp.com/'
}

export const baseUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/api/'
    else 
        return 'https://backend.grocapitalapp.com/api/'
}

export const mediaUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/media/'
    else 
        return 'https://backend.grocapitalapp.com/media/'
}

export const intuitBaseUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/intuit/api/'
    else 
        return 'https://backend.grocapitalapp.com/intuit/api/'
}

export const freshbooksBaseUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/freshbooks_app/api/'
    else 
        return 'https://backend.grocapitalapp.com/freshbooks_app/api/'
}

export const plaidBaseUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/plaid_app/api/'
    else 
        return 'https://backend.grocapitalapp.com/plaid_app/api/'
}

export const crsBaseUrl = () => {
    if(process.env.NODE_ENV === 'development')
        return 'http://localhost:8000/crs_app/api/'
    else 
        return 'https://backend.grocapitalapp.com/crs_app/api/'
}