describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')    
    cy.visit('http://localhost:3000')
  })

  it('opens to login form', function() {
    cy.get('h2').contains('please log in:')
  })

  describe('logging in...', function() {
    beforeEach(function() {
      const user = {
        username: 'thedude',
        name: 'Jeff',
        password: 'rugz'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('succeeds with proper credentials', function() {
      cy.get('#username-input').type('thedude')
      cy.get('#password-input').type('rugz')
      cy.get('#submit-login-button').click()
      cy.contains('logged in as Jeff')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('snatoehsn')
      cy.get('#password-input').type('ruaoeugz')
      cy.get('#submit-login-button').click()
      cy.get('h2').contains('please log in:')
    })

    describe('when logged in...', function() {
      beforeEach(function() {
        cy.login({ username: 'thedude', password: 'rugz' })
      })
      
      it('user may create new blog', function() {
        cy.contains('create blog').click()

        cy.get('#title-input').type('Tie your room together with this...')
        cy.get('#author-input').type('Jeffrey Lebowski')
        cy.get('#url-input').type('www.rugz.com')
        cy.get('#submit-blog-button').click()

        cy.contains('Tie your room together with this... by Jeffrey Lebowski')
      })

      describe('...and blogs are populated...', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Tie your room together with this...',
            author: 'Jeffrey Lebowski',
            url: 'www.rugz.com'
          })
          cy.createBlog({
            title: 'another blog',
            author: 'anon',
            url: '4chan'
          })          
        })

        it('user may like a blog', function() {
          cy.contains('another blog by anon').find('.toggleBlogDetailsButton').click()
          cy.contains('another blog by anon').find('.likeBlogButton').click()
          cy.contains('another blog by anon').contains('1')
        })
      })
    })
  })
})