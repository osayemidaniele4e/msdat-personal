// This test script checks for important elements that are to be present on the base page of the platform.
// If they are not present it means the app is broken, otherwise it is not
// This will be run on the pipeline that deploys chamges from staging to production

describe('Test if Platform is broken', () => {
  it('Test if Navbar is Visible', () => {
    cy.visit('http://localhost:8080/dashboard/Health_Outcomes_and_Service_Coverage');
    cy.wait(3 * 60 * 1000);
    cy.get('#the-header').should('be.visible');
  });

  it('Test if Control Panel is Visible', () => {
    cy.wait(3 * 60 * 1000);
    cy.get('#control-panel').should('be.visible');
  });

  it('Test if Data Table is Visible', () => {
    cy.wait(3 * 60 * 1000);
    cy.get('#the-table').should('be.visible');
  });

  it('Test if State Chart Bar is Visible', () => {
    cy.wait(3 * 60 * 1000);
    cy.get('#stateBarChartComponent').should('be.visible');
  });

  it('Test if Data Section is Visible', () => {
    cy.wait(3 * 60 * 1000);
    cy.get('#state-bar-chart').should('be.visible');
  });
});
