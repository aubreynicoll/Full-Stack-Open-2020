describe('Note App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'duderino',
      name: 'Jeff',
      password: 'rugz'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('duderino')
    cy.get('#password').type('rugz')
    cy.get('#login').click()
    cy.contains('Jeff logged in.')
  })

  it('login fails with incorrect credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('snake')
    cy.get('#password').type('merylsbutt')
    cy.get('#login').click()

    cy.get('.error').contains('incorrect credentials')
    cy.get('html').should('not.contain', 'Jeff logged in')

  })

  describe('when logged in...', function() {
    beforeEach(function() {
      cy.login('duderino', 'rugz')
    })
    
    it('a new note can be saved', function() {
      cy.contains('new note').click()
      cy.get('#newNote').type('a note created by cypress...')
      cy.contains('save').click()
      cy.contains('a note created by cypress...')
    })

    describe('and a note exists...', function() {
      beforeEach(function() {
        cy.createNote('note 1')
        cy.createNote('note 2')
        cy.createNote('note 3')
      })

      it('a saved note can be made important', function() {
        cy.contains('note 2')
          .contains('make important')
          .click()

        cy.contains('note 2')
          .contains('make not important')
      })
    })
  })
})