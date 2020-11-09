describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('opens to login form', function() {
    cy.get('h2').contains('please log in:')
  })
})