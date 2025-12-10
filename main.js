const app = document.querySelector('#app');

// Navigation state
let currentView = 'home';

// Chart instances
let investmentGrowthChart = null;
let investmentBreakdownChart = null;
let retirementProjectionChart = null;
let retirementBreakdownChart = null;
let mortgageBreakdownChart = null;
let mortgageAmortizationChart = null;
let loanBreakdownChart = null;
let loanAmortizationChart = null;
let retirementSuccessChart = null;
let retirementSuccessDistChart = null;
let compensationBreakdownChart = null;
let compensationComparisonChart = null;
let stressTestChart = null;
let stressTestDrawdownChart = null;
let contributionImpactChart = null;
let contributionComparisonChart = null;

// Calculation results state
const calculationResults = {
  investment: null,
  retirement: null,
  mortgage: null,
  loan: null,
  retirementSuccess: null,
  compensation: null,
  stressTest: null,
  contributionImpact: null
};

// Form input values state
const formInputs = {
  investment: {
    initialInvestment: 10000,
    monthlyContribution: 500,
    returnRate: 7,
    investmentYears: 20
  },
  retirement: {
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    retirementMonthly: 1000,
    retirementReturn: 7,
    desiredIncome: 5000
  },
  mortgage: {
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 250,
    insurance: 100
  },
  loan: {
    loanPrincipal: 10000,
    loanRate: 6.5,
    loanMonths: 60
  },
  retirementSuccess: {
    currentAge: 35,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentPortfolio: 500000,
    annualContribution: 20000,
    retirementSpending: 60000,
    expectedReturn: 7,
    volatility: 15,
    inflationRate: 2.5,
    simulations: 1000
  },
  compensation: {
    baseSalary: 100000,
    targetBonus: 20,
    stockOptions: 50000,
    vestingYears: 4,
    expectedStockGrowth: 10,
    taxBracket: 32,
    stateTax: 5,
    retirementContrib: 10,
    signingBonus: 0
  },
  stressTest: {
    portfolioValue: 500000,
    stockAllocation: 60,
    bondAllocation: 30,
    cashAllocation: 10,
    investmentHorizon: 10,
    stressScenario: 'moderate'
  },
  contributionImpact: {
    initialAmount: 10000,
    baselineContribution: 500,
    increasedContribution: 750,
    aggressiveContribution: 1000,
    returnRate: 7,
    timeHorizon: 30
  }
};

// Theme and customization state
const calculatorSettings = {
  mortgage: {
    theme: 'light',
    logo: 'trending',
    colorPalette: 'blue'
  },
  investment: {
    theme: 'light',
    logo: 'chart',
    colorPalette: 'amber'
  },
  retirement: {
    theme: 'light',
    logo: 'piggy',
    colorPalette: 'rose'
  },
  loan: {
    theme: 'light',
    logo: 'credit',
    colorPalette: 'emerald'
  },
  retirementSuccess: {
    theme: 'light',
    logo: 'chart',
    colorPalette: 'purple'
  },
  compensation: {
    theme: 'light',
    logo: 'diamond',
    colorPalette: 'amber'
  },
  stressTest: {
    theme: 'light',
    logo: 'trending',
    colorPalette: 'rose'
  },
  contributionImpact: {
    theme: 'light',
    logo: 'chart',
    colorPalette: 'teal'
  }
};

const colorPalettes = {
  amber: {
    light: { primary: 'rgb(217, 119, 6)', secondary: 'rgba(217, 119, 6, 0.1)', accent: 'rgb(245, 158, 11)' },
    dark: { primary: 'rgb(245, 158, 11)', secondary: 'rgba(245, 158, 11, 0.1)', accent: 'rgb(217, 119, 6)' }
  },
  rose: {
    light: { primary: 'rgb(225, 29, 72)', secondary: 'rgba(225, 29, 72, 0.1)', accent: 'rgb(244, 63, 94)' },
    dark: { primary: 'rgb(244, 63, 94)', secondary: 'rgba(244, 63, 94, 0.1)', accent: 'rgb(225, 29, 72)' }
  },
  blue: {
    light: { primary: 'rgb(37, 99, 235)', secondary: 'rgba(37, 99, 235, 0.1)', accent: 'rgb(59, 130, 246)' },
    dark: { primary: 'rgb(59, 130, 246)', secondary: 'rgba(59, 130, 246, 0.1)', accent: 'rgb(37, 99, 235)' }
  },
  emerald: {
    light: { primary: 'rgb(5, 150, 105)', secondary: 'rgba(5, 150, 105, 0.1)', accent: 'rgb(16, 185, 129)' },
    dark: { primary: 'rgb(16, 185, 129)', secondary: 'rgba(16, 185, 129, 0.1)', accent: 'rgb(5, 150, 105)' }
  },
  purple: {
    light: { primary: 'rgb(124, 58, 237)', secondary: 'rgba(124, 58, 237, 0.1)', accent: 'rgb(139, 92, 246)' },
    dark: { primary: 'rgb(139, 92, 246)', secondary: 'rgba(139, 92, 246, 0.1)', accent: 'rgb(124, 58, 237)' }
  },
  teal: {
    light: { primary: 'rgb(13, 148, 136)', secondary: 'rgba(13, 148, 136, 0.1)', accent: 'rgb(20, 184, 166)' },
    dark: { primary: 'rgb(20, 184, 166)', secondary: 'rgba(20, 184, 166, 0.1)', accent: 'rgb(13, 148, 136)' }
  }
};

const logos = {
  chart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>',
  piggy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
  trending: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>',
  diamond: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>',
  star: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>',
  credit: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>'
};

// Helper functions
function saveFormInputs(calculator) {
  if (calculator === 'investment') {
    formInputs.investment.initialInvestment = parseFloat(document.getElementById('initialInvestment')?.value || formInputs.investment.initialInvestment);
    formInputs.investment.monthlyContribution = parseFloat(document.getElementById('monthlyContribution')?.value || formInputs.investment.monthlyContribution);
    formInputs.investment.returnRate = parseFloat(document.getElementById('returnRate')?.value || formInputs.investment.returnRate);
    formInputs.investment.investmentYears = parseFloat(document.getElementById('investmentYears')?.value || formInputs.investment.investmentYears);
  } else if (calculator === 'retirement') {
    formInputs.retirement.currentAge = parseFloat(document.getElementById('currentAge')?.value || formInputs.retirement.currentAge);
    formInputs.retirement.retirementAge = parseFloat(document.getElementById('retirementAge')?.value || formInputs.retirement.retirementAge);
    formInputs.retirement.currentSavings = parseFloat(document.getElementById('currentSavings')?.value || formInputs.retirement.currentSavings);
    formInputs.retirement.retirementMonthly = parseFloat(document.getElementById('retirementMonthly')?.value || formInputs.retirement.retirementMonthly);
    formInputs.retirement.retirementReturn = parseFloat(document.getElementById('retirementReturn')?.value || formInputs.retirement.retirementReturn);
    formInputs.retirement.desiredIncome = parseFloat(document.getElementById('desiredIncome')?.value || formInputs.retirement.desiredIncome);
  } else if (calculator === 'mortgage') {
    formInputs.mortgage.loanAmount = parseFloat(document.getElementById('loanAmount')?.value || formInputs.mortgage.loanAmount);
    formInputs.mortgage.interestRate = parseFloat(document.getElementById('interestRate')?.value || formInputs.mortgage.interestRate);
    formInputs.mortgage.loanTerm = parseFloat(document.getElementById('loanTerm')?.value || formInputs.mortgage.loanTerm);
    formInputs.mortgage.propertyTax = parseFloat(document.getElementById('propertyTax')?.value || formInputs.mortgage.propertyTax);
    formInputs.mortgage.insurance = parseFloat(document.getElementById('insurance')?.value || formInputs.mortgage.insurance);
  } else if (calculator === 'loan') {
    formInputs.loan.loanPrincipal = parseFloat(document.getElementById('loanPrincipal')?.value || formInputs.loan.loanPrincipal);
    formInputs.loan.loanRate = parseFloat(document.getElementById('loanRate')?.value || formInputs.loan.loanRate);
    formInputs.loan.loanMonths = parseFloat(document.getElementById('loanMonths')?.value || formInputs.loan.loanMonths);
  } else if (calculator === 'retirementSuccess') {
    formInputs.retirementSuccess.currentAge = parseFloat(document.getElementById('rsCurrentAge')?.value || formInputs.retirementSuccess.currentAge);
    formInputs.retirementSuccess.retirementAge = parseFloat(document.getElementById('rsRetirementAge')?.value || formInputs.retirementSuccess.retirementAge);
    formInputs.retirementSuccess.lifeExpectancy = parseFloat(document.getElementById('rsLifeExpectancy')?.value || formInputs.retirementSuccess.lifeExpectancy);
    formInputs.retirementSuccess.currentPortfolio = parseFloat(document.getElementById('rsCurrentPortfolio')?.value || formInputs.retirementSuccess.currentPortfolio);
    formInputs.retirementSuccess.annualContribution = parseFloat(document.getElementById('rsAnnualContribution')?.value || formInputs.retirementSuccess.annualContribution);
    formInputs.retirementSuccess.retirementSpending = parseFloat(document.getElementById('rsRetirementSpending')?.value || formInputs.retirementSuccess.retirementSpending);
    formInputs.retirementSuccess.expectedReturn = parseFloat(document.getElementById('rsExpectedReturn')?.value || formInputs.retirementSuccess.expectedReturn);
    formInputs.retirementSuccess.volatility = parseFloat(document.getElementById('rsVolatility')?.value || formInputs.retirementSuccess.volatility);
    formInputs.retirementSuccess.inflationRate = parseFloat(document.getElementById('rsInflationRate')?.value || formInputs.retirementSuccess.inflationRate);
    formInputs.retirementSuccess.simulations = parseFloat(document.getElementById('rsSimulations')?.value || formInputs.retirementSuccess.simulations);
  } else if (calculator === 'compensation') {
    formInputs.compensation.baseSalary = parseFloat(document.getElementById('compBaseSalary')?.value || formInputs.compensation.baseSalary);
    formInputs.compensation.targetBonus = parseFloat(document.getElementById('compTargetBonus')?.value || formInputs.compensation.targetBonus);
    formInputs.compensation.stockOptions = parseFloat(document.getElementById('compStockOptions')?.value || formInputs.compensation.stockOptions);
    formInputs.compensation.vestingYears = parseFloat(document.getElementById('compVestingYears')?.value || formInputs.compensation.vestingYears);
    formInputs.compensation.expectedStockGrowth = parseFloat(document.getElementById('compStockGrowth')?.value || formInputs.compensation.expectedStockGrowth);
    formInputs.compensation.taxBracket = parseFloat(document.getElementById('compTaxBracket')?.value || formInputs.compensation.taxBracket);
    formInputs.compensation.stateTax = parseFloat(document.getElementById('compStateTax')?.value || formInputs.compensation.stateTax);
    formInputs.compensation.retirementContrib = parseFloat(document.getElementById('compRetirementContrib')?.value || formInputs.compensation.retirementContrib);
    formInputs.compensation.signingBonus = parseFloat(document.getElementById('compSigningBonus')?.value || formInputs.compensation.signingBonus);
  } else if (calculator === 'stressTest') {
    formInputs.stressTest.portfolioValue = parseFloat(document.getElementById('stPortfolioValue')?.value || formInputs.stressTest.portfolioValue);
    formInputs.stressTest.stockAllocation = parseFloat(document.getElementById('stStockAllocation')?.value || formInputs.stressTest.stockAllocation);
    formInputs.stressTest.bondAllocation = parseFloat(document.getElementById('stBondAllocation')?.value || formInputs.stressTest.bondAllocation);
    formInputs.stressTest.cashAllocation = parseFloat(document.getElementById('stCashAllocation')?.value || formInputs.stressTest.cashAllocation);
    formInputs.stressTest.investmentHorizon = parseFloat(document.getElementById('stInvestmentHorizon')?.value || formInputs.stressTest.investmentHorizon);
    formInputs.stressTest.stressScenario = document.getElementById('stStressScenario')?.value || formInputs.stressTest.stressScenario;
  } else if (calculator === 'contributionImpact') {
    formInputs.contributionImpact.initialAmount = parseFloat(document.getElementById('initialAmount')?.value || formInputs.contributionImpact.initialAmount);
    formInputs.contributionImpact.baselineContribution = parseFloat(document.getElementById('baselineContribution')?.value || formInputs.contributionImpact.baselineContribution);
    formInputs.contributionImpact.increasedContribution = parseFloat(document.getElementById('increasedContribution')?.value || formInputs.contributionImpact.increasedContribution);
    formInputs.contributionImpact.aggressiveContribution = parseFloat(document.getElementById('aggressiveContribution')?.value || formInputs.contributionImpact.aggressiveContribution);
    formInputs.contributionImpact.returnRate = parseFloat(document.getElementById('returnRate')?.value || formInputs.contributionImpact.returnRate);
    formInputs.contributionImpact.timeHorizon = parseFloat(document.getElementById('timeHorizon')?.value || formInputs.contributionImpact.timeHorizon);
  }
}

function restoreFormInputs(calculator) {
  if (calculator === 'investment') {
    document.getElementById('initialInvestment').value = formInputs.investment.initialInvestment;
    document.getElementById('monthlyContribution').value = formInputs.investment.monthlyContribution;
    document.getElementById('returnRate').value = formInputs.investment.returnRate;
    document.getElementById('investmentYears').value = formInputs.investment.investmentYears;
  } else if (calculator === 'retirement') {
    document.getElementById('currentAge').value = formInputs.retirement.currentAge;
    document.getElementById('retirementAge').value = formInputs.retirement.retirementAge;
    document.getElementById('currentSavings').value = formInputs.retirement.currentSavings;
    document.getElementById('retirementMonthly').value = formInputs.retirement.retirementMonthly;
    document.getElementById('retirementReturn').value = formInputs.retirement.retirementReturn;
    document.getElementById('desiredIncome').value = formInputs.retirement.desiredIncome;
  } else if (calculator === 'mortgage') {
    document.getElementById('loanAmount').value = formInputs.mortgage.loanAmount;
    document.getElementById('interestRate').value = formInputs.mortgage.interestRate;
    document.getElementById('loanTerm').value = formInputs.mortgage.loanTerm;
    document.getElementById('propertyTax').value = formInputs.mortgage.propertyTax;
    document.getElementById('insurance').value = formInputs.mortgage.insurance;
  } else if (calculator === 'loan') {
    document.getElementById('loanPrincipal').value = formInputs.loan.loanPrincipal;
    document.getElementById('loanRate').value = formInputs.loan.loanRate;
    document.getElementById('loanMonths').value = formInputs.loan.loanMonths;
  } else if (calculator === 'retirementSuccess') {
    document.getElementById('rsCurrentAge').value = formInputs.retirementSuccess.currentAge;
    document.getElementById('rsRetirementAge').value = formInputs.retirementSuccess.retirementAge;
    document.getElementById('rsLifeExpectancy').value = formInputs.retirementSuccess.lifeExpectancy;
    document.getElementById('rsCurrentPortfolio').value = formInputs.retirementSuccess.currentPortfolio;
    document.getElementById('rsAnnualContribution').value = formInputs.retirementSuccess.annualContribution;
    document.getElementById('rsRetirementSpending').value = formInputs.retirementSuccess.retirementSpending;
    document.getElementById('rsExpectedReturn').value = formInputs.retirementSuccess.expectedReturn;
    document.getElementById('rsVolatility').value = formInputs.retirementSuccess.volatility;
    document.getElementById('rsInflationRate').value = formInputs.retirementSuccess.inflationRate;
    document.getElementById('rsSimulations').value = formInputs.retirementSuccess.simulations;
  } else if (calculator === 'compensation') {
    document.getElementById('compBaseSalary').value = formInputs.compensation.baseSalary;
    document.getElementById('compTargetBonus').value = formInputs.compensation.targetBonus;
    document.getElementById('compStockOptions').value = formInputs.compensation.stockOptions;
    document.getElementById('compVestingYears').value = formInputs.compensation.vestingYears;
    document.getElementById('compStockGrowth').value = formInputs.compensation.expectedStockGrowth;
    document.getElementById('compTaxBracket').value = formInputs.compensation.taxBracket;
    document.getElementById('compStateTax').value = formInputs.compensation.stateTax;
    document.getElementById('compRetirementContrib').value = formInputs.compensation.retirementContrib;
    document.getElementById('compSigningBonus').value = formInputs.compensation.signingBonus;
  } else if (calculator === 'stressTest') {
    document.getElementById('stPortfolioValue').value = formInputs.stressTest.portfolioValue;
    document.getElementById('stStockAllocation').value = formInputs.stressTest.stockAllocation;
    document.getElementById('stBondAllocation').value = formInputs.stressTest.bondAllocation;
    document.getElementById('stCashAllocation').value = formInputs.stressTest.cashAllocation;
    document.getElementById('stInvestmentHorizon').value = formInputs.stressTest.investmentHorizon;
    document.getElementById('stStressScenario').value = formInputs.stressTest.stressScenario;
  } else if (calculator === 'contributionImpact') {
    document.getElementById('initialAmount').value = formInputs.contributionImpact.initialAmount;
    document.getElementById('baselineContribution').value = formInputs.contributionImpact.baselineContribution;
    document.getElementById('increasedContribution').value = formInputs.contributionImpact.increasedContribution;
    document.getElementById('aggressiveContribution').value = formInputs.contributionImpact.aggressiveContribution;
    document.getElementById('returnRate').value = formInputs.contributionImpact.returnRate;
    document.getElementById('timeHorizon').value = formInputs.contributionImpact.timeHorizon;
  }
}

function toggleTheme(calculator) {
  saveFormInputs(calculator);
  calculatorSettings[calculator].theme = calculatorSettings[calculator].theme === 'light' ? 'dark' : 'light';
  if (calculator === 'investment') {
    renderInvestmentCalculator();
  } else if (calculator === 'retirement') {
    renderRetirementCalculator();
  } else if (calculator === 'mortgage') {
    renderMortgageCalculator();
  } else if (calculator === 'loan') {
    renderLoanCalculator();
  } else if (calculator === 'retirementSuccess') {
    renderRetirementSuccessCalculator();
  } else if (calculator === 'compensation') {
    renderCompensationCalculator();
  } else if (calculator === 'stressTest') {
    renderStressTestCalculator();
  } else if (calculator === 'contributionImpact') {
    renderContributionImpactCalculator();
  }
}

function changeColorPalette(calculator, palette) {
  saveFormInputs(calculator);
  calculatorSettings[calculator].colorPalette = palette;
  if (calculator === 'investment') {
    renderInvestmentCalculator();
  } else if (calculator === 'retirement') {
    renderRetirementCalculator();
  } else if (calculator === 'mortgage') {
    renderMortgageCalculator();
  } else if (calculator === 'loan') {
    renderLoanCalculator();
  } else if (calculator === 'retirementSuccess') {
    renderRetirementSuccessCalculator();
  } else if (calculator === 'compensation') {
    renderCompensationCalculator();
  } else if (calculator === 'stressTest') {
    renderStressTestCalculator();
  } else if (calculator === 'contributionImpact') {
    renderContributionImpactCalculator();
  }
}

function changeLogo(calculator, logo) {
  saveFormInputs(calculator);
  calculatorSettings[calculator].logo = logo;
  if (calculator === 'investment') {
    renderInvestmentCalculator();
  } else if (calculator === 'retirement') {
    renderRetirementCalculator();
  } else if (calculator === 'mortgage') {
    renderMortgageCalculator();
  } else if (calculator === 'loan') {
    renderLoanCalculator();
  } else if (calculator === 'retirementSuccess') {
    renderRetirementSuccessCalculator();
  } else if (calculator === 'compensation') {
    renderCompensationCalculator();
  } else if (calculator === 'stressTest') {
    renderStressTestCalculator();
  } else if (calculator === 'contributionImpact') {
    renderContributionImpactCalculator();
  }
}

// Render functions
function renderHome() {
  currentView = 'home';
  app.innerHTML = `
    <div class="min-h-screen py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h1>
          <p class="text-lg text-gray-600">Choose a calculator to get started</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Mortgage Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showMortgageCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Mortgage Calculator</h2>
            </div>
            <p class="text-gray-600">Calculate monthly mortgage payments based on loan amount, interest rate, and term.</p>
          </div>

          <!-- Loan Repayment Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showLoanCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Loan Repayment</h2>
            </div>
            <p class="text-gray-600">Calculate loan repayment schedules and total interest paid over the loan term.</p>
          </div>

          <!-- Investment Growth Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showInvestmentCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-amber-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Investment Growth</h2>
            </div>
            <p class="text-gray-600">Project investment growth using compound interest with regular contributions.</p>
          </div>

          <!-- Retirement Savings Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showRetirementCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-rose-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Retirement Savings</h2>
            </div>
            <p class="text-gray-600">Plan for retirement with pension and savings projections based on your goals.</p>
          </div>

          <!-- Retirement Success Probability Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showRetirementSuccessCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-purple-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Retirement Success</h2>
            </div>
            <p class="text-gray-600">Monte Carlo simulation to calculate the probability of your retirement plan succeeding.</p>
          </div>

          <!-- Compensation/Bonus Optimization Calculator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showCompensationCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-amber-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Compensation Optimizer</h2>
            </div>
            <p class="text-gray-600">Analyze and optimize your total compensation package including salary, bonus, and equity.</p>
          </div>

          <!-- Portfolio Stress-Test Simulator Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showStressTestCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-red-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Portfolio Stress Test</h2>
            </div>
            <p class="text-gray-600">Simulate how your portfolio would perform under various market stress scenarios.</p>
          </div>

          <!-- Contribution Impact Model Card -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6" onclick="window.showContributionImpactCalculator()">
            <div class="flex items-center mb-4">
              <div class="bg-teal-100 rounded-lg p-3">
                <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 ml-4">Contribution Impact</h2>
            </div>
            <p class="text-gray-600">Compare how different contribution amounts affect your long-term investment growth.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Redesigned Mortgage Calculator with 2-column layout
function renderMortgageCalculator() {
  const settings = calculatorSettings.mortgage;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'mortgage';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <!-- Theme and customization controls -->
          <div class="flex gap-3">
            <!-- Theme toggle -->
            <button onclick="window.toggleTheme('mortgage')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <!-- Customization dropdown -->
            <div class="relative">
              <button onclick="document.getElementById('mortgageCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="mortgageCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('mortgage', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('mortgage', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content - 2 columns -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Input Form -->
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Mortgage Calculator</h1>
            </div>

            <form id="mortgageForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Loan Amount</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="loanAmount" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="300000" value="300000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Annual Interest Rate (%)</label>
                <input type="number" id="interestRate" step="0.01" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="4.5" value="4.5">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Loan Term (Years)</label>
                <input type="number" id="loanTerm" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="30" value="30">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Property Tax (Monthly)</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="propertyTax" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="250" value="250">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Home Insurance (Monthly)</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="insurance" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="100" value="100">
                </div>
              </div>

              <button type="submit" class="w-full text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium shadow-lg" style="background: ${palette.primary}">
                Calculate Payment
              </button>
            </form>
          </div>

          <!-- Right Column - Results -->
          <div id="mortgageResults" class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border hidden">
            <h2 class="text-xl font-bold ${textPrimary} mb-4">Results</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Monthly Payment (P&I)</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="monthlyPayment">$0</p>
              </div>
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Total Monthly Payment</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="totalMonthly">$0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Total Interest Paid</p>
                <p class="text-xl font-bold ${textPrimary}" id="totalInterest">$0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Total Amount Paid</p>
                <p class="text-xl font-bold ${textPrimary}" id="totalAmount">$0</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Payment Breakdown</h3>
                <div class="flex justify-center">
                  <canvas id="mortgageBreakdownChart" style="max-height: 250px"></canvas>
                </div>
              </div>

              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="font-semibold ${textPrimary}">Amortization Over Time</h3>
                  <button onclick="window.toggleBreakdown()" class="text-sm px-3 py-1 rounded transition-all hover:opacity-80" style="background: ${palette.secondary}; color: ${palette.primary}">
                    See breakdown of costs
                  </button>
                </div>
                <canvas id="mortgageAmortizationChart"></canvas>
              </div>

              <div id="costBreakdown" class="hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Detailed Cost Breakdown</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between border-b ${borderColor} pb-2">
                    <span class="${textSecondary}">Loan Principal:</span>
                    <span class="font-medium ${textPrimary}" id="breakdownPrincipal">$0</span>
                  </div>
                  <div class="flex justify-between border-b ${borderColor} pb-2">
                    <span class="${textSecondary}">Total Interest:</span>
                    <span class="font-medium ${textPrimary}" id="breakdownInterest">$0</span>
                  </div>
                  <div class="flex justify-between border-b ${borderColor} pb-2">
                    <span class="${textSecondary}">Total Property Tax:</span>
                    <span class="font-medium ${textPrimary}" id="breakdownTax">$0</span>
                  </div>
                  <div class="flex justify-between border-b ${borderColor} pb-2">
                    <span class="${textSecondary}">Total Insurance:</span>
                    <span class="font-medium ${textPrimary}" id="breakdownInsurance">$0</span>
                  </div>
                  <div class="flex justify-between pt-2">
                    <span class="font-bold ${textPrimary}">Total Cost:</span>
                    <span class="font-bold text-lg" style="color: ${palette.primary}" id="breakdownTotal">$0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('mortgageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateMortgage();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('mortgageCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('mortgage');

  if (calculationResults.mortgage) {
    displayMortgageResults();
  } else {
    setTimeout(() => calculateMortgage(), 0);
  }
}

function calculateMortgage() {
  saveFormInputs('mortgage');
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
  const years = parseFloat(document.getElementById('loanTerm').value);
  const propertyTax = parseFloat(document.getElementById('propertyTax').value);
  const insurance = parseFloat(document.getElementById('insurance').value);

  const monthlyRate = annualRate / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalMonthly = monthlyPayment + propertyTax + insurance;
  const totalAmount = monthlyPayment * numberOfPayments;
  const totalInterest = totalAmount - loanAmount;
  const totalTax = propertyTax * numberOfPayments;
  const totalInsurance = insurance * numberOfPayments;
  const grandTotal = totalAmount + totalTax + totalInsurance;

  // Generate amortization data
  const labels = [];
  const principalData = [];
  const interestData = [];
  let remainingBalance = loanAmount;

  const yearInterval = years > 20 ? 5 : years > 10 ? 2 : 1;

  for (let year = 0; year <= years; year += yearInterval) {
    labels.push(`Year ${year}`);

    if (year === 0) {
      principalData.push(0);
      interestData.push(0);
    } else {
      let totalPrincipalPaid = 0;
      let totalInterestPaid = 0;

      for (let month = 1; month <= year * 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;

        totalPrincipalPaid += principalPayment;
        totalInterestPaid += interestPayment;
        remainingBalance -= principalPayment;
      }

      principalData.push(totalPrincipalPaid);
      interestData.push(totalInterestPaid);
      remainingBalance = loanAmount;
    }
  }

  calculationResults.mortgage = {
    loanAmount,
    monthlyPayment,
    totalMonthly,
    totalInterest,
    totalAmount,
    totalTax,
    totalInsurance,
    grandTotal,
    labels,
    principalData,
    interestData
  };

  displayMortgageResults();
}

function displayMortgageResults() {
  if (!calculationResults.mortgage) return;

  const { loanAmount, monthlyPayment, totalMonthly, totalInterest, totalAmount, totalTax, totalInsurance, grandTotal, labels, principalData, interestData } = calculationResults.mortgage;

  document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalMonthly').textContent = '$' + totalMonthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalAmount').textContent = '$' + totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('breakdownPrincipal').textContent = '$' + loanAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('breakdownInterest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('breakdownTax').textContent = '$' + totalTax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('breakdownInsurance').textContent = '$' + totalInsurance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('breakdownTotal').textContent = '$' + grandTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('mortgageResults').classList.remove('hidden');

  const settings = calculatorSettings.mortgage;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (mortgageBreakdownChart) {
    mortgageBreakdownChart.destroy();
  }
  if (mortgageAmortizationChart) {
    mortgageAmortizationChart.destroy();
  }

  const breakdownCtx = document.getElementById('mortgageBreakdownChart').getContext('2d');
  mortgageBreakdownChart = new Chart(breakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest', 'Property Tax', 'Insurance'],
      datasets: [{
        data: [loanAmount, totalInterest, totalTax, totalInsurance],
        backgroundColor: [
          palette.primary,
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          palette.primary,
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              label += '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (' + percentage + '%)';
              return label;
            }
          }
        }
      }
    }
  });

  const amortCtx = document.getElementById('mortgageAmortizationChart').getContext('2d');
  mortgageAmortizationChart = new Chart(amortCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Principal Paid',
          data: principalData,
          borderColor: palette.primary,
          backgroundColor: palette.secondary,
          fill: true,
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Interest Paid',
          data: interestData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + context.parsed.y.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      }
    }
  });
}

function toggleBreakdown() {
  const breakdown = document.getElementById('costBreakdown');
  breakdown.classList.toggle('hidden');
}

function calculateInvestment() {
  saveFormInputs('investment');
  const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
  const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
  const annualRate = parseFloat(document.getElementById('returnRate').value) / 100;
  const years = parseFloat(document.getElementById('investmentYears').value);

  const monthlyRate = annualRate / 12;
  const months = years * 12;

  let balance = initialInvestment;
  const balanceOverTime = [initialInvestment];
  const labels = ['Year 0'];

  for (let month = 1; month <= months; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;

    if (month % 12 === 0) {
      balanceOverTime.push(balance);
      labels.push(`Year ${month / 12}`);
    }
  }

  const totalContributions = initialInvestment + (monthlyContribution * months);
  const totalEarnings = balance - totalContributions;
  const roi = ((totalEarnings / totalContributions) * 100).toFixed(2);

  calculationResults.investment = {
    balance,
    totalContributions,
    totalEarnings,
    roi,
    balanceOverTime,
    labels
  };

  displayInvestmentResults();
}

function displayInvestmentResults() {
  if (!calculationResults.investment) return;

  const { balance, totalContributions, totalEarnings, roi, balanceOverTime, labels } = calculationResults.investment;

  document.getElementById('finalBalance').textContent = '$' + balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalEarnings').textContent = '$' + totalEarnings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('totalContributions').textContent = '$' + totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('roi').textContent = roi + '%';

  document.getElementById('investmentResults').classList.remove('hidden');

  const settings = calculatorSettings.investment;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (investmentGrowthChart) {
    investmentGrowthChart.destroy();
  }
  if (investmentBreakdownChart) {
    investmentBreakdownChart.destroy();
  }

  const growthCtx = document.getElementById('investmentGrowthChart').getContext('2d');
  investmentGrowthChart = new Chart(growthCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Investment Value',
        data: balanceOverTime,
        borderColor: palette.primary,
        backgroundColor: palette.secondary,
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Balance: $' + context.parsed.y.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      }
    }
  });

  const breakdownCtx = document.getElementById('investmentBreakdownChart').getContext('2d');
  investmentBreakdownChart = new Chart(breakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Contributions', 'Investment Earnings'],
      datasets: [{
        data: [totalContributions, totalEarnings],
        backgroundColor: [
          palette.primary,
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          palette.primary,
          'rgb(16, 185, 129)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              label += '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (' + percentage + '%)';
              return label;
            }
          }
        }
      }
    }
  });
}

function calculateRetirement() {
  saveFormInputs('retirement');
  const currentAge = parseFloat(document.getElementById('currentAge').value);
  const retirementAge = parseFloat(document.getElementById('retirementAge').value);
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const monthlyContribution = parseFloat(document.getElementById('retirementMonthly').value);
  const annualRate = parseFloat(document.getElementById('retirementReturn').value) / 100;
  const desiredIncome = parseFloat(document.getElementById('desiredIncome').value);

  const yearsUntilRetirement = retirementAge - currentAge;
  const monthlyRate = annualRate / 12;
  const months = yearsUntilRetirement * 12;

  let balance = currentSavings;
  const balanceOverTime = [currentSavings];
  const labels = [`Age ${currentAge}`];

  for (let month = 1; month <= months; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;

    if (month % 12 === 0) {
      balanceOverTime.push(balance);
      labels.push(`Age ${currentAge + (month / 12)}`);
    }
  }

  const totalContributions = currentSavings + (monthlyContribution * months);
  const investmentGrowth = balance - totalContributions;

  const sustainableWithdrawal = (balance * 0.04) / 12;
  const retirementYears = balance / (desiredIncome * 12);

  calculationResults.retirement = {
    balance,
    yearsUntilRetirement,
    totalContributions,
    investmentGrowth,
    desiredIncome,
    retirementYears,
    sustainableWithdrawal,
    balanceOverTime,
    labels
  };

  displayRetirementResults();
}

function displayRetirementResults() {
  if (!calculationResults.retirement) return;

  const { balance, yearsUntilRetirement, totalContributions, investmentGrowth, desiredIncome, retirementYears, sustainableWithdrawal, balanceOverTime, labels } = calculationResults.retirement;

  document.getElementById('retirementTotal').textContent = '$' + balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('yearsToRetirement').textContent = yearsUntilRetirement;
  document.getElementById('retirementContributions').textContent = '$' + totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('retirementGrowth').textContent = '$' + investmentGrowth.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('incomeNeeded').textContent = '$' + desiredIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('retirementYears').textContent = retirementYears.toFixed(1) + ' years';
  document.getElementById('sustainableWithdrawal').textContent = '$' + sustainableWithdrawal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const statusDiv = document.getElementById('retirementStatus');
  const statusMessage = document.getElementById('statusMessage');

  if (sustainableWithdrawal >= desiredIncome) {
    statusDiv.className = 'p-4 rounded-lg bg-green-100 border border-green-300';
    statusMessage.className = 'text-sm font-medium text-green-800';
    statusMessage.textContent = 'You are on track! Your retirement savings can support your desired income.';
  } else {
    statusDiv.className = 'p-4 rounded-lg bg-yellow-100 border border-yellow-300';
    statusMessage.className = 'text-sm font-medium text-yellow-800';
    const shortfall = desiredIncome - sustainableWithdrawal;
    statusMessage.textContent = `You may need to save more. Current shortfall: $${shortfall.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per month.`;
  }

  document.getElementById('retirementResults').classList.remove('hidden');

  const settings = calculatorSettings.retirement;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (retirementProjectionChart) {
    retirementProjectionChart.destroy();
  }
  if (retirementBreakdownChart) {
    retirementBreakdownChart.destroy();
  }

  const projectionCtx = document.getElementById('retirementProjectionChart').getContext('2d');
  retirementProjectionChart = new Chart(projectionCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Retirement Savings',
        data: balanceOverTime,
        borderColor: palette.primary,
        backgroundColor: palette.secondary,
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Balance: $' + context.parsed.y.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      }
    }
  });

  const breakdownCtx = document.getElementById('retirementBreakdownChart').getContext('2d');
  retirementBreakdownChart = new Chart(breakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Contributions', 'Investment Growth'],
      datasets: [{
        data: [totalContributions, investmentGrowth],
        backgroundColor: [
          palette.primary,
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          palette.primary,
          'rgb(16, 185, 129)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              label += '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (' + percentage + '%)';
              return label;
            }
          }
        }
      }
    }
  });
}

function renderLoanCalculator() {
  const settings = calculatorSettings.loan;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'loan';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <div class="flex gap-3">
            <button onclick="window.toggleTheme('loan')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <div class="relative">
              <button onclick="document.getElementById('loanCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="loanCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('loan', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('loan', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Loan Calculator</h1>
            </div>

            <form id="loanForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Loan Amount</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="loanPrincipal" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="10000" value="10000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Annual Interest Rate (%)</label>
                <input type="number" id="loanRate" step="0.01" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="6.5" value="6.5">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Loan Term (Months)</label>
                <input type="number" id="loanMonths" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="60" value="60">
              </div>

              <button type="submit" class="w-full py-3 rounded-lg transition-all font-medium text-white hover:opacity-90" style="background: ${palette.primary}">
                Calculate Loan
              </button>
            </form>
          </div>

          <div id="loanResults" class="hidden ${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <h2 class="text-xl font-bold ${textPrimary} mb-6">Loan Summary</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Monthly Payment</p>
                <p class="text-2xl font-bold ${textPrimary}" id="loanMonthlyPayment">$0</p>
              </div>
              <div class="p-4 rounded-lg ${borderColor} border">
                <p class="text-sm ${textSecondary} mb-1">Total Interest</p>
                <p class="text-xl font-bold ${textPrimary}" id="loanTotalInterest">$0</p>
              </div>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">Payment Breakdown</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">Principal Amount:</span>
                  <span class="${textPrimary} font-medium" id="summaryPrincipal">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Interest Paid:</span>
                  <span class="${textPrimary} font-medium" id="summaryInterest">$0</span>
                </div>
                <div class="flex justify-between border-t ${borderColor} pt-2 mt-2">
                  <span class="${textPrimary} font-semibold">Total Repayment:</span>
                  <span class="${textPrimary} font-bold" id="summaryTotal">$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-semibold ${textPrimary} mb-3">Payment Distribution</h3>
              <canvas id="loanBreakdownChart"></canvas>
            </div>

            <div>
              <h3 class="font-semibold ${textPrimary} mb-3">Balance Over Time</h3>
              <canvas id="loanAmortizationChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('loanForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateLoan();
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('loanCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('loan');

  if (calculationResults.loan) {
    displayLoanResults();
  } else {
    setTimeout(() => calculateLoan(), 0);
  }
}

function calculateLoan() {
  saveFormInputs('loan');
  const principal = parseFloat(document.getElementById('loanPrincipal').value);
  const annualRate = parseFloat(document.getElementById('loanRate').value) / 100;
  const months = parseFloat(document.getElementById('loanMonths').value);

  const monthlyRate = annualRate / 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - principal;

  const labels = [];
  const balanceData = [];
  const principalPaidData = [];
  const interestPaidData = [];
  let remainingBalance = principal;

  const monthInterval = months > 48 ? 12 : months > 24 ? 6 : months > 12 ? 3 : 1;

  for (let month = 0; month <= months; month += monthInterval) {
    labels.push(month === 0 ? 'Start' : `Month ${month}`);

    if (month === 0) {
      balanceData.push(principal);
      principalPaidData.push(0);
      interestPaidData.push(0);
    } else {
      let tempBalance = principal;
      let totalPrincipalPaid = 0;
      let totalInterestPaid = 0;

      for (let m = 1; m <= month; m++) {
        const interestPayment = tempBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        totalPrincipalPaid += principalPayment;
        totalInterestPaid += interestPayment;
        tempBalance -= principalPayment;
      }

      balanceData.push(Math.max(0, tempBalance));
      principalPaidData.push(totalPrincipalPaid);
      interestPaidData.push(totalInterestPaid);
    }
  }

  calculationResults.loan = {
    principal,
    monthlyPayment,
    totalInterest,
    totalPaid,
    labels,
    balanceData,
    principalPaidData,
    interestPaidData
  };

  displayLoanResults();
}

function displayLoanResults() {
  if (!calculationResults.loan) return;

  const { principal, monthlyPayment, totalInterest, totalPaid, labels, balanceData } = calculationResults.loan;

  document.getElementById('loanMonthlyPayment').textContent = '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('loanTotalInterest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('summaryPrincipal').textContent = '$' + principal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('summaryInterest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('summaryTotal').textContent = '$' + totalPaid.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('loanResults').classList.remove('hidden');

  const settings = calculatorSettings.loan;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (loanBreakdownChart) {
    loanBreakdownChart.destroy();
  }
  if (loanAmortizationChart) {
    loanAmortizationChart.destroy();
  }

  const breakdownCtx = document.getElementById('loanBreakdownChart').getContext('2d');
  loanBreakdownChart = new Chart(breakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, totalInterest],
        backgroundColor: [
          palette.primary,
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          palette.primary,
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              label += '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (' + percentage + '%)';
              return label;
            }
          }
        }
      }
    }
  });

  const amortCtx = document.getElementById('loanAmortizationChart').getContext('2d');
  loanAmortizationChart = new Chart(amortCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Remaining Balance',
        data: balanceData,
        borderColor: palette.primary,
        backgroundColor: palette.secondary,
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Balance: $' + context.parsed.y.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        }
      }
    }
  });
}

// Redesigned Investment Calculator with 2-column layout
function renderInvestmentCalculator() {
  const settings = calculatorSettings.investment;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'investment';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <!-- Theme and customization controls -->
          <div class="flex gap-3">
            <!-- Theme toggle -->
            <button onclick="window.toggleTheme('investment')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <!-- Customization dropdown -->
            <div class="relative">
              <button onclick="document.getElementById('customDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="customDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('investment', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('investment', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content - 2 columns -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Input Form -->
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Investment Growth Calculator</h1>
            </div>

            <form id="investmentForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Initial Investment</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="initialInvestment" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" style="focus:ring-color: ${palette.primary}" placeholder="10000" value="10000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Monthly Contribution</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="monthlyContribution" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="500" value="500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Annual Return Rate (%)</label>
                <input type="number" id="returnRate" step="0.01" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="7" value="7">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Investment Period (Years)</label>
                <input type="number" id="investmentYears" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="20" value="20">
              </div>

              <button type="submit" class="w-full text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium shadow-lg" style="background: ${palette.primary}">
                Calculate Growth
              </button>
            </form>
          </div>

          <!-- Right Column - Results -->
          <div id="investmentResults" class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border hidden">
            <h2 class="text-xl font-bold ${textPrimary} mb-4">Results</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Final Balance</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="finalBalance">$0</p>
              </div>
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Total Earnings</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="totalEarnings">$0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Total Contributions</p>
                <p class="text-xl font-bold ${textPrimary}" id="totalContributions">$0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Return on Investment</p>
                <p class="text-xl font-bold ${textPrimary}" id="roi">0%</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Growth Over Time</h3>
                <canvas id="investmentGrowthChart"></canvas>
              </div>

              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Investment Breakdown</h3>
                <div class="flex justify-center">
                  <canvas id="investmentBreakdownChart" style="max-height: 250px"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('investmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateInvestment();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('customDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('investment');

  if (calculationResults.investment) {
    displayInvestmentResults();
  } else {
    setTimeout(() => calculateInvestment(), 0);
  }
}
// Redesigned Retirement Calculator with 2-column layout
function renderRetirementCalculator() {
  const settings = calculatorSettings.retirement;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'retirement';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <!-- Theme and customization controls -->
          <div class="flex gap-3">
            <!-- Theme toggle -->
            <button onclick="window.toggleTheme('retirement')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <!-- Customization dropdown -->
            <div class="relative">
              <button onclick="document.getElementById('retirementCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="retirementCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('retirement', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('retirement', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content - 2 columns -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Input Form -->
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Retirement Savings Calculator</h1>
            </div>

            <form id="retirementForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Current Age</label>
                <input type="number" id="currentAge" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="30" value="30">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Retirement Age</label>
                <input type="number" id="retirementAge" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="65" value="65">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Current Savings</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="currentSavings" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="50000" value="50000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Monthly Contribution</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="retirementMonthly" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="1000" value="1000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Expected Annual Return (%)</label>
                <input type="number" id="retirementReturn" step="0.01" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="6" value="6">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Desired Monthly Income in Retirement</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="desiredIncome" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" placeholder="5000" value="5000">
                </div>
              </div>

              <button type="submit" class="w-full text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium shadow-lg" style="background: ${palette.primary}">
                Calculate Retirement
              </button>
            </form>
          </div>

          <!-- Right Column - Results -->
          <div id="retirementResults" class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border hidden">
            <h2 class="text-xl font-bold ${textPrimary} mb-4">Retirement Projection</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Total at Retirement</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="retirementTotal">$0</p>
              </div>
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Years Until Retirement</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="yearsToRetirement">0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Total Contributions</p>
                <p class="text-xl font-bold ${textPrimary}" id="retirementContributions">$0</p>
              </div>
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <p class="text-sm ${textSecondary} mb-1">Investment Growth</p>
                <p class="text-xl font-bold ${textPrimary}" id="retirementGrowth">$0</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Savings Growth Until Retirement</h3>
                <canvas id="retirementProjectionChart"></canvas>
              </div>

              <div class="${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg">
                <h3 class="font-semibold ${textPrimary} mb-3">Retirement Fund Composition</h3>
                <div class="flex justify-center">
                  <canvas id="retirementBreakdownChart" style="max-height: 250px"></canvas>
                </div>
              </div>

              <div class="${theme === 'dark' ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border p-4 rounded-lg">
                <h3 class="font-semibold ${theme === 'dark' ? 'text-blue-200' : 'text-blue-900'} mb-2">Income Analysis</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}">Monthly Income Needed:</span>
                    <span class="font-medium ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}" id="incomeNeeded">$0</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}">Years of Retirement Funding (4% rule):</span>
                    <span class="font-medium ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}" id="retirementYears">0</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}">Sustainable Monthly Withdrawal:</span>
                    <span class="font-medium ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}" id="sustainableWithdrawal">$0</span>
                  </div>
                </div>
              </div>

              <div id="retirementStatus" class="p-4 rounded-lg">
                <p class="text-sm font-medium" id="statusMessage"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('retirementForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateRetirement();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('retirementCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('retirement');

  if (calculationResults.retirement) {
    displayRetirementResults();
  } else {
    setTimeout(() => calculateRetirement(), 0);
  }
}

// Retirement Success Probability Calculator (Monte Carlo Simulation)
function renderRetirementSuccessCalculator() {
  const settings = calculatorSettings.retirementSuccess;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'retirementSuccess';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <div class="flex gap-3">
            <button onclick="window.toggleTheme('retirementSuccess')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <div class="relative">
              <button onclick="document.getElementById('rsCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="rsCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('retirementSuccess', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('retirementSuccess', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Retirement Success Probability</h1>
            </div>

            <form id="retirementSuccessForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Current Age</label>
                  <input type="number" id="rsCurrentAge" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="35">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Retirement Age</label>
                  <input type="number" id="rsRetirementAge" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="65">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Life Expectancy</label>
                <input type="number" id="rsLifeExpectancy" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="90">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Current Portfolio Value</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="rsCurrentPortfolio" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="500000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Annual Contribution (Until Retirement)</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="rsAnnualContribution" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="20000">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Annual Retirement Spending</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="rsRetirementSpending" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="60000">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Expected Return (%)</label>
                  <input type="number" id="rsExpectedReturn" step="0.1" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="7">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Volatility (%)</label>
                  <input type="number" id="rsVolatility" step="0.1" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="15">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Inflation Rate (%)</label>
                  <input type="number" id="rsInflationRate" step="0.1" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="2.5">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Simulations</label>
                  <input type="number" id="rsSimulations" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="1000">
                </div>
              </div>

              <button type="submit" class="w-full py-3 rounded-lg transition-all font-medium text-white hover:opacity-90" style="background: ${palette.primary}">
                Run Monte Carlo Simulation
              </button>
            </form>
          </div>

          <div id="rsResults" class="hidden ${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <h2 class="text-xl font-bold ${textPrimary} mb-6">Simulation Results</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Success Rate</p>
                <p class="text-3xl font-bold" style="color: ${palette.primary}" id="rsSuccessRate">0%</p>
              </div>
              <div class="p-4 rounded-lg ${borderColor} border">
                <p class="text-sm ${textSecondary} mb-1">Median Final Balance</p>
                <p class="text-xl font-bold ${textPrimary}" id="rsMedianBalance">$0</p>
              </div>
            </div>

            <div id="rsStatusDiv" class="p-4 rounded-lg mb-6">
              <p class="text-sm font-medium" id="rsStatusMessage"></p>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">Percentile Outcomes at End of Plan</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">10th Percentile (Poor):</span>
                  <span class="${textPrimary} font-medium" id="rsP10">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">25th Percentile:</span>
                  <span class="${textPrimary} font-medium" id="rsP25">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">50th Percentile (Median):</span>
                  <span class="${textPrimary} font-medium" id="rsP50">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">75th Percentile:</span>
                  <span class="${textPrimary} font-medium" id="rsP75">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">90th Percentile (Great):</span>
                  <span class="${textPrimary} font-medium" id="rsP90">$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-semibold ${textPrimary} mb-3">Portfolio Projection Bands</h3>
              <canvas id="retirementSuccessChart"></canvas>
            </div>

            <div>
              <h3 class="font-semibold ${textPrimary} mb-3">Final Balance Distribution</h3>
              <canvas id="retirementSuccessDistChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('retirementSuccessForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateRetirementSuccess();
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('rsCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('retirementSuccess');

  if (calculationResults.retirementSuccess) {
    displayRetirementSuccessResults();
  } else {
    setTimeout(() => calculateRetirementSuccess(), 0);
  }
}

function calculateRetirementSuccess() {
  saveFormInputs('retirementSuccess');

  const currentAge = parseFloat(document.getElementById('rsCurrentAge').value);
  const retirementAge = parseFloat(document.getElementById('rsRetirementAge').value);
  const lifeExpectancy = parseFloat(document.getElementById('rsLifeExpectancy').value);
  const currentPortfolio = parseFloat(document.getElementById('rsCurrentPortfolio').value);
  const annualContribution = parseFloat(document.getElementById('rsAnnualContribution').value);
  const retirementSpending = parseFloat(document.getElementById('rsRetirementSpending').value);
  const expectedReturn = parseFloat(document.getElementById('rsExpectedReturn').value) / 100;
  const volatility = parseFloat(document.getElementById('rsVolatility').value) / 100;
  const inflationRate = parseFloat(document.getElementById('rsInflationRate').value) / 100;
  const numSimulations = parseInt(document.getElementById('rsSimulations').value);

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const totalYears = lifeExpectancy - currentAge;

  const finalBalances = [];
  const allPaths = [];

  // Monte Carlo simulation
  for (let sim = 0; sim < numSimulations; sim++) {
    let balance = currentPortfolio;
    let spending = retirementSpending;
    const path = [balance];

    for (let year = 1; year <= totalYears; year++) {
      // Generate random return using Box-Muller transform
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const yearReturn = expectedReturn + volatility * z;

      if (year <= yearsToRetirement) {
        // Accumulation phase
        balance = balance * (1 + yearReturn) + annualContribution;
      } else {
        // Withdrawal phase - adjust spending for inflation
        spending = retirementSpending * Math.pow(1 + inflationRate, year - yearsToRetirement);
        balance = balance * (1 + yearReturn) - spending;
      }

      balance = Math.max(0, balance);
      path.push(balance);
    }

    finalBalances.push(balance);
    allPaths.push(path);
  }

  // Calculate statistics
  finalBalances.sort((a, b) => a - b);
  const successCount = finalBalances.filter(b => b > 0).length;
  const successRate = (successCount / numSimulations) * 100;

  const p10 = finalBalances[Math.floor(numSimulations * 0.1)];
  const p25 = finalBalances[Math.floor(numSimulations * 0.25)];
  const p50 = finalBalances[Math.floor(numSimulations * 0.5)];
  const p75 = finalBalances[Math.floor(numSimulations * 0.75)];
  const p90 = finalBalances[Math.floor(numSimulations * 0.9)];

  // Calculate percentile paths for chart
  const labels = [];
  for (let year = 0; year <= totalYears; year++) {
    labels.push(`Age ${currentAge + year}`);
  }

  const p10Path = [];
  const p25Path = [];
  const p50Path = [];
  const p75Path = [];
  const p90Path = [];

  for (let year = 0; year <= totalYears; year++) {
    const yearBalances = allPaths.map(path => path[year]).sort((a, b) => a - b);
    p10Path.push(yearBalances[Math.floor(numSimulations * 0.1)]);
    p25Path.push(yearBalances[Math.floor(numSimulations * 0.25)]);
    p50Path.push(yearBalances[Math.floor(numSimulations * 0.5)]);
    p75Path.push(yearBalances[Math.floor(numSimulations * 0.75)]);
    p90Path.push(yearBalances[Math.floor(numSimulations * 0.9)]);
  }

  // Create distribution histogram data
  const histogramBins = 20;
  const maxBalance = Math.max(...finalBalances);
  const minBalance = Math.min(...finalBalances);
  const binSize = (maxBalance - minBalance) / histogramBins;
  const histogram = new Array(histogramBins).fill(0);
  const histogramLabels = [];

  for (let i = 0; i < histogramBins; i++) {
    const binStart = minBalance + i * binSize;
    histogramLabels.push('$' + (binStart / 1000).toFixed(0) + 'K');
  }

  finalBalances.forEach(balance => {
    const binIndex = Math.min(Math.floor((balance - minBalance) / binSize), histogramBins - 1);
    histogram[binIndex]++;
  });

  calculationResults.retirementSuccess = {
    successRate,
    p10, p25, p50, p75, p90,
    labels,
    p10Path, p25Path, p50Path, p75Path, p90Path,
    histogram,
    histogramLabels,
    retirementAge,
    currentAge
  };

  displayRetirementSuccessResults();
}

function displayRetirementSuccessResults() {
  if (!calculationResults.retirementSuccess) return;

  const { successRate, p10, p25, p50, p75, p90, labels, p10Path, p25Path, p50Path, p75Path, p90Path, histogram, histogramLabels, retirementAge, currentAge } = calculationResults.retirementSuccess;

  const formatMoney = (val) => '$' + val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('rsSuccessRate').textContent = successRate.toFixed(1) + '%';
  document.getElementById('rsMedianBalance').textContent = formatMoney(p50);
  document.getElementById('rsP10').textContent = formatMoney(p10);
  document.getElementById('rsP25').textContent = formatMoney(p25);
  document.getElementById('rsP50').textContent = formatMoney(p50);
  document.getElementById('rsP75').textContent = formatMoney(p75);
  document.getElementById('rsP90').textContent = formatMoney(p90);

  const statusDiv = document.getElementById('rsStatusDiv');
  const statusMessage = document.getElementById('rsStatusMessage');

  if (successRate >= 90) {
    statusDiv.className = 'p-4 rounded-lg bg-green-100 border border-green-300';
    statusMessage.className = 'text-sm font-medium text-green-800';
    statusMessage.textContent = 'Excellent! Your retirement plan has a very high probability of success.';
  } else if (successRate >= 75) {
    statusDiv.className = 'p-4 rounded-lg bg-blue-100 border border-blue-300';
    statusMessage.className = 'text-sm font-medium text-blue-800';
    statusMessage.textContent = 'Good. Your plan has a reasonable chance of success, but consider increasing savings or reducing spending.';
  } else if (successRate >= 50) {
    statusDiv.className = 'p-4 rounded-lg bg-yellow-100 border border-yellow-300';
    statusMessage.className = 'text-sm font-medium text-yellow-800';
    statusMessage.textContent = 'Caution. Your plan has significant risk of failure. Consider adjusting your assumptions.';
  } else {
    statusDiv.className = 'p-4 rounded-lg bg-red-100 border border-red-300';
    statusMessage.className = 'text-sm font-medium text-red-800';
    statusMessage.textContent = 'Warning! Your retirement plan has a high probability of running out of money. Major adjustments needed.';
  }

  document.getElementById('rsResults').classList.remove('hidden');

  const settings = calculatorSettings.retirementSuccess;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (retirementSuccessChart) retirementSuccessChart.destroy();
  if (retirementSuccessDistChart) retirementSuccessDistChart.destroy();

  const retirementIndex = retirementAge - currentAge;

  const ctx = document.getElementById('retirementSuccessChart').getContext('2d');
  retirementSuccessChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '90th Percentile',
          data: p90Path,
          borderColor: 'rgba(16, 185, 129, 0.8)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: '+1',
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 0
        },
        {
          label: '75th Percentile',
          data: p75Path,
          borderColor: 'rgba(59, 130, 246, 0.8)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: '+1',
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 0
        },
        {
          label: '50th Percentile (Median)',
          data: p50Path,
          borderColor: palette.primary,
          backgroundColor: palette.secondary,
          fill: false,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 0
        },
        {
          label: '25th Percentile',
          data: p25Path,
          borderColor: 'rgba(245, 158, 11, 0.8)',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: '+1',
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 0
        },
        {
          label: '10th Percentile',
          data: p10Path,
          borderColor: 'rgba(239, 68, 68, 0.8)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 1,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          }
        },
        annotation: {
          annotations: {
            retirementLine: {
              type: 'line',
              xMin: retirementIndex,
              xMax: retirementIndex,
              borderColor: 'rgba(0, 0, 0, 0.3)',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'Retirement',
                position: 'start'
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            }
          }
        }
      }
    }
  });

  const distCtx = document.getElementById('retirementSuccessDistChart').getContext('2d');
  retirementSuccessDistChart = new Chart(distCtx, {
    type: 'bar',
    data: {
      labels: histogramLabels,
      datasets: [{
        label: 'Frequency',
        data: histogram,
        backgroundColor: palette.primary,
        borderColor: palette.primary,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Simulations' }
        },
        x: {
          title: { display: true, text: 'Final Portfolio Value' }
        }
      }
    }
  });
}

// Compensation/Bonus Optimization Calculator
function renderCompensationCalculator() {
  const settings = calculatorSettings.compensation;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'compensation';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <div class="flex gap-3">
            <button onclick="window.toggleTheme('compensation')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <div class="relative">
              <button onclick="document.getElementById('compCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="compCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('compensation', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('compensation', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Compensation Optimizer</h1>
            </div>

            <form id="compensationForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Base Salary</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="compBaseSalary" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="100000">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Target Bonus (%)</label>
                  <input type="number" id="compTargetBonus" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="20">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Signing Bonus</label>
                  <div class="relative">
                    <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                    <input type="number" id="compSigningBonus" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="0">
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Stock Options/RSU Value</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="compStockOptions" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="50000">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Vesting Period (Years)</label>
                  <input type="number" id="compVestingYears" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="4">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Expected Stock Growth (%)</label>
                  <input type="number" id="compStockGrowth" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="10">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">Federal Tax Bracket (%)</label>
                  <input type="number" id="compTaxBracket" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="32">
                </div>
                <div>
                  <label class="block text-sm font-medium ${textSecondary} mb-2">State Tax (%)</label>
                  <input type="number" id="compStateTax" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="5">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">401(k) Contribution (%)</label>
                <input type="number" id="compRetirementContrib" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="10">
              </div>

              <button type="submit" class="w-full py-3 rounded-lg transition-all font-medium text-white hover:opacity-90" style="background: ${palette.primary}">
                Analyze Compensation
              </button>
            </form>
          </div>

          <div id="compResults" class="hidden ${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <h2 class="text-xl font-bold ${textPrimary} mb-6">Compensation Analysis</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Total Comp (Year 1)</p>
                <p class="text-2xl font-bold" style="color: ${palette.primary}" id="compTotalYear1">$0</p>
              </div>
              <div class="p-4 rounded-lg ${borderColor} border">
                <p class="text-sm ${textSecondary} mb-1">4-Year Total</p>
                <p class="text-xl font-bold ${textPrimary}" id="compTotal4Year">$0</p>
              </div>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">Annual Breakdown (Year 1)</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">Base Salary:</span>
                  <span class="${textPrimary} font-medium" id="compBreakBase">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Expected Bonus:</span>
                  <span class="${textPrimary} font-medium" id="compBreakBonus">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Signing Bonus:</span>
                  <span class="${textPrimary} font-medium" id="compBreakSigning">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Stock Vesting (Year 1):</span>
                  <span class="${textPrimary} font-medium" id="compBreakStock">$0</span>
                </div>
                <div class="flex justify-between border-t ${borderColor} pt-2 mt-2">
                  <span class="${textPrimary} font-semibold">Gross Total:</span>
                  <span class="${textPrimary} font-bold" id="compBreakGross">$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">After-Tax Analysis</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">Estimated Taxes:</span>
                  <span class="text-red-500 font-medium" id="compTaxes">-$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">401(k) Contribution:</span>
                  <span class="text-blue-500 font-medium" id="comp401k">-$0</span>
                </div>
                <div class="flex justify-between border-t ${borderColor} pt-2 mt-2">
                  <span class="${textPrimary} font-semibold">Take-Home Pay (Annual):</span>
                  <span style="color: ${palette.primary}" class="font-bold" id="compTakeHome">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Monthly Take-Home:</span>
                  <span class="${textPrimary} font-medium" id="compMonthly">$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-semibold ${textPrimary} mb-3">Compensation Breakdown</h3>
              <canvas id="compensationBreakdownChart"></canvas>
            </div>

            <div>
              <h3 class="font-semibold ${textPrimary} mb-3">4-Year Projection</h3>
              <canvas id="compensationComparisonChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('compensationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateCompensation();
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('compCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('compensation');

  if (calculationResults.compensation) {
    displayCompensationResults();
  } else {
    setTimeout(() => calculateCompensation(), 0);
  }
}

function calculateCompensation() {
  saveFormInputs('compensation');

  const baseSalary = parseFloat(document.getElementById('compBaseSalary').value);
  const targetBonus = parseFloat(document.getElementById('compTargetBonus').value) / 100;
  const stockOptions = parseFloat(document.getElementById('compStockOptions').value);
  const vestingYears = parseFloat(document.getElementById('compVestingYears').value);
  const stockGrowth = parseFloat(document.getElementById('compStockGrowth').value) / 100;
  const taxBracket = parseFloat(document.getElementById('compTaxBracket').value) / 100;
  const stateTax = parseFloat(document.getElementById('compStateTax').value) / 100;
  const retirementContrib = parseFloat(document.getElementById('compRetirementContrib').value) / 100;
  const signingBonus = parseFloat(document.getElementById('compSigningBonus').value);

  const annualBonus = baseSalary * targetBonus;
  const annualStockVest = stockOptions / vestingYears;

  // Year 1 calculations
  const year1Gross = baseSalary + annualBonus + signingBonus + annualStockVest;
  const totalTaxRate = taxBracket + stateTax;
  const contribution401k = Math.min(baseSalary * retirementContrib, 23000); // 2024 limit
  const taxableIncome = year1Gross - contribution401k;
  const taxes = taxableIncome * totalTaxRate;
  const takeHome = year1Gross - taxes - contribution401k;

  // 4-year projection
  const yearlyData = [];
  let total4Year = 0;

  for (let year = 1; year <= 4; year++) {
    const stockValue = annualStockVest * Math.pow(1 + stockGrowth, year - 1);
    const yearSigning = year === 1 ? signingBonus : 0;
    const yearGross = baseSalary + annualBonus + yearSigning + stockValue;
    const year401k = Math.min(baseSalary * retirementContrib, 23000);
    const yearTaxable = yearGross - year401k;
    const yearTaxes = yearTaxable * totalTaxRate;
    const yearTakeHome = yearGross - yearTaxes - year401k;

    yearlyData.push({
      year,
      base: baseSalary,
      bonus: annualBonus,
      signing: yearSigning,
      stock: stockValue,
      gross: yearGross,
      taxes: yearTaxes,
      contribution: year401k,
      takeHome: yearTakeHome
    });

    total4Year += yearGross;
  }

  calculationResults.compensation = {
    baseSalary,
    annualBonus,
    signingBonus,
    annualStockVest,
    year1Gross,
    taxes,
    contribution401k,
    takeHome,
    total4Year,
    yearlyData
  };

  displayCompensationResults();
}

function displayCompensationResults() {
  if (!calculationResults.compensation) return;

  const { baseSalary, annualBonus, signingBonus, annualStockVest, year1Gross, taxes, contribution401k, takeHome, total4Year, yearlyData } = calculationResults.compensation;

  const formatMoney = (val) => '$' + val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('compTotalYear1').textContent = formatMoney(year1Gross);
  document.getElementById('compTotal4Year').textContent = formatMoney(total4Year);
  document.getElementById('compBreakBase').textContent = formatMoney(baseSalary);
  document.getElementById('compBreakBonus').textContent = formatMoney(annualBonus);
  document.getElementById('compBreakSigning').textContent = formatMoney(signingBonus);
  document.getElementById('compBreakStock').textContent = formatMoney(annualStockVest);
  document.getElementById('compBreakGross').textContent = formatMoney(year1Gross);
  document.getElementById('compTaxes').textContent = '-' + formatMoney(taxes);
  document.getElementById('comp401k').textContent = '-' + formatMoney(contribution401k);
  document.getElementById('compTakeHome').textContent = formatMoney(takeHome);
  document.getElementById('compMonthly').textContent = formatMoney(takeHome / 12);

  document.getElementById('compResults').classList.remove('hidden');

  const settings = calculatorSettings.compensation;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (compensationBreakdownChart) compensationBreakdownChart.destroy();
  if (compensationComparisonChart) compensationComparisonChart.destroy();

  const breakdownCtx = document.getElementById('compensationBreakdownChart').getContext('2d');
  compensationBreakdownChart = new Chart(breakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Base Salary', 'Bonus', 'Signing Bonus', 'Stock'],
      datasets: [{
        data: [baseSalary, annualBonus, signingBonus, annualStockVest],
        backgroundColor: [
          palette.primary,
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return context.label + ': $' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (' + percentage + '%)';
            }
          }
        }
      }
    }
  });

  const compCtx = document.getElementById('compensationComparisonChart').getContext('2d');
  compensationComparisonChart = new Chart(compCtx, {
    type: 'bar',
    data: {
      labels: yearlyData.map(d => 'Year ' + d.year),
      datasets: [
        {
          label: 'Base Salary',
          data: yearlyData.map(d => d.base),
          backgroundColor: palette.primary
        },
        {
          label: 'Bonus',
          data: yearlyData.map(d => d.bonus),
          backgroundColor: 'rgba(16, 185, 129, 0.8)'
        },
        {
          label: 'Signing Bonus',
          data: yearlyData.map(d => d.signing),
          backgroundColor: 'rgba(245, 158, 11, 0.8)'
        },
        {
          label: 'Stock',
          data: yearlyData.map(d => d.stock),
          backgroundColor: 'rgba(59, 130, 246, 0.8)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        x: { stacked: true },
        y: {
          stacked: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  });
}

// Portfolio Stress-Test Simulator
function renderStressTestCalculator() {
  const settings = calculatorSettings.stressTest;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'stressTest';
  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <div class="flex gap-3">
            <button onclick="window.toggleTheme('stressTest')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <div class="relative">
              <button onclick="document.getElementById('stCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="stCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('stressTest', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('stressTest', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Portfolio Stress Test</h1>
            </div>

            <form id="stressTestForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Portfolio Value</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="stPortfolioValue" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="500000">
                </div>
              </div>

              <div class="p-4 rounded-lg ${borderColor} border">
                <h3 class="font-semibold ${textPrimary} mb-3">Asset Allocation (%)</h3>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium ${textSecondary} mb-2">Stocks</label>
                    <input type="number" id="stStockAllocation" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="60">
                  </div>
                  <div>
                    <label class="block text-sm font-medium ${textSecondary} mb-2">Bonds</label>
                    <input type="number" id="stBondAllocation" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="30">
                  </div>
                  <div>
                    <label class="block text-sm font-medium ${textSecondary} mb-2">Cash</label>
                    <input type="number" id="stCashAllocation" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="10">
                  </div>
                </div>
                <p class="text-xs ${textSecondary} mt-2">Total must equal 100%</p>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Investment Horizon (Years)</label>
                <input type="number" id="stInvestmentHorizon" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="10">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Stress Scenario</label>
                <select id="stStressScenario" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all">
                  <option value="mild">Mild Recession (-15% stocks, -5% bonds)</option>
                  <option value="moderate" selected>Moderate Crisis (-30% stocks, -10% bonds)</option>
                  <option value="severe">Severe Crash (-50% stocks, -15% bonds)</option>
                  <option value="2008">2008 Financial Crisis (-57% stocks, +5% bonds)</option>
                  <option value="2000">2000 Dot-Com Crash (-49% stocks, +20% bonds)</option>
                  <option value="stagflation">Stagflation (-25% stocks, -20% bonds)</option>
                </select>
              </div>

              <button type="submit" class="w-full py-3 rounded-lg transition-all font-medium text-white hover:opacity-90" style="background: ${palette.primary}">
                Run Stress Test
              </button>
            </form>
          </div>

          <div id="stResults" class="hidden ${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <h2 class="text-xl font-bold ${textPrimary} mb-6">Stress Test Results</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-lg bg-red-50 border border-red-200">
                <p class="text-sm text-red-600 mb-1">Maximum Drawdown</p>
                <p class="text-2xl font-bold text-red-700" id="stMaxDrawdown">0%</p>
              </div>
              <div class="p-4 rounded-lg" style="background: ${palette.secondary}">
                <p class="text-sm ${textSecondary} mb-1">Portfolio at Bottom</p>
                <p class="text-xl font-bold" style="color: ${palette.primary}" id="stBottomValue">$0</p>
              </div>
            </div>

            <div id="stStatusDiv" class="p-4 rounded-lg mb-6">
              <p class="text-sm font-medium" id="stStatusMessage"></p>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">Scenario Impact</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">Initial Portfolio:</span>
                  <span class="${textPrimary} font-medium" id="stInitialValue">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Stock Loss:</span>
                  <span class="text-red-500 font-medium" id="stStockLoss">-$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Bond Change:</span>
                  <span class="${textPrimary} font-medium" id="stBondChange">$0</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Cash (Unchanged):</span>
                  <span class="${textPrimary} font-medium" id="stCashValue">$0</span>
                </div>
                <div class="flex justify-between border-t ${borderColor} pt-2 mt-2">
                  <span class="${textPrimary} font-semibold">Total Loss:</span>
                  <span class="text-red-600 font-bold" id="stTotalLoss">-$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6 p-4 rounded-lg ${borderColor} border">
              <h3 class="font-semibold ${textPrimary} mb-3">Recovery Analysis</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="${textSecondary}">Years to Recover (7% avg return):</span>
                  <span class="${textPrimary} font-medium" id="stRecoveryYears">0 years</span>
                </div>
                <div class="flex justify-between">
                  <span class="${textSecondary}">Portfolio after ${formInputs.stressTest.investmentHorizon} Years:</span>
                  <span style="color: ${palette.primary}" class="font-medium" id="stFinalValue">$0</span>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-semibold ${textPrimary} mb-3">Stress Scenario Impact</h3>
              <canvas id="stressTestChart"></canvas>
            </div>

            <div>
              <h3 class="font-semibold ${textPrimary} mb-3">Recovery Projection</h3>
              <canvas id="stressTestDrawdownChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('stressTestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateStressTest();
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('stCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('stressTest');

  if (calculationResults.stressTest) {
    displayStressTestResults();
  } else {
    setTimeout(() => calculateStressTest(), 0);
  }
}

function calculateStressTest() {
  saveFormInputs('stressTest');

  const portfolioValue = parseFloat(document.getElementById('stPortfolioValue').value);
  const stockAlloc = parseFloat(document.getElementById('stStockAllocation').value) / 100;
  const bondAlloc = parseFloat(document.getElementById('stBondAllocation').value) / 100;
  const cashAlloc = parseFloat(document.getElementById('stCashAllocation').value) / 100;
  const horizon = parseFloat(document.getElementById('stInvestmentHorizon').value);
  const scenario = document.getElementById('stStressScenario').value;

  // Scenario definitions
  const scenarios = {
    mild: { stocks: -0.15, bonds: -0.05, name: 'Mild Recession' },
    moderate: { stocks: -0.30, bonds: -0.10, name: 'Moderate Crisis' },
    severe: { stocks: -0.50, bonds: -0.15, name: 'Severe Crash' },
    '2008': { stocks: -0.57, bonds: 0.05, name: '2008 Financial Crisis' },
    '2000': { stocks: -0.49, bonds: 0.20, name: '2000 Dot-Com Crash' },
    stagflation: { stocks: -0.25, bonds: -0.20, name: 'Stagflation' }
  };

  const selectedScenario = scenarios[scenario];

  // Calculate current allocations
  const stockValue = portfolioValue * stockAlloc;
  const bondValue = portfolioValue * bondAlloc;
  const cashValue = portfolioValue * cashAlloc;

  // Calculate stress impact
  const stockLoss = stockValue * selectedScenario.stocks;
  const bondChange = bondValue * selectedScenario.bonds;
  const totalLoss = stockLoss + bondChange;

  const stressedStockValue = stockValue + stockLoss;
  const stressedBondValue = bondValue + bondChange;
  const stressedPortfolio = stressedStockValue + stressedBondValue + cashValue;

  const maxDrawdown = ((portfolioValue - stressedPortfolio) / portfolioValue) * 100;

  // Calculate recovery time (assuming 7% annual return)
  const avgReturn = 0.07;
  const recoveryYears = Math.log(portfolioValue / stressedPortfolio) / Math.log(1 + avgReturn);

  // Project recovery over time
  const recoveryPath = [stressedPortfolio];
  const labels = ['Crisis'];
  let currentValue = stressedPortfolio;

  for (let year = 1; year <= horizon; year++) {
    currentValue = currentValue * (1 + avgReturn);
    recoveryPath.push(currentValue);
    labels.push(`Year ${year}`);
  }

  // Create comparison data (normal growth without crisis)
  const normalPath = [portfolioValue];
  let normalValue = portfolioValue;
  for (let year = 1; year <= horizon; year++) {
    normalValue = normalValue * (1 + avgReturn);
    normalPath.push(normalValue);
  }

  calculationResults.stressTest = {
    portfolioValue,
    stockValue,
    bondValue,
    cashValue,
    stockLoss,
    bondChange,
    totalLoss,
    stressedPortfolio,
    maxDrawdown,
    recoveryYears,
    recoveryPath,
    normalPath,
    labels,
    scenarioName: selectedScenario.name,
    finalValue: recoveryPath[recoveryPath.length - 1],
    horizon
  };

  displayStressTestResults();
}

function displayStressTestResults() {
  if (!calculationResults.stressTest) return;

  const { portfolioValue, stockValue, bondValue, cashValue, stockLoss, bondChange, totalLoss, stressedPortfolio, maxDrawdown, recoveryYears, recoveryPath, normalPath, labels, scenarioName, finalValue, horizon } = calculationResults.stressTest;

  const formatMoney = (val) => '$' + Math.abs(val).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('stMaxDrawdown').textContent = '-' + maxDrawdown.toFixed(1) + '%';
  document.getElementById('stBottomValue').textContent = formatMoney(stressedPortfolio);
  document.getElementById('stInitialValue').textContent = formatMoney(portfolioValue);
  document.getElementById('stStockLoss').textContent = '-' + formatMoney(stockLoss);
  document.getElementById('stBondChange').textContent = (bondChange >= 0 ? '+' : '-') + formatMoney(bondChange);
  document.getElementById('stCashValue').textContent = formatMoney(cashValue);
  document.getElementById('stTotalLoss').textContent = '-' + formatMoney(Math.abs(totalLoss));
  document.getElementById('stRecoveryYears').textContent = recoveryYears.toFixed(1) + ' years';
  document.getElementById('stFinalValue').textContent = formatMoney(finalValue);

  const statusDiv = document.getElementById('stStatusDiv');
  const statusMessage = document.getElementById('stStatusMessage');

  if (maxDrawdown < 15) {
    statusDiv.className = 'p-4 rounded-lg bg-green-100 border border-green-300';
    statusMessage.className = 'text-sm font-medium text-green-800';
    statusMessage.textContent = `${scenarioName}: Your portfolio has moderate exposure. The conservative allocation limits downside.`;
  } else if (maxDrawdown < 30) {
    statusDiv.className = 'p-4 rounded-lg bg-yellow-100 border border-yellow-300';
    statusMessage.className = 'text-sm font-medium text-yellow-800';
    statusMessage.textContent = `${scenarioName}: Significant but manageable losses. Consider your risk tolerance and time horizon.`;
  } else {
    statusDiv.className = 'p-4 rounded-lg bg-red-100 border border-red-300';
    statusMessage.className = 'text-sm font-medium text-red-800';
    statusMessage.textContent = `${scenarioName}: Severe losses expected. Ensure you can withstand this drawdown without selling.`;
  }

  document.getElementById('stResults').classList.remove('hidden');

  const settings = calculatorSettings.stressTest;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];

  if (stressTestChart) stressTestChart.destroy();
  if (stressTestDrawdownChart) stressTestDrawdownChart.destroy();

  const ctx = document.getElementById('stressTestChart').getContext('2d');
  stressTestChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Stocks', 'Bonds', 'Cash', 'Total'],
      datasets: [
        {
          label: 'Before Crisis',
          data: [stockValue, bondValue, cashValue, portfolioValue],
          backgroundColor: palette.primary
        },
        {
          label: 'After Crisis',
          data: [stockValue + stockLoss, bondValue + bondChange, cashValue, stressedPortfolio],
          backgroundColor: 'rgba(239, 68, 68, 0.8)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  });

  const drawdownCtx = document.getElementById('stressTestDrawdownChart').getContext('2d');
  stressTestDrawdownChart = new Chart(drawdownCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Recovery Path',
          data: recoveryPath,
          borderColor: palette.primary,
          backgroundColor: palette.secondary,
          fill: true,
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Without Crisis',
          data: normalPath,
          borderColor: 'rgba(16, 185, 129, 0.8)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        annotation: {
          annotations: {
            breakeven: {
              type: 'line',
              yMin: portfolioValue,
              yMax: portfolioValue,
              borderColor: 'rgba(0, 0, 0, 0.3)',
              borderWidth: 1,
              borderDash: [3, 3],
              label: {
                display: true,
                content: 'Break-even',
                position: 'end'
              }
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  });
}

// Contribution Impact Calculator
function renderContributionImpactCalculator() {
  const settings = calculatorSettings.contributionImpact;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const logoPath = logos[settings.logo];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-300';

  currentView = 'contributionImpact';

  app.innerHTML = `
    <div class="min-h-screen py-8 px-4 ${bgClass}">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
          <button onclick="window.goHome()" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="${textPrimary}">Back</span>
          </button>

          <!-- Theme and customization controls -->
          <div class="flex gap-3">
            <button onclick="window.toggleTheme('contributionImpact')" class="${cardBg} p-2 rounded-lg ${borderColor} border transition-all hover:scale-105" title="Toggle Theme">
              <svg class="w-5 h-5 ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${theme === 'light' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'}
              </svg>
            </button>

            <div class="relative">
              <button onclick="document.getElementById('contributionCustomDropdown').classList.toggle('hidden')" class="${cardBg} px-4 py-2 rounded-lg ${borderColor} border ${textPrimary} hover:scale-105 transition-all">
                Customize
              </button>
              <div id="contributionCustomDropdown" class="hidden absolute right-0 mt-2 w-64 ${cardBg} rounded-lg shadow-xl ${borderColor} border p-4 z-10">
                <h3 class="${textPrimary} font-semibold mb-3">Color Palette</h3>
                <div class="grid grid-cols-5 gap-2 mb-4">
                  ${Object.keys(colorPalettes).map(p => `
                    <button onclick="window.changeColorPalette('contributionImpact', '${p}')" class="w-10 h-10 rounded-lg border-2 ${p === settings.colorPalette ? 'border-blue-500' : 'border-transparent'}" style="background: ${colorPalettes[p][theme].primary}" title="${p}"></button>
                  `).join('')}
                </div>
                <h3 class="${textPrimary} font-semibold mb-3">Logo</h3>
                <div class="grid grid-cols-5 gap-2">
                  ${Object.keys(logos).map(l => `
                    <button onclick="window.changeLogo('contributionImpact', '${l}')" class="w-10 h-10 rounded-lg ${l === settings.logo ? 'bg-blue-100' : cardBg} ${borderColor} border hover:bg-blue-50 transition-colors">
                      <svg class="w-6 h-6 mx-auto ${textPrimary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${logos[l]}
                      </svg>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content - 2 columns -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Input Form -->
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-lg" style="background: ${palette.secondary}">
                <svg class="w-8 h-8" style="color: ${palette.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${logoPath}
                </svg>
              </div>
              <h1 class="text-2xl font-bold ${textPrimary} ml-4">Contribution Impact Model</h1>
            </div>

            <form id="contributionImpactForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Initial Investment Amount</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="initialAmount" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.initialAmount}">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Baseline Monthly Contribution</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="baselineContribution" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.baselineContribution}">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Increased Monthly Contribution</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="increasedContribution" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.increasedContribution}">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Aggressive Monthly Contribution</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 ${textSecondary}">$</span>
                  <input type="number" id="aggressiveContribution" class="w-full pl-8 pr-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.aggressiveContribution}">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Expected Annual Return (%)</label>
                <input type="number" step="0.1" id="returnRate" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.returnRate}">
              </div>

              <div>
                <label class="block text-sm font-medium ${textSecondary} mb-2">Time Horizon (Years)</label>
                <input type="number" id="timeHorizon" class="w-full px-4 py-3 ${inputBg} rounded-lg focus:ring-2 transition-all" value="${formInputs.contributionImpact.timeHorizon}">
              </div>

              <button type="button" onclick="calculateContributionImpact()" class="w-full py-3 rounded-lg text-white font-semibold transition-all hover:scale-105 shadow-lg" style="background: ${palette.primary}">
                Calculate Impact
              </button>
            </form>
          </div>

          <!-- Right Column - Results -->
          <div class="${cardBg} rounded-lg shadow-lg p-6 ${borderColor} border">
            <h2 class="text-xl font-bold ${textPrimary} mb-4">Contribution Comparison</h2>
            <div id="contributionImpactResults">
              <p class="${textSecondary}">Enter your details and click "Calculate Impact" to see how different contribution levels affect your investment growth over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('contributionCustomDropdown');
    if (dropdown && !e.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });

  restoreFormInputs('contributionImpact');

  if (calculationResults.contributionImpact) {
    displayContributionImpactResults();
  } else {
    setTimeout(() => calculateContributionImpact(), 0);
  }
}

function calculateContributionImpact() {
  saveFormInputs('contributionImpact');

  const initialAmount = parseFloat(document.getElementById('initialAmount').value);
  const baselineContribution = parseFloat(document.getElementById('baselineContribution').value);
  const increasedContribution = parseFloat(document.getElementById('increasedContribution').value);
  const aggressiveContribution = parseFloat(document.getElementById('aggressiveContribution').value);
  const returnRate = parseFloat(document.getElementById('returnRate').value) / 100;
  const timeHorizon = parseInt(document.getElementById('timeHorizon').value);

  // Calculate growth for each scenario
  const scenarios = [
    { name: 'Baseline', contribution: baselineContribution, values: [] },
    { name: 'Increased', contribution: increasedContribution, values: [] },
    { name: 'Aggressive', contribution: aggressiveContribution, values: [] }
  ];

  for (let scenario of scenarios) {
    let balance = initialAmount;
    scenario.values.push(balance);

    for (let year = 1; year <= timeHorizon; year++) {
      // Monthly contributions with annual compounding
      for (let month = 0; month < 12; month++) {
        balance += scenario.contribution;
        balance *= (1 + returnRate / 12);
      }
      scenario.values.push(balance);
    }
  }

  // Calculate total contributions and earnings for each scenario
  const results = scenarios.map(scenario => ({
    name: scenario.name,
    monthlyContribution: scenario.contribution,
    finalBalance: scenario.values[scenario.values.length - 1],
    totalContributions: initialAmount + (scenario.contribution * 12 * timeHorizon),
    totalEarnings: scenario.values[scenario.values.length - 1] - (initialAmount + (scenario.contribution * 12 * timeHorizon))
  }));

  calculationResults.contributionImpact = {
    scenarios,
    results,
    timeHorizon,
    initialAmount,
    returnRate
  };

  displayContributionImpactResults();
}

function displayContributionImpactResults() {
  const data = calculationResults.contributionImpact;
  if (!data) return;

  const settings = calculatorSettings.contributionImpact;
  const theme = settings.theme;
  const palette = colorPalettes[settings.colorPalette][theme];
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const resultsDiv = document.getElementById('contributionImpactResults');

  // Calculate differences
  const baselineResult = data.results[0];
  const increasedResult = data.results[1];
  const aggressiveResult = data.results[2];

  const increasedGain = increasedResult.finalBalance - baselineResult.finalBalance;
  const aggressiveGain = aggressiveResult.finalBalance - baselineResult.finalBalance;
  const increasedPercentGain = ((increasedResult.finalBalance / baselineResult.finalBalance - 1) * 100).toFixed(1);
  const aggressivePercentGain = ((aggressiveResult.finalBalance / baselineResult.finalBalance - 1) * 100).toFixed(1);

  resultsDiv.innerHTML = `
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 gap-4 mb-6">
      ${data.results.map((result, index) => `
        <div class="p-4 rounded-lg ${borderColor} border">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold ${textPrimary}">${result.name} Scenario</h3>
            <span class="text-sm ${textSecondary}">$${result.monthlyContribution.toLocaleString()}/mo</span>
          </div>
          <div class="text-2xl font-bold mb-1" style="color: ${palette.primary}">
            $${result.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div class="text-xs ${textSecondary}">
            Contributions: $${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })} |
            Earnings: $${result.totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Comparison Insights -->
    <div class="mb-6 p-4 rounded-lg" style="background: ${palette.secondary}">
      <h3 class="font-semibold ${textPrimary} mb-3">Impact Analysis</h3>
      <div class="space-y-2 text-sm ${textSecondary}">
        <div class="flex justify-between">
          <span>Increased vs Baseline:</span>
          <span class="font-semibold" style="color: ${palette.primary}">+$${increasedGain.toLocaleString(undefined, { maximumFractionDigits: 0 })} (+${increasedPercentGain}%)</span>
        </div>
        <div class="flex justify-between">
          <span>Aggressive vs Baseline:</span>
          <span class="font-semibold" style="color: ${palette.primary}">+$${aggressiveGain.toLocaleString(undefined, { maximumFractionDigits: 0 })} (+${aggressivePercentGain}%)</span>
        </div>
        <div class="flex justify-between pt-2 border-t ${borderColor}">
          <span>Extra monthly (Increased):</span>
          <span>$${(increasedResult.monthlyContribution - baselineResult.monthlyContribution).toLocaleString()}</span>
        </div>
        <div class="flex justify-between">
          <span>Extra monthly (Aggressive):</span>
          <span>$${(aggressiveResult.monthlyContribution - baselineResult.monthlyContribution).toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Growth Chart -->
    <div class="mb-6">
      <h3 class="font-semibold ${textPrimary} mb-3">Growth Over Time</h3>
      <canvas id="contributionImpactChart" width="400" height="300"></canvas>
    </div>

    <!-- Breakdown Chart -->
    <div>
      <h3 class="font-semibold ${textPrimary} mb-3">Final Balance Comparison</h3>
      <canvas id="contributionComparisonChart" width="400" height="250"></canvas>
    </div>
  `;

  // Create charts
  createContributionImpactCharts(data, palette);
}

function createContributionImpactCharts(data, palette) {
  // Destroy existing charts
  if (contributionImpactChart) contributionImpactChart.destroy();
  if (contributionComparisonChart) contributionComparisonChart.destroy();

  const labels = Array.from({ length: data.timeHorizon + 1 }, (_, i) => `Year ${i}`);

  // Growth over time chart
  const growthCtx = document.getElementById('contributionImpactChart').getContext('2d');
  contributionImpactChart = new Chart(growthCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: data.scenarios.map((scenario, index) => ({
        label: scenario.name,
        data: scenario.values,
        borderColor: index === 0 ? palette.primary : index === 1 ? palette.accent : 'rgb(16, 185, 129)',
        backgroundColor: index === 0 ? palette.secondary : index === 1 ? 'rgba(20, 184, 166, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 });
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  });

  // Final balance comparison chart
  const comparisonCtx = document.getElementById('contributionComparisonChart').getContext('2d');
  contributionComparisonChart = new Chart(comparisonCtx, {
    type: 'bar',
    data: {
      labels: data.results.map(r => r.name),
      datasets: [
        {
          label: 'Total Contributions',
          data: data.results.map(r => r.totalContributions),
          backgroundColor: 'rgba(100, 116, 139, 0.6)',
          borderColor: 'rgb(100, 116, 139)',
          borderWidth: 2
        },
        {
          label: 'Investment Earnings',
          data: data.results.map(r => r.totalEarnings),
          backgroundColor: palette.secondary,
          borderColor: palette.primary,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 });
            }
          }
        }
      },
      scales: {
        x: { stacked: true },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  });
}

// Global navigation functions
window.goHome = renderHome;
window.showMortgageCalculator = renderMortgageCalculator;
window.showLoanCalculator = renderLoanCalculator;
window.showInvestmentCalculator = renderInvestmentCalculator;
window.showRetirementCalculator = renderRetirementCalculator;
window.showRetirementSuccessCalculator = renderRetirementSuccessCalculator;
window.showCompensationCalculator = renderCompensationCalculator;
window.showStressTestCalculator = renderStressTestCalculator;
window.showContributionImpactCalculator = renderContributionImpactCalculator;

// Global calculation functions
window.calculateContributionImpact = calculateContributionImpact;

// Global customization functions
window.toggleTheme = toggleTheme;
window.changeColorPalette = changeColorPalette;
window.changeLogo = changeLogo;
window.toggleBreakdown = toggleBreakdown;

// Initialize app
renderHome();
