describe('Blog App', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'bruce',
      name: 'Bruce',
      password: 'iamahugebutthead'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('displays login form correctly', function() {
    cy.get('#showButton').click()
  })

  describe('logging in...', function() {
    it('succeeds with proper credentials', function() {
      cy.get('#showButton').click()
  
      cy.get('#username').type('bruce')
      cy.get('#password').type('iamahugebutthead')
      cy.get('#login-button').click()
  
      cy.contains('logged in as Bruce')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#showButton').click()
  
      cy.get('#username').type('beavis')
      cy.get('#password').type('butthead')
      cy.get('#login-button').click()
  
      cy.contains('invalid creds, chummer')
    })
  })
 
})