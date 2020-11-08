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
 
  describe('when logged in...', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', { username: 'bruce', password: 'iamahugebutthead' })
        .then(({ body }) => {
          localStorage.setItem('loggedInUser', body)
          cy.visit('localhost:3000')
        })
    })

    it('user can create a new blog post', function() {
      // cy.get('#showButton').click()
      cy.get('#title').type('this is a blog')
      cy.get('#author').type('bruce')
      cy.get('#url').type('lol')
      cy.get('#create-blog-button')

      cy.contains('this is a blog by Bruce')
    })
  })
})