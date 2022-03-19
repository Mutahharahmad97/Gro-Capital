export const getStartedData = {
  loan_amount_applied: {
    placeholder: 'How much money do you need?',
    options: [
      { value: '25000', label: '$25,000' },
      { value: '50000', label: '$50,000' },
      { value: '75000', label: '$75,000' },
      { value: '100000', label: '$100,000' },
      { value: '150000', label: '$150,000' },
      { value: '200000', label: '$200,000' },
      { value: '300000', label: '$300,000' },
      { value: '500000', label: '$500,000' },
      { value: '0', label: 'Other' }
    ],
    values: {
      25000: '$25,000',
      50000: '$50,000',
      75000: '$75,000',
      100000: '$100,000',
      150000: '$150,000',
      200000: '$200,000',
      300000: '$300,000',
      500000: '$500,000',
      0: 'Other',
    },
  },
  loan_type: {
    placeholder: 'What type of capital are you looking for?',
    options: [
      {
        value: 'line_of_credit',
        label: "Just a line of Credit (I'll be paying Gro back)"
      },
      {
        value: 'equity_investment',
        label: 'Just equity investment (Gro invests in my company)'
      },
      { value: 'either', label: 'Either form of capital' }
    ],
    short: {
      line_of_credit: 'Line of credit',
      equity_investment: 'Equity investment',
      either: 'Either form'
    }
  },
  loan_reason: {
    placeholder: 'What do you need the money for?',
    options: [
      { value: 'marketing', label: 'Advertising and Marketing' },
      { value: 'hiring', label: 'Hiring' },
      { value: 'legal', label: 'Legal and Compliance' },
      { value: 'materials_and_supply', label: 'Materials & Supply' },
      { value: 'product_developmeent', label: 'Product & Development' },
      { value: 'property', label: 'Property' },
      { value: 'acquisition', label: 'Acquisition' },
      { value: 'payroll', label: 'Payroll' },
      { value: 'new_location', label: 'New Location' },
      { value: 'other', label: 'Other' }
    ],
    values: {
      marketing: 'Advertising and Marketing',
      hiring: 'Hiring',
      legal: 'Legal and Compliance',
      materials_and_supply: 'Materials & Supply',
      product_developmeent: 'Product & Development',
      property: 'Property',
      acquisition: 'Acquisition',
      payroll: 'Payroll',
      new_location: 'New Location',
      other: 'Other',
    },
  },
  company_structure: {
    placeholder: 'Company Structure',
    options: [
      { value: 's', label: 'Sole Proprietorship' },
      { value: 'gp', label: 'General Partnership' },
      { value: 'c', label: 'Corporation' },
      { value: 'llc', label: 'LLC' },
      { value: 'sllc', label: 'Single-Member LLC' }
    ]
  },
  state: {
    placeholder: 'Select State',
    options: [
      { value: 'AL', label: "Alabama" },
      { value: 'AK', label: "Alaska" },
      { value: 'AZ', label: "Arizona" },
      { value: 'AR', label: "Arkansas" },
      { value: 'CA', label: "California" },
      { value: 'CO', label: "Colorado" },
      { value: 'CT', label: "Connecticut" },
      { value: 'DC', label: "District of Columbia" },
      { value: 'DE', label: "Delaware" },
      { value: 'FL', label: "Florida" },
      { value: 'GA', label: "Georgia" },
      { value: 'HI', label: "Hawaii" },
      { value: 'ID', label: "Idaho" },
      { value: "AS", label: "American Samoa" },
      { value: "FM", label: "Federated States Of Micronesia" },
      { value: "GU", label: "Guam" },
      { value: "IL", label: "Illinois" },
      { value: "IN", label: "Indiana" },
      { value: "IA", label: "Iowa" },
      { value: "KS", label: "Kansas" },
      { value: "KY", label: "Kentucky" },
      { value: "LA", label: "Louisiana" },
      { value: "ME", label: "Maine" },
      { value: "MD", label: "Maryland" },
      { value: "MA", label: "Massachusetts" },
      { value: "MI", label: "Michigan" },
      { value: "MN", label: "Minnesota" },
      { value: "MS", label: "Mississippi" },
      { value: "MO", label: "Missouri" },
      { value: "MT", label: "Montana" },
      { value: "NE", label: "Nebraska" },
      { value: "NV", label: "Nevada" },
      { value: "NH", label: "New Hampshire" },
      { value: "NJ", label: "New Jersey" },
      { value: "NM", label: "New Mexico" },
      { value: "NY", label: "New York" },
      { value: "NC", label: "North Carolina" },
      { value: "ND", label: "North Dakota" },
      { value: "OH", label: "Ohio" },
      { value: "OK", label: "Oklahoma" },
      { value: "OR", label: "Oregon" },
      { value: "PA", label: "Pennsylvania" },
      { value: "PR", label: "Puerto Rico" },
      { value: "RI", label: "Rhode Island" },
      { value: "SC", label: "South Carolina" },
      { value: "SD", label: "South Dakota" },
      { value: "TN", label: "Tennessee" },
      { value: "TX", label: "Texas" },
      { value: "UT", label: "Utah" },
      { value: "VT", label: "Vermont" },
      { value: "VA", label: "Virginia" },
      { value: "WA", label: "Washington" },
      { value: "WV", label: "West Virginia" },
      { value: "WI", label: "Wisconsin" },
      { value: "WY", label: "Wyoming" }
    ]
  },
  industry_type: {
    placeholder: 'Industry Type',
    options: [
      { value: 'food', label: 'Accommodation and Food Services' },
      { value: 'finance', label: 'Accounting, Finance and Insurance' },
      { value: 'support', label: 'Administrative and Support Services' },
      {
        value: 'agriculture',
        label: 'Agriculture, Forestry, Fishing and Hunting'
      },
      {
        value: 'vehicle',
        label: 'All Automotive and Vehicular Products and Services'
      },
      {
        value: 'arts',
        label: 'Arts, Recreation, Entertainment, and Amusement'
      },
      { value: 'chemical', label: 'Chemical, Oil and Gas Industry' },
      { value: 'construction', label: 'Construction and Land Services' },
      {
        value: 'electronic',
        label: 'Electronic / Computer Manufacturing and Services'
      },
      { value: 'health', label: 'Health Care and Social Assistance' },
      {
        value: 'maintenance',
        label: 'Janitorial, Repair and Maintenance Service'
      },
      { value: 'mail', label: 'Mail, Courier and Warehousing Services' },
      { value: 'management', label: 'Management of Companies and Enterprises' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'mininig', label: 'Mining and Quarrying & Support Servcies' },
      { value: 'other', label: 'Other Services(except Public Administration)' },
      { value: 'tech', label: 'Professional and Technical Services' },
      { value: 'administration', label: 'Public Administration' },
      {
        value: 'communication',
        label: 'Publishers and Information / Communication Services'
      },
      { value: 'rental', label: 'Rentals, Leasing and Real Estate Services' },
      { value: 'retail', label: 'Retail Business' },
      { value: 'education', label: 'Training and Educational Services' },
      {
        value: 'transportation',
        label: 'Transportation and Support Services(Excluding Automobiles)'
      },
      { value: 'utilities', label: 'Utilities' }
    ]
  }
};

export const applicationLinks = {
  ein: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
  duns: 'https://www.dnb.com/duns-number/get-a-duns.html'
};

export const sliderData = {
  introduction: 2,
  company: 3,
  financial: 3,
  terms: 1,
  profile: 2
};

export const sliderTitles = {
  introduction: 'Getting Started',
  company: 'Company Profile',
  financial: 'Financial Information',
  terms: 'Terms and Conditions',
  profile: 'Profile'
};

export const equityInvestmentData = {
  industry: {
    placeholder: 'The deeper the understanding of an industry and a problem, the more valuable you are.',
    options: [
      { value: 'master_degree', label: 'Average Master’s degree in industry related field.' },
      { value: 'three_years', label: 'Average three years of relevant industry experience.' },
      { value: 'phd', label: 'Average PhD in subject.' },
      { value: 'seven_years', label: 'Average seven years of relevant experience.' },
    ]
  },
  external_network: {
    placeholder: 'When the experience and expertise of you and your team fall short, it’s good to know that you have a network to pull you up.',
    options: [
      { value: '500', label: '< 500+ LinkedIn and/or 2,000+ Twitter followers, and/or designation as a Non-profit/Meetup organizational leader.' },
      { value: '2', label: '2+ industry experts as formal advisors/board members.' },
      { value: '5', label: 'Top 5 incubator graduate, and/or achieved 3x your goal via crowdfunding.' },
      { value: 'leaders', label: 'Management team are awarded leaders in the industry.' },
    ]
  },
  target_market: {
    placeholder: 'A large market increases your chances of an exit (IPO, acquisition) and sustainability of your business.',
    options: [
      { value: '<$500M', label: '<$500M' },
      { value: '$500M_$1B', label: '$500M - $1B' },
      { value: '$1B_$5B', label: '$1B - $5B' },
      { value: '$5B', label: '$5B' },
    ]
  },
  market_structure: {
    placeholder: 'Markets that are more heterogeneous require a higher level of customization and investment.',
    options: [
      { value: 'niche', label: 'Niche' },
      { value: 'oligopoly', label: 'Oligopoly' },
      { value: 'heterogeneou', label: 'Many Heterogeneous customers / clients' },
      { value: 'homogeneous', label: 'Many homogeneous customers / clients' },
    ]
  },
  traction: {
    placeholder: 'Net customer growth is among the strongest signals of a promising early-stage company.',
    options: [
      { value: 'no_customers', label: 'No customers yet.' },
      { value: 'sporadic_customer', label: 'Sporadic customer/client growth/it’s too soon to tell.' },
      { value: 'strong_growth', label: 'Strong growth in the first few months, but our growth has slowed down.' },
      { value: 'six_months', label: 'Six months of month-over-month growth, and the growth pace is accelerating.' },
    ]
  },
  partnership_status: {
    placeholder: 'Getting your product to the end payer can be difficult.',
    options: [
      { value: '>100', label: 'Submitted > 100 for collaboration, with some response for additional information.' },
      { value: 'statements_of_work', label: 'Working on a handful of statements of work.' },
      { value: 'signed_partnership', label: 'Have a number of signed partnership agreements.' },
      { value: 'multiple_signed', label: 'Have multiple signed exclusive R&D, licensing, or supply chain partnership agreements.' },
    ]
  },
  developed_idea: {
    placeholder: 'A working prototype substantially decreases production risk, but nothing says “product-market fit” more than revenue.',
    options: [
      { value: 'in_development', label: 'In development' },
      { value: 'pre_revenue', label: 'Pre-revenue, working prototype, being tested by potential customers.' },
      { value: 'sporadic_revenue', label: 'Sporadic revenue.' },
      { value: 'recurring_revenue', label: 'Recurring revenue and / or profits' },
    ]
  },
  business: {
    placeholder: 'The time spent on your business should include the time you spent moonlighting for the business, and/or working on the business during your PhD days.',
    options: [
      { value: '<500', label: '< 500 Hours' },
      { value: '500_2000', label: '500 – 2,000 Hours' },
      { value: '2000_4000', label: '2,000 – 4,000 Hours' },
      { value: '<4000', label: '< 4,000 Hours' },
    ]
  },
  money: {
    placeholder: 'Capture the true costs, including the hours that have gone into the business.',
    options: [
      { value: '<$25K', label: '< $25K' },
      { value: '$25k_$250K', label: '$25k - $250K' },
      { value: '$250K_$1M', label: '$250K - $1M' },
      { value: '>$1M', label: '>$1M' },
    ]
  },
  competitive_advantages: {
    placeholder: 'The more difficult it is to replicate your business, the more attractive your business is to investors',
    options: [
      { value: 'better_design', label: 'Better design / niche focus / better pricing.' },
      { value: 'product_offering', label: 'Better product offering.' },
      { value: 'core_technology', label: 'Better core technology.' },
      { value: 'network_effect', label: 'Proven network effect.' },
    ]
  },
};


