describe('Health Service Access Page', () => {
  beforeEach(() => {
    cy.visit('https://msdat.fmohconnect.gov.ng/dashboard/Health_Service_Access');
  });

  it('should contain Health_Service_Access in the URL', () => {
    cy.url().should('include', 'Health_Service_Access');
  });

  it('should have a visible header', () => {
    cy.get('#the-header', { timeout: 180000 }).should('be.visible');
  });

  it('should have a visible Table Component', () => {
    cy.get('#the-table', { timeout: 200000 }).should('be.visible');
  });
  it('should have a visible footer', () => {
    cy.get('#the-footer', { timeout: 180000 }).should('be.visible');
  });
  it('should have a visible State Bar Chart Component', () => {
    cy.get('#stateBarChartComponent', { timeout: 200000 }).should('be.visible');
  });
});

describe('Health Facility Config API', () => {
  let responseBody;

  before(() => {
    // Make API request once before all tests
    cy.request({
      method: 'GET',
      url: 'https://msdat-api.fmohconnect.gov.ng/api/dashboards/2/',
      timeout: 120000, // wait up to 2 minutes
    }).then((response) => {
      expect(response.status).to.eq(200);
      responseBody = response.body;
    });
  });

  it('should have the correct name', () => {
    expect(responseBody).to.have.property('name', 'Health_Service_Access');
  });

  it('should have a title', () => {
    expect(responseBody).to.have.property('title').and.to.be.a('string').and.to.not.be.empty;
  });

  it('should have a visibility property', () => {
    expect(responseBody).to.have.property('visibility').and.to.be.a('string');
  });

  it('should have an indicators property', () => {
    expect(responseBody).to.have.property('indicators');
  });

  it('should have a non-empty array of indicators', () => {
    expect(responseBody.indicators).to.be.an('array').and.to.not.be.empty;
  });

  it('should have a dataSources property', () => {
    expect(responseBody).to.have.property('dataSources');
  });
  it('should have a non-empty array of dataSources', () => {
    expect(responseBody.dataSources).to.be.an('array').and.to.not.be.empty;
  });

  it('should have showTableRelatedIndicator set to true', () => {
    expect(responseBody).to.have.property('showTableRelatedIndicator', true);
  });

  it('should have defaultIndicators included in indicators array', () => {
    if (responseBody.defaultIndicators && responseBody.defaultIndicators.length) {
      expect(responseBody.indicators).to.include.members(responseBody.defaultIndicators);
    }
  });
});

describe('Dashboard Indicators', () => {
  let responseBody;

  before(() => {
    // Make API request once before all tests
    cy.request({
      method: 'GET',
      url: 'https://msdat-api.fmohconnect.gov.ng/api/dashboard-data/indicators/2/',
      timeout: 180000, // wait up to 2 minutes
    }).then((response) => {
      expect(response.status).to.eq(200);
      responseBody = response.body;
    });
  });

  it('should have an indicators property', () => {
    expect(responseBody).to.have.property('indicators');
  });

  it('should have a non-empty array of indicators', () => {
    expect(responseBody.indicators).to.be.an('array').and.to.not.be.empty;
  });
});

describe('Dashboard Data', () => {
  let responseBody;

  before(() => {
    // Make API request once before all tests
    cy.request({
      method: 'GET',
      url: 'https://msdat-api.fmohconnect.gov.ng/api/dashboard-data/2/?caching=true',
      timeout: 180000, // wait up to 2 minutes
    }).then((response) => {
      expect(response.status).to.eq(200);
      responseBody = response.body;
    });
  });

  it('should have an results property', () => {
    expect(responseBody).to.have.property('results');
  });

  it('should have a non-empty array of results', () => {
    expect(responseBody.results).to.be.an('array').and.to.not.be.empty;
  });
});
