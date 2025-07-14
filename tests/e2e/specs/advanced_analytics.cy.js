describe('Advanced Analytics Page', () => {
  beforeEach(() => {
    // Visit the advanced analytics page before each test
    cy.visit('https://msdat.fmohconnect.gov.ng/dashboard/Advanced_Analytics');
  });
  // route contains advanced analytics
  it('should contain Advanced_Analytics in the URL', () => {
    cy.url().should('include', 'Advanced_Analytics');
  });

  it('should have a visible header', () => {
    cy.wait(3 * 60 * 1000);
    cy.get('#the-header').should('be.visible');
  });

  it('should have a visible footer', () => {
    cy.get('#the-footer').should('be.visible');
  });
});
